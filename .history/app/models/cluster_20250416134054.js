const Status = require("./status");
const { CLUSTER_MAP } = require("../constants/clusters");

class ClusterInstance {
    constructor(relayAddresses, cityName, continentId, country, id) {
        this.relayAddresses = relayAddresses;
        this.status = new Status();
        this.continentId = continentId;
        this.cityName = cityName;
        this.country = country;
        this.id = id;
    }
}

class Cluster {
    constructor(sdrconfig) {
        this.sdrconfig = sdrconfig;
        this.clustersId = [];
        this.pops = {};
    }

    #convertRelay = (relay) => relay.map((data) => `${data.ipv4}:${data.port_range.join("-")}`);

    adpat = () => {
        const pops = this.sdrconfig.pops;

        Object.keys(pops).forEach((popKey) => {
            const currentPop = pops[popKey];
            this.clustersId.push(popKey);

            if (currentPop.relays !== undefined && currentPop.relays.length > 0 && CLUSTER_MAP.has(popKey)) {
                console.log(currentPop.desc);
                const location = currentPop.desc.split("("),
                    cityName = location[0].trim(),
                    country = location[1] ? location[1].replaceAll(")", "") : "";
                this.pops[popKey] =
                    new ClusterInstance(
                        this.#convertRelay(currentPop.relays),
                        cityName,
                        CLUSTER_MAP.get(popKey),
                        country,
                        popKey,
                    ),
                
            } else {
                console.log(currentPop);
            }
        });
    };
}

module.exports = { Cluster };
