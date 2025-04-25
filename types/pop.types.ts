export type SDRConfig = {
    pops: {
        [key: string]: {
            desc: string;
            geo: number[];
            relays: {
                ipv4: string;
                port_range: number[];
            }[];
        };
    };
};

export type PoPLocation = {
    lat: number;
    lon: number;
};

export interface RelayStatus {
    time: number;
    isAlive: boolean;
}

export type PoPRelay = {
    ipv4: string;
    portRange: number[];
    status: RelayStatus;
};

export interface PoP {
    id: string;
    description: string;
    namedLocation: string;
    country: string;
    regionCode: string;
    geoLocation: PoPLocation;
    relays: PoPRelay[];
    averageTime: number;
}
