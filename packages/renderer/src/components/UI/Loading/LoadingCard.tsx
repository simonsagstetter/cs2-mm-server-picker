import Dust2 from "../../../assets/images/dust2.png";
import CS2Logo from "../../../assets/images/logo-24x24.png";
import { createPortal } from "react-dom";
import Dots from "../../../assets/images/dots.svg";
import LoadingAnimation from "./LoadingAnimation";
import LoadingMessage from "./LoadingMessage";
import { AnimatePresence, motion } from "motion/react";

interface LoadingCard {
    title: string;
    messages: string[];
    isActive: boolean;
}

const LoadingCard: React.FC<LoadingCard> = ({ title, messages, isActive }) => {
    const domNode = document.getElementById("loading") as HTMLDivElement; // Does exist, is hardcoded

    return createPortal(
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    key={title}
                    initial={{
                        scale: 0.5,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                    }}
                    exit={{
                        scale: 0.5,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        type: "spring",
                    }}
                    className="fixed flex flex-col justify-center items-center z-10 backdrop-blur-sm w-screen h-screen cursor-wait ease-in-out duration-200"
                >
                    <div className="relative w-2/4 h-5/12 bg-linear-to-r from-cs2-lightgreen via-cs2-green to-cs2-darkgreen p-[0.35rem] shadow-md pointer-events-none">
                        <div className="relative w-full h-full bg-linear-to-r from-cs2-darkgreen via-cs2-darkergreen to-cs2-darkestgreen overflow-hidden object-contain">
                            <img src={Dust2} className="absolute top-0 left-0 opacity-10 blur-xs" />
                            <img src={Dots} className="absolute top-0 left-0 h-auto w-screen opacity-15" />
                            <div className="flex flex-col items-center justify-evenly h-full">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <h1 className="tracking-tight text-cs2-lightgreen uppercase text-4xl">{title}</h1>
                                    <hr className="border-cs2-green border-[0.5px] w-full" />
                                    <div className="flex flex-row justify-center items-center gap-2">
                                        <img
                                            src={CS2Logo}
                                            className="border-cs2-white/50 border-[1px] rounded-xs h-6 w-6"
                                        />
                                        <small className="text-cs2-lightgreen !capitalize text-base">
                                            Counter Strike 2
                                        </small>
                                    </div>
                                </div>
                                <LoadingAnimation>
                                    <LoadingMessage {...{ messages }} />
                                </LoadingAnimation>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        domNode,
    );
};

export default LoadingCard;
