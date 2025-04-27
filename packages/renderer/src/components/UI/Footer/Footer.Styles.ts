import { TailwindStylesheet } from "../../../types/tw";
import { parse } from "../../../util/tw";

export default parse({
    footer: {
        layout: "flex flex-row items-center justify-end",
        sizing: "w-full h-16",
        background: "bg-cs2-dark/50",
        border: "border-t-[1px] border-cs2-white/50",
    },
} as TailwindStylesheet);
