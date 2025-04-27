import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";

export default parse({
    wrapper: {
        layout: "basis-2/12 content-end",
        spacing: "px-6 ",
    },
    list: {
        layout: "flex flex-row items-center justify-evenly",
    },
    ping: {
        typo: "text-cs2-white text-2xl ",
        svg: "stroke-[1.5px]",
    },
    unselect: {
        typo: "text-cs2-white text-2xl",
    },
    reset: {
        typo: "text-cs2-white text-2xl",
        svg: "stroke-[1.5px]",
    },
} as TailwindStylesheet);
