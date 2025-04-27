import { TailwindStylesheet } from "../../../types/tw";
import { parse } from "../../../util/tw";

export default parse({
    group: {
        layout: "flex gap-2",
    },
    input: {
        pseudo: "peer shrink-0",
        layout: "relative",
        background: "bg-transparent",
        interactivity: "appearance-none cursor-pointer",
        sizing: "w-5 h-5",
        border: "border-[1px] border-cs2-white/50 rounded-[1px]",
        spacing: "mt-1",
        focus: {
            border: "focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-cs2-white",
        },
        checked: {
            border: "checked:border-0",
        },
        disabled: {
            border: "disabled:border-steel-400",
            background: "disabled:bg-steel-400",
        },
    },
    blocked: {
        checked: {
            background: "checked:bg-cs2-darkred",
        },
    },
    selected: {
        checked: {
            background: "checked:bg-cs2-white",
        },
    },
    svg: {
        layout: "absolute hidden",
        sizing: "w-5 h-5",
        interactivity: "pointer-events-none",
        checked: {
            layout: "peer-checked:block",
        },
        spacing: "mt-1",
        border: "outline-none",
        transition: "transition-discrete",
    },
    svgBlocked: {
        svg: "stroke-cs2-white",
    },
    svgSelected: {
        svg: "stroke-cs2-dark/85",
    },
} as TailwindStylesheet);
