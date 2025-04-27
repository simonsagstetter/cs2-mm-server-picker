import { TailwindStylesheet } from "./types/tw";
import { parse } from "./util/tw";

export default parse({
    main: {
        layout: "fixed",
        sizing: "w-screen h-screen",
    },
    content: {
        layout: "flex flex-row",
    },
} as TailwindStylesheet);
