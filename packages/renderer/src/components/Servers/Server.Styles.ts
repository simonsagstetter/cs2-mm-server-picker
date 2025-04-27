import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";

export default parse({
    section: {
        layout: "basis-10/12 overflow-y-auto",
        sizing: "h-[551px]",
        spacing: "mx-auto",
        background: "bg-cs2-dark/45",
    },
    list: {
        layout: "flex flex-row flex-wrap gap-4",
        spacing: "p-4",
    },
} as TailwindStylesheet);
