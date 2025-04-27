import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";

export default parse({
    aside: {
        layout: "flex flex-col basis-2/12 relative",
        spacing: "py-2",
        background: "bg-cs2-dark/40",
    },
    optionForm: {
        layout: "basis-5/12 content-start",
        interactivity: "**:select-none",
    },
    title: {
        typo: "text-cs2-white font-light uppercase text-lg",
        spacing: "mb-2 px-6",
    },
    optionWrapper: {
        layout: "flex flex-col justify-start items-start gap-2",
        spacing: "mb-6",
    },
} as TailwindStylesheet);
