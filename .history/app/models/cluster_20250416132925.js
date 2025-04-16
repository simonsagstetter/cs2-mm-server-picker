const Status = require("./status");

const CLUSTER_MAP = new Map([
    ["sto", "eu-east"],
    ["view", "eu-east"],
    ["waw", "eu-east"],
    ["ams", "eu-west"],
    ["fra", "eu-west"],
    ["lhr", "eu-west"],
    ["lux", "eu-west"],
    ["mad", "eu-west"],
    ["par", "eu-west"],
    ["auw2", "na-west"],
    ["eat", "na-west"],
    ["lax", "na-west"],
    ["sea", "na-west"],
    ["atl", "na-east"],
    ["iad", "na-east"],
    ["okc", "na-east"],
    ["ord", "na-east"],
    ["eze", "sa"],
    ["gru", "sa"],
    ["lim", "sa"],
    ["scl", "sa"],
    ["jnb", "af"],
    ["bom", "as"],
    ["can", "as"],
    ["dxb", "as"],
    ["hkg", "as"],
    ["maa", "as"],
    ["man", "as"],
    ["pwg", "as"],
    ["pwj", "as"],
    ["pwu", "as"],
    ["pww", "as"],
    ["pwz", "as"],
    ["seo", "as"],
    ["sgp", "as"],
    ["sha", "as"],
    ["shb", "as"],
    ["tsn", "as"],
    ["tyo", "as"],
    ["syd", "oc"],
    ["", "other"],
]);

class ClusterInstance {
    constructor(relayAddresses, cityName, continentId, country, id) {
        this.relayAddresses = relayAddresses ? relayConverter(relayAddresses) : undefined;
        this.status = new Status();
        this.continentId = continentId;
        this.cityName = cityName;
        this.country = country;
        this.id = id;
    }
}

export default class Cluster {
    constructor(sdrconfig) {
        this.sdrconfig = sdrconfig;
        this.clustersId = [];
        this.pops = [];
    }

    #convertRelay = (relay) => relay.map((data) => `${data.ipv4}:${data.port_range.join("-")}`);

    adpat = () => {
        const pops = this.data.pops;
        const popKeys = [];

        Object.keys(pops).forEach((popKey) => {
            const currentPop = pops[popKey];
            this.clustersId.push(popKey);

            if (currentPop.relays !== undefined && currentPop.relays.length > 0 && CLUSTER_MAP.has(popKey)) {
                const location = currentPop.desc.split("("),
                    cityName = location[0].trim(),
                    country = location[1].replaceAll(")", "");
                this.pops.push(
                    new ClusterInstance(
                        this.#convertRelay(currentPop.relays),
                        cityName,
                        CLUSTER_MAP.get(popKey),
                        country,
                        popKey,
                    ),
                );
            }
        });
    };
}
