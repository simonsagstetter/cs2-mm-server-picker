import { getRegionFromLatLon, parseDescription } from "../utils/transformers.js";
import { SDRConfig, PoP, PoPRelay } from "../../../../types/pop.types.js";
import PoPInstance, { RelayStatusInstance } from "../models/pop.js";
import { pingHost } from "./ping.js";
import { REGION_ORDER } from "./../constants/orders.js";

export default class PopAdapter {
    sdrconfig: SDRConfig | undefined;
    pops: Record<string, PoP>;
    groupedPops: Map<string, PoP[]>;

    constructor(sdrconfig?: SDRConfig) {
        this.sdrconfig = sdrconfig ? sdrconfig : undefined;
        this.pops = {};
        this.groupedPops = new Map<string, PoP[]>();
    }

    async parse(): Promise<PopAdapter> {
        if (this.sdrconfig === undefined || !this.sdrconfig.pops) return this;

        const promises = Object.keys(this.sdrconfig.pops).map(async (popId) => {
            if (this.sdrconfig === undefined) return;
            const currentPop = this.sdrconfig.pops[popId],
                [namedLocation, country] = parseDescription(currentPop.desc),
                [lon, lat] = currentPop.geo,
                regionCode = getRegionFromLatLon(lat, lon),
                relays =
                    currentPop.relays && Array.isArray(currentPop.relays) && currentPop.relays.length > 0
                        ? currentPop.relays.map((relay) => ({
                              ipv4: relay.ipv4,
                              portRange: relay.port_range,
                              status: new RelayStatusInstance(0, false),
                          }))
                        : [];

            const pop = new PoPInstance({
                id: popId,
                description: currentPop.desc,
                namedLocation,
                country,
                regionCode,
                geoLocation: {
                    lat,
                    lon,
                },
                relays,
                averageTime: 0,
            });

            this.pops[popId] = pop;
        });

        await Promise.all(promises);
        return this;
    }

    async getRelayPings(pops?: Record<string, PoP>): Promise<PopAdapter> {
        const obj = pops ? pops : this.pops;
        const promises = Object.keys(obj).map(async (popId) => {
            const { relays, ...rest } = obj[popId];
            const updatedRelays = await this.pingRelays(relays, popId),
                averageTime = parseInt(
                    new Number(
                        updatedRelays
                            .filter((r) => r.status.isAlive)
                            .reduce((time, currentRelay) => (time += currentRelay.status.time), 0.0) /
                            updatedRelays.length,
                    ).toFixed(0),
                );

            this.pops[popId] = {
                ...rest,
                relays: updatedRelays,
                averageTime,
            };
        });

        await Promise.all(promises);

        return this;
    }

    group(pops?: Record<string, PoP>): PopAdapter {
        const obj = pops ? pops : this.pops;
        const groupedPops = new Map<string, PoP[]>();
        Object.keys(obj).forEach((popId) => {
            const currentPop = obj[popId];
            if (groupedPops.has(currentPop.regionCode)) {
                const existingPops = groupedPops.get(currentPop.regionCode) as PoP[]; // Sure thing
                groupedPops.set(currentPop.regionCode, [...existingPops, currentPop]);
            } else {
                groupedPops.set(currentPop.regionCode, [currentPop]);
            }
        });

        this.groupedPops = this.sort(groupedPops);

        return this;
    }

    sort(groupedPops: Map<string, PoP[]>): Map<string, PoP[]> {
        const sortedEntries = Array.from(groupedPops.entries()).sort((a, b) => {
            const indexA = REGION_ORDER.indexOf(a[0]);
            const indexB = REGION_ORDER.indexOf(b[0]);

            return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
        });

        return new Map(
            sortedEntries.map(([id, pops]) => {
                return [
                    id,
                    pops.sort((a, b) => a.namedLocation.localeCompare(b.namedLocation, "en", { sensitivity: "base" })),
                ];
            }),
        );
    }

    async pingRelays(relays: { ipv4: string; portRange: number[] }[], popId: string): Promise<PoPRelay[]> {
        if (relays.length > 0) {
            const promises = relays.map(async ({ ipv4, portRange }): Promise<PoPRelay> => {
                const pingResponse = await pingHost(ipv4),
                    time =
                        pingResponse.time !== "unknown" && pingResponse.min !== "unknown"
                            ? parseFloat(pingResponse.min)
                            : 0.0;

                return {
                    ipv4,
                    portRange,
                    status: new RelayStatusInstance(time, pingResponse.alive),
                };
            });
            return await Promise.all(promises);
        } else {
            return await Promise.resolve([]);
        }
    }
}
