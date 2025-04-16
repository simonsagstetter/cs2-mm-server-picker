const { app, BrowserWindow, shell, dialog } = require("electron");
const path = require("path");
const glob = require("glob");
const ServersService = require("./app/services/servers");
const PingWrapper = require("./app/main-process/ping");
const { autoUpdater } = require("electron-updater");
const logE = require("electron-log");
const Files = require("./app/main-process/util");
const log = require("./app/main-process/log");
const { exec } = require("child_process");
const { Cluster } = require("./app/models/cluster");

let win;

function initialize() {
    loadMainFiles();

    function createWindow() {
        win = new BrowserWindow({
            show: false,
            width: 1200,
            webPreferences: { nodeIntegration: true },
            resizable: false,
        });
        win.webContents.openDevTools();
        win.loadFile("./index.html");

        win.setMenuBarVisibility(false);

        win.on("closed", () => {
            win = null;
        });

        win.once("ready-to-show", () => {
            win.show();
            getServersFile();
            getUpdate();
            getFirewallStatusOnWindows();
            win.webContents.send("version", [app.getVersion()]);
        });
    }

    app.allowRendererProcessReuse = true;

    app.on("ready", createWindow);

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("activate", () => {
        if (win === null) {
            createWindow();
        }
    });
}

async function getServersFile() {
    win.webContents.send("spinner", [true]);

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
            log.error(error.stack);
        });
}

function loadMainFiles() {
    try {
        new Files().create();
        const files = glob.sync(path.join(__dirname, "./app/main-process/*.js"));

        files.forEach((file) => {
            require(file);
        });
    } catch (error) {
        log.error(error.stack);
    }
}

function getUpdate() {
    logE.transports.file.level = "debug";
    autoUpdater.logger = logE;
    autoUpdater.checkForUpdatesAndNotify();
}

function getFirewallStatusOnWindows() {
    var cmd =
        'Invoke-Command -ScriptBlock {[Microsoft.Win32.RegistryKey]::OpenRemoteBaseKey("LocalMachine",$env:COMPUTERNAME).OpenSubKey("System\\CurrentControlSet\\Services\\SharedAccess\\Parameters\\FirewallPolicy\\StandardProfile").GetValue("EnableFirewall")}';

    if (process.platform !== "win32") {
        return;
    }

    try {
        exec(cmd, { shell: "powershell.exe" }, (error, stdout, stderr) => {
            if (stdout != 1) {
                win.webContents.send("enableFirewallMessage");
            }
        });
    } catch (error) {
        log.error(error.stack);
    }
}

initialize();
