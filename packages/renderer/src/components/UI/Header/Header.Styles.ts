import { TailwindStylesheet } from "../../../types/tw";
import { parse } from "../../../util/tw";

export default parse({
    header: {
        background: "bg-cs2-dark/35",
        effect: "shadow-xs",
        typo: "**:text-2xl **:text-cs2-white",
        interactivity: "select-none",
    },
    title: {
        layout: "flex flex-row gap-4 justify-center items-center",
        sizing: "w-full h-16",
    },
    nav: {
        background: "bg-cs2-dark/45",
        typo: "**:text-base **:font-medium",
    },
    list: {
        layout: "flex flex-row gap-8  justify-center items-center",
        sizing: "w-full h-12",
        typo: "**:uppercase",
    },
    listItem: {
        background: "bg-cs2-blue/90",
        typo: "text-cs2-lightblue ",
        spacing: "py-[0.1rem] px-2",
        border: "rounded-sm",
        effect: "shadow-xs",
        interactivity: "**:cursor-pointer cursor-pointer select-none",
        hover: {
            background: "hover:bg-cs2-white/10",
        },
    },
} as TailwindStylesheet);
