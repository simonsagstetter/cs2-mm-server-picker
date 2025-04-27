import { TailwindStylesheet } from "../../../types/tw";
import { parse } from "../../../util/tw";

export default parse({
    dialog: {
        layout: "overflow-none z-50 top-5 left-5 absolute flex flex-col items-center justify-center",
        sizing: "w-full h-full",
        background: "bg-transparent",
        backdrop: "backdrop:bg-cs2-dark/50",
    },
    form: {
        sizing: "w-4/12",
        background: "bg-cs2-dark",
        effect: "shadow-lg shadow-cs2-dark",
        border: "border-[1px] border-cs2-grey2",
    },
    header: {
        background: "bg-cs2-darkgrey",
    },
    title: {
        typo: "text-cs2-lightergrey font-bold text-xl",
        spacing: "px-6 py-3",
    },
    body: {
        layout: "flex flex-col justify-between",
        background: "bg-cs2-grey",
        spacing: "px-6 py-3",
    },
    message: {
        typo: "text-cs2-lightgrey font-medium",
        layout: "self-start",
        spacing: "mb-6",
    },
    button: {
        typo: "text-cs2-white uppercase tracking-tighter font-medium",
        layout: "self-end",
        border: "rounded-sm",
        spacing: "px-2 py-1",
        interactivity: "cursor-pointer",
        hover: {
            background: "hover:bg-cs2-lightergrey/15",
        },
    },
} as TailwindStylesheet);
