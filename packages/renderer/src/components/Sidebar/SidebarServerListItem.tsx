import { PoP } from "../../../../../types/pop.types";
import usePop from "../../hooks/usePop";
import { motion } from "motion/react";

interface SidebarServerListItem {
    pop: PoP;
    blocked: boolean;
}

const SidebarServerListItem: React.FC<SidebarServerListItem> = ({ pop, blocked }) => {
    const { removePop, showModal } = usePop();

    const handleOnClick = (pop: PoP) => {
        if (!blocked) removePop(pop);
        if (blocked)
            showModal({
                title: "App is running",
                message: "Server blocking action is running. Please cancel the action first.",
            });
    };

    return (
        <motion.li
            key={pop.id}
            layout="preserve-aspect"
            variants={{
                hidden: {
                    opacity: 0,
                    x: 20,
                    transition: {
                        type: "spring",
                        duration: 0.5,
                    },
                },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        type: "spring",
                        duration: 0.5,
                    },
                },
                exit: {
                    opacity: 0,
                    x: 20,
                    transition: {
                        type: "spring",
                        duration: 0.4,
                    },
                },
            }}
            className={`text-[0.6rem] px-1 py-[2px] rounded-sm uppercase ${
                blocked
                    ? "cursor-not-allowed text-cs2-red bg-cs2-darkerred"
                    : "cursor-pointer text-cs2-lightblue bg-cs2-blue"
            }`}
            onClick={() => handleOnClick(pop)}
        >
            {pop.namedLocation}
        </motion.li>
    );
};

export default SidebarServerListItem;
