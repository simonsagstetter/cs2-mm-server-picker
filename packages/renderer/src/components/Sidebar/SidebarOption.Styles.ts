import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";

export default parse({
    optionWrapper: {
        layout: "flex flex-col",
        spacing: "px-6 py-2",
        background: "bg-cs2-dark/[7%]",
    },
    inputGroup: {
        layout: "flex flex-row gap-4 items-center justify-between",
    },
    inputTitle: {
        typo: "text-cs2-white text-lg",
    },
    inputLabel: {
        layout: "relative inline-block",
        sizing: "w-12 h-6",
    },
    input: {
        effect: "opacity-0",
        sizing: "w-0 h-0",
        pseudo: "peer",
    },
    switch: {
        layout: "absolute top-0 left-0 right-0 bottom-0",
        interactivity: "cursor-pointer",
        effect: "inset-shadow-sm inset-shadow-cs2-dark",
        background: "bg-stone-700",
        transition: "duration-200 transition-color",
        border: "rounded-xl",
        before: {
            layout: "before:z-10 before:absolute before:content[' '] before:left-1 before:bottom-1",
            border: "before:rounded-full",
            sizing: "before:h-4 before:w-4",
            background: "before:bg-cs2-white",
            transition: "before:duration-200 before:transition-all",
            effect: "before:shadow-xs",
        },
        checked: {
            background: "peer-checked:bg-cs2-lightgreen",
            effect: "peer-checked:inset-shadow-cs2-darkgreen",
            transform: "peer-checked:before:translate-x-[24px]",
        },
    },
    disabled: {
        interactivity: "!cursor-not-allowed",
    },
    description: {
        typo: "text-cs2-white text-xs",
        interactivity: "select-none",
    },
} as TailwindStylesheet);
