import { TailwindStylesheet } from "../../../types/tw";
import { parse } from "../../../util/tw";

export default parse({
    wrapper: {
        layout: "absolute object-cover -z-10 top-0 left-0 overflow-hidden",
        sizing: "w-screen h-screen",
    },
    image: {
        transform: "scale-150",
        effect: "blur-xl",
    },
    layer: {
        layout: "absolute top-0 left-0",
        sizing: "h-auto w-screen",
        effect: "opacity-15",
    },
} as TailwindStylesheet);
