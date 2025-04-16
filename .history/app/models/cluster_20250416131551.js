export default class Cluster {
    constructor(sdrconfig) {
        this.sdrconfig = sdrconfig;
        this.clustersId = [];
        this.pops = {};
    }

    #convertRelay = (relay) => relay.map((data) => `${data.ipv4}:${data.port_range.join("-")}`);

    adpat = () => {
        const pops = this.data.pops;
        const popKeys = [];

        Object.keys(pops).forEach((popKey) => {
            const currentPop = pops[popKey];
            this.clusterIds.push(popKey);

            if (currentPop.relays !== undefined && currentPop.relays.length > 0 && CLUSTER_MAP.has(popKey)) {
                const location = currentPop.desc.split("("),
                    city = location[0].trim(),
                    country = location[1].replaceAll(")", "");
                this.clusters[popKey] = new ClusterBase(
                    popKey,
                    currentPop.relays,
                    city,
                    country,
                    CLUSTER_MAP.get(popKey),
                );
            }
        });
    };
}
