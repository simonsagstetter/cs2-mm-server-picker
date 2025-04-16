const Ping = require("./ping-lite");
const log = require("./log");

let PingWrapper = function (clusters, window) {
    this._clusters = clusters;
    this._mainWindow = window;
};

// Lance le ping sur tous les serveurs de Valve
PingWrapper.prototype.execute = function () {
    try {
        this._clusters.clustersId.forEach((id) => {
            const currentCluster = this._clusters.pops[id] || undefined;
            if (!currentCluster || !currentCluster.relayAddresses) {
                return;
            }

            currentCluster.relayAddresses.forEach((relayAddresse) => {
                if (relayAddresse === undefined) {
                    currentCluster.relayAddresses.splice(currentCluster.relayAddresses.indexOf(relayAddresse), 1);
                    return;
                }
                currentCluster.relayAddresses.splice(
                    currentCluster.relayAddresses.indexOf(relayAddresse),
                    1,
                    relayAddresse.split(":")[0],
                );
            });

            const hosts = currentCluster.relayAddresses;

            hosts.forEach((host) => {
                if (host === undefined) {
                    return;
                }
                var ping = new Ping(host);

                ping.send((err, time) => {
                    if (err === null && time !== null) {
                        this._updateClusterStatus(host, time, true);
                    } else {
                        this._updateClusterStatus(host, 0, false);
                    }
                });

                setTimeout(function () {
                    ping.stop();
                }, 1000);
            });
        });
    } catch (error) {
        log.error(error.stack);
    } finally {
        this._mainWindow.webContents.send("spinner", [false]);
    }
};

// Mets à jour le status des serveurs et informe l'IHM
PingWrapper.prototype._updateClusterStatus = function (host, time, alive) {
    try {
        this._clusters.clustersId.forEach((id) => {
            const currentCluster = this._clusters.pops[id] || undefined;

            if (!currentCluster || !currentCluster.relayAddresses) {
                return;
            }

            let checkAlive = false;

            currentCluster.relayAddresses.forEach((relayAddresse) => {
                if (relayAddresse === host) {
                    this._mainWindow.webContents.send("update-ip-list", [
                        id,
                        host,
                        currentCluster.cityName,
                        currentCluster.continentId,
                        time,
                        alive,
                    ]);

                    if (time < currentCluster.status.time || currentCluster.status.time === 0) {
                        if (!checkAlive && alive) {
                            checkAlive = true;
                            checkTime = time;
                        }

                        currentCluster.status.isAlive = alive;
                        currentCluster.status.time = time;

                        if (alive) {
                            this._mainWindow.webContents.send("request-update-ping", [
                                currentCluster.continentId,
                                currentCluster.status.time,
                            ]);
                        }
                    }
                }
            });
        });
    } catch (error) {
        log.error(error.stack);
    }
};

module.exports = PingWrapper;
