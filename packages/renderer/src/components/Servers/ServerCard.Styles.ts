import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";

export default parse({
    listItem: {
        pseudo: "group",
        layout: "relative flex flex-col items-center align-middle overflow-hidden",
        spacing: "p-2 mb-2",
        sizing: "w-38 h-64",
        effect: "shadow-sm",
        transition: "will-change-[transform] transition-discrete",
        typo: "text-cs2-white",
        background: "bg-cs2-dark/45",
        interactivity: "cursor-pointer **:select-none",
    },
    selectedNotBlocked: {
        background: "!bg-cs2-dark/5",
        border: "border-4 border-cs2-white",
    },
    blocked: {
        border: "border-4 border-cs2-darkred",
        background: "!bg-cs2-darkred/15",
    },
    running: {
        interactivity: "!cursor-not-allowed",
    },
    actions: {
        layout: "flex flex-row justify-between items-start basis-3/12",
        interactivity: "select-none",
        sizing: "w-full",
    },
    logo: {
        border: "border-cs2-white/50 border-[1px] rounded-xs",
        sizing: "h-5 w-5",
    },
    relaySection: {
        layout: "basis-4/12 items-center justify-center content-center",
    },
    relayDetail: {
        typo: "text-center text-sm",
        background: "bg-linear-to-r from-cs2-grey to-cs2-darkgrey",
        spacing: "py-[0.1rem] px-2",
        border: "border-[1px] border-stone-400/50 rounded-xs",
        interactivity: "select-none",
    },
    infoSection: {
        layout: "flex flex-col gap-1 basis-5/12 items-center justify-end",
        typo: "text-center",
    },
    infoTitle: {
        typo: "text-lg leading-4 tracking-tightest uppercase text-cs2-white",
        interactivity: "select-none",
    },
    infoPing: {
        typo: "font-light text-xs",
        interactivity: "select-none",
    },
    infoPingIcon: {
        typo: "inline text-[0.6rem]",
        spacing: "mr-1 mb-[2px]",
    },
    imageWraper: {
        layout: "absolute top-0 -z-10 overflow-hidden",
        sizing: "w-38 h-64",
    },
    image: {
        layout: "object-none",
        effect: "blur-[3px]",
        sizing: "w-full h-full",
    },
    imageSelected: {
        effect: "brightness-70",
        hover: {
            effect: "group-hover:brightness-70",
        },
    },
    imageUnselected: {
        effect: "brightness-50",
        hover: {
            effect: "group-hover:brightness-60",
        },
    },
    imageTexture: {
        layout: "absolute top-0 left-0 -z-10 object-none",
        sizing: "w-38 h-64",
        effect: "opacity-5 brightness-50",
    },
} as TailwindStylesheet);
