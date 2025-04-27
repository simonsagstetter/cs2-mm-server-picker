import type { AppInitConfig } from "./AppInitConfig.js";
import { createModuleRunner } from "./ModuleRunner.js";
import { disallowMultipleAppInstance } from "./modules/SingleInstanceApp.js";
import { createWindowManagerModule } from "./modules/WindowManager.js";
import { terminateAppOnLastWindowClose } from "./modules/ApplicationTerminatorOnLastWindowClose.js";
import { hardwareAccelerationMode } from "./modules/HardwareAccelerationModule.js";
import { autoUpdater } from "./modules/AutoUpdater.js";
import { allowInternalOrigins } from "./modules/BlockNotAllowdOrigins.js";
import { allowExternalUrls } from "./modules/ExternalUrls.js";
import { ipcMain } from "electron";
import { fetchSDRConfig } from "./services/sdr.js";
import { refreshPing } from "./services/ping.js";
import { PoP } from "../../../types/pop.types.js";
import Firewall from "./services/firewall.js";

export async function initApp(initConfig: AppInitConfig) {
    const moduleRunner = createModuleRunner()
        .init(createWindowManagerModule({ initConfig, openDevTools: import.meta.env.DEV }))
        .init(disallowMultipleAppInstance())
        .init(terminateAppOnLastWindowClose())
        .init(hardwareAccelerationMode({ enable: true }))
        .init(autoUpdater())

        // Install DevTools extension if needed
        // .init(chromeDevToolsExtension({extension: 'VUEJS3_DEVTOOLS'}))

        // Security
        .init(allowInternalOrigins(new Set(initConfig.renderer instanceof URL ? [initConfig.renderer.origin] : [])))
        .init(
            allowExternalUrls(
                new Set(
                    initConfig.renderer instanceof URL
                        ? [
                              "https://vite.dev",
                              "https://developer.mozilla.org",
                              "https://solidjs.com",
                              "https://qwik.dev",
                              "https://lit.dev",
                              "https://react.dev",
                              "https://preactjs.com",
                              "https://www.typescriptlang.org",
                              "https://vuejs.org",
                          ]
                        : [],
                ),
            ),
        );

    await moduleRunner;
}

export function registerHandlers() {
    ipcMain.handle("fetch-sdr-config", fetchSDRConfig);
    ipcMain.handle("refresh-pings", async (event: Electron.IpcMainInvokeEvent, pops: Record<string, PoP>) =>
        refreshPing(pops),
    );
    ipcMain.handle("block-pops", async (event: Electron.IpcMainInvokeEvent, pops: PoP[]) => {
        const fw = new Firewall();
        return await fw.blockPops(pops);
    });
    ipcMain.handle("unblock-pops", async (event: Electron.IpcMainInvokeEvent, ruleNames: string[]) => {
        const fw = new Firewall();
        return await fw.unblockPops(ruleNames);
    });
}
