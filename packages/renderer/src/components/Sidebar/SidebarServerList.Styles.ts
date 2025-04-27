import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";

export default parse({
    title: {
        typo: "text-cs2-white font-light uppercase text-lg",
        spacing: "px-6 mb-2",
    },
    list: {
        layout: "flex flex-row flex-wrap gap-1 overflow-y-auto",
        selection: "max-h-54 w-full",
        spacing: "px-6",
    },
} as TailwindStylesheet);
