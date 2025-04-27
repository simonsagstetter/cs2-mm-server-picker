import { SDRConfig, PoP } from "../../../../types/pop.types.js";
import PopAdapter from "./adapters.js";

export const fetchSDRConfig = async (): Promise<any> => {
    const response = await fetch("https://api.steampowered.com/ISteamApps/GetSDRConfig/v1?appid=730");

    if (!response.ok) throw response;

    const sdrconfig: SDRConfig = await response.json();
    const adapter = new PopAdapter(sdrconfig);
    const { pops, groupedPops } = (await (await adapter.parse()).getRelayPings()).group();

    return { pops, groupedPops };
};
