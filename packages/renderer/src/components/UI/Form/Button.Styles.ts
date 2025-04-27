import { TailwindStylesheet } from "../../../types/tw";
import { parse } from "../../../util/tw";

export default parse({
    button: {
        layout: "relative",
        sizing: "w-48 h-10",
        border: "border-[0.5px]",
        spacing: "mr-4",
        typo: "text-2xl uppercase font-bold",
        transition: "duration-500 transition-colors ease-in-out",
        interactivity: "cursor-pointer disabled:cursor-not-allowed",
    },
    action: {
        background: "bg-gradient-to-r from-cs2-green from-5% via-cs2-darkgreen via-50% to-cs2-green to-95%",
        border: "border-cs2-lightgreen",
        typo: "text-cs2-lightgreen",
        hover: {
            background: "hover:from-cs2-lightgreen hover:to-cs2-lightgreen",
        },
    },
    cancel: {
        background: "bg-gradient-to-r from-cs2-darkred from-5% via-cs2-darkerred via-50% to-cs2-darkred to-95%",
        border: "border-cs2-red",
        typo: "text-cs2-red",
        hover: {
            background: "hover:from-cs2-red hover:to-cs2-red",
        },
    },
    image: {
        layout: "absolute top-0 left-0 object-none z-10",
        sizing: "w-full h-full",
        effect: "opacity-5",
    },
    label: {
        layout: "z-20",
    },
} as TailwindStylesheet);
