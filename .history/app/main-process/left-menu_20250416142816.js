const PingWrapper = require("./ping");
const ServersService = require("../services/servers");
const { Cluster } = require("../models/cluster");
const Firewall = require("./firewall");
const { ipcMain, BrowserWindow } = require("electron");
const AnalyticsService = require("../services/analytics");

// Exécute un ping ordonné par l'utilisateur
ipcMain.on("request-ping", (event) => {
    ping(event);
});

ipcMain.on("request-block-firewall", (event, ipList) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.webContents.send("spinner", [true]);
    win.webContents.send("reset-worldmap-iplist");

    const firewall = new Firewall(win);
    firewall.exec(ipList);
});

ipcMain.on("request-reset-firewall", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.webContents.send("spinner", [true]);
    win.webContents.send("reset-worldmap-iplist");

    const request = async () => {
        return new ServersService().getServersList();
    };

    request()
        .then((response) => {
            const clusters = new Cluster(response.data);
            clusters.adapt();

            if (process.platform === "linux" || process.platform === "darwin") {
                new Firewall(win, clusters).reset();
            }

            if (process.platform === "win32") {
                new Firewall(win).reset();
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

ipcMain.on("cliking-ad", (event) => {
    callAnalysticsClikingAd(event);
});

function ping(event) {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.webContents.send("spinner", [true]);
    win.webContents.send("reset-worldmap-iplist");

    const request = async () => {
        return new ServersService().getServersList();
    };

    request()
        .then((response) => {
            const clusters = new Cluster(response.data);
            clusters.adapt();

            const ping = new PingWrapper(clusters, win);
            ping.execute();
        })
        .catch((error) => {
            console.log(error);
        });
}

function callAnalysticsClikingAd() {
    new AnalyticsService().postClikingAd();
}
