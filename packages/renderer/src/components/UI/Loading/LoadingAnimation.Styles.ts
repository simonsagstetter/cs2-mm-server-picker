import { TailwindStylesheet } from "../../../types/tw";
import { parse } from "../../../util/tw";

export default parse({
    container: {
        layout: "flex flex-col items-center justify-centers gap-2",
        typo: "text-cs2-green",
    },
    players: {
        layout: "flex flex-row gap-4",
    },
    player: {
        transition: "duration-100 ease-in-out",
        spacing: "p-2",
        border: "rounded-[1px] border-[1px] border-cs2-darkgreen",
    },
    playerActive: {
        background: "bg-[#109f58]",
        effect: "shadow-[0px_0px_3px_2px_#45a347]",
        transform: "scale-110",
    },
    playerInactive: {
        background: "bg-cs2-darkgreen",
        effect: "blur-[0.5px]",
    },
    playerIcon: {
        typo: "text-xl text-stone-300",
    },
    playerIconActive: {
        typo: "!text-cs2-white",
    },
    messages: {
        layout: "flex flex-row justify-center items-center",
        typo: "!capitalize text-base text-cs2-lightgreen",
        spacing: "ml-4",
    },
    dots: {
        layout: "inline",
        sizing: "w-2",
        spacing: "ml-1",
    },
} as TailwindStylesheet);
