import { SDRConfig, PoP } from "../../../../types/pop.types.js";
import PopAdapter from "./adapters.js";

export const fetchSDRConfig = async (): Promise<any> => {
    const response = await fetch("https://api.steampowered.com/ISteamApps/GetSDRConfig/v1?appid=730");

    if (!response.ok) throw response;

    const data: SDRConfig = await response.json();
    const instance = (await (await new PopAdapter(data).parse()).getRelayPings()).group();

    return { pops: instance.pops, groupedPops: instance.groupedPops };
};
