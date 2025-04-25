import { PoP, PoPLocation, PoPRelay, RelayStatus } from "../../../../types/pop.types.js";

export class RelayStatusInstance implements RelayStatus {
    time: number;
    isAlive: boolean;

    constructor(time: number, isAlive: boolean) {
        this.time = time;
        this.isAlive = isAlive;
    }
}

export default class PoPInstance implements PoP {
    id: string;
    description: string;
    namedLocation: string;
    country: string;
    regionCode: string;
    geoLocation: PoPLocation;
    relays: PoPRelay[];
    averageTime: number;

    constructor(pop: PoP) {
        this.id = pop.id;
        this.description = pop.description;
        this.namedLocation = pop.namedLocation;
        this.country = pop.country;
        this.regionCode = pop.regionCode;
        this.geoLocation = pop.geoLocation;
        this.relays = pop.relays;
        this.averageTime = pop.averageTime;
    }
}
