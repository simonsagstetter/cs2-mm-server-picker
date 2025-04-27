import { TailwindStylesheet } from "../../../types/tw";
import { parse } from "../../../util/tw";

export default parse({
    container: {
        layout: "fixed flex flex-col justify-center items-center z-10 ",
        sizing: "w-screen h-screen",
        interactivity: "cursor-wait",
        effect: "backdrop-blur-sm",
    },
    frame: {
        layout: "relative",
        sizing: "w-2/4 h-5/12",
        background: "bg-linear-to-r from-cs2-lightgreen via-cs2-green to-cs2-darkgreen",
        spacing: "p-[0.35rem]",
        effect: "shadow-md",
        interactivity: "pointer-events-none",
    },
    body: {
        layout: "relative overflow-hidden object-contain",
        sizing: "w-full h-full",
        background: "bg-linear-to-r from-cs2-darkgreen via-cs2-darkergreen to-cs2-darkestgreen",
    },
    image: {
        layout: "absolute top-0 left-0",
        effect: "opacity-10 blur-xs",
    },
    layer: {
        layout: "absolute top-0 left-0",
        sizing: "h-auto w-screen",
        effect: "opacity-15",
    },
    content: {
        layout: "flex flex-col items-center justify-evenly",
        sizing: "h-full",
    },
    layout: {
        layout: "flex flex-col items-center justify-center gap-2",
    },
    title: {
        typo: "tracking-tight text-cs2-lightgreen uppercase text-4xl",
    },
    hr: {
        border: "border-cs2-green border-[0.5px]",
        sizing: "w-full",
    },
    ci: {
        layout: "flex flex-row justify-center items-center gap-2",
    },
    ciLogo: {
        border: "border-cs2-white/50 border-[1px] rounded-xs",
        sizing: "h-6 w-6",
    },
    ciName: {
        typo: "text-cs2-lightgreen !capitalize text-base",
    },
} as TailwindStylesheet);
