import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";

export default parse({
    listItem: {
        layout: "relative group",
    },
    button: {
        layout: "relative",
        border: "rounded-sm",
        spacing: "p-2",
        interactivity: "cursor-pointer",
        hover: {
            background: "hover:bg-cs2-dark/20",
        },
    },
    disabled: {
        interactivity: "!cursor-not-allowed",
    },
    tooltip: {
        layout: "flex flex-col items-center justify-center invisible absolute -left-5 -top-13",
        sizing: "w-20 h-10",
        transition: "transition-all duration-300 ease-in-out",
        typo: "text-cs2-white text-xs text-center",
        effect: "opacity-0  shadow-sm",
        background: "bg-cs2-dark",
        border: "rounded-sm",
        spacing: "px-2 py-1",
        before: {
            layout: "before:content-[' '] before:absolute before:bottom-0  before:-z-10",
            background: "before:bg-cs2-dark",
            transform: "before:translate-y-1 before:rotate-45",
            sizing: "before:w-4 before:h-4",
            border: "before:rounded-[1px]",
        },
        hover: {
            layout: "group-hover:visible",
            effect: "group-hover:opacity-100",
        },
    },
} as TailwindStylesheet);
