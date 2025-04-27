import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";

export default parse({
    navbar: {
        border: "border-b-[1px] border-cs2-white/50",
        background: "bg-cs2-dark/40",
    },
    navlist: {
        layout: "flex flex-row gap-3 justify-center items-center",
        sizing: "w-full h-10",
        typo: "**:text-sm **:font-medium",
    },
} as TailwindStylesheet);
