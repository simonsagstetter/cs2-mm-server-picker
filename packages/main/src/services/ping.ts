import ping from "ping";
import { PoP } from "../../../../types/pop.types.js";
import PopAdapter from "./adapters.js";
import { platform } from "os";

export const pingHost = async (ipv4: string): Promise<ping.PingResponse> => {
    const osId = platform();
    if (osId === "win32") {
        return ping.promise.probe(ipv4, {
            timeout: 1,
            min_reply: 5,
        });
    } else {
        return ping.promise.probe(ipv4, {
            timeout: 10,
            deadline: 10,
            min_reply: 10,
        });
    }
};

export const refreshPing = async (pops: Record<string, PoP>): Promise<any> => {
    const instance = (await new PopAdapter().getRelayPings(pops)).group();
    return { pops: instance.pops, groupedPops: instance.groupedPops };
};
