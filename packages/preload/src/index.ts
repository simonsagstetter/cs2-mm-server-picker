import { sha256sum } from "./nodeCrypto.js";
import { versions } from "./versions.js";
import { ipcRenderer } from "electron";

function send(channel: string, message: string) {
    return ipcRenderer.invoke(channel, message);
}

function sendWithData<T>(channel: string, data: T) {
    return ipcRenderer.invoke(channel, data);
}

export { sha256sum, versions, send, sendWithData };
