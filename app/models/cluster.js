const Status = require("./status");
const { CLUSTER_MAP } = require("../constants/clusters");

class ClusterInstance {
    constructor(relayAddresses, cityName, continentId, country) {
        this.relayAddresses = relayAddresses;
        this.status = new Status();
        this.continentId = continentId;
        this.cityName = cityName;
        this.country = country;
    }
}

class Cluster {
    constructor(sdrconfig) {
        this.sdrconfig = sdrconfig;
        this.clustersId = [];
        this.pops = {};
    }

    #convertRelay = (relay) => relay.map((data) => `${data.ipv4}:${data.port_range.join("-")}`);

    adapt = () => {
        const pops = this.sdrconfig.pops;

        Object.keys(pops).forEach((popKey) => {
            const currentPop = pops[popKey];

            if (currentPop.relays !== undefined && currentPop.relays.length > 0 && CLUSTER_MAP.has(popKey)) {
                this.clustersId.push(popKey);
                const location = currentPop.desc.split("("),
                    cityName = location[0].trim(),
                    country = location[1] ? location[1].replaceAll(")", "") : "";
                this.pops[popKey] = new ClusterInstance(
                    this.#convertRelay(currentPop.relays),
                    cityName,
                    CLUSTER_MAP.get(popKey),
                    country,
                );
            }
        });
    };
}

module.exports = { Cluster };
