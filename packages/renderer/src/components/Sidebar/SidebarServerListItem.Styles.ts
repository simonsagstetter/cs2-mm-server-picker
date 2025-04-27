import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";

export default parse({
    listItem: {
        typo: "text-[0.6rem] uppercase",
        spacing: "px-1 py-[2px]",
        border: "rounded-sm",
    },
    blocked: {
        interactivity: "cursor-not-allowed",
        typo: "text-cs2-red",
        background: "bg-cs2-darkerred",
    },
    unblocked: {
        interactivity: "cursor-pointer",
        typo: "text-cs2-lightblue",
        background: "bg-cs2-blue",
    },
} as TailwindStylesheet);
