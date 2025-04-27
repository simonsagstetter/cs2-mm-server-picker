import { PoP } from "../../../../../types/pop.types";
import usePop from "../../hooks/usePop";
import { motion } from "motion/react";
import { serverListItem } from "../../motion/sidebar.config";
import styles from "./SidebarServerListItem.Styles";
import { RUNNING_ACTION_ERROR } from "../../constants/messages";

interface SidebarServerListItem {
    pop: PoP;
    blocked: boolean;
}

const SidebarServerListItem: React.FC<SidebarServerListItem> = ({ pop, blocked }) => {
    const { removePop, showModal } = usePop();

    const handleOnClick = (pop: PoP) => {
        if (!blocked) removePop(pop);
        if (blocked) showModal(RUNNING_ACTION_ERROR);
    };

    return (
        <motion.li
            key={pop.id}
            layout="preserve-aspect"
            {...serverListItem}
            className={`${styles.listItem} ${blocked ? styles.blocked : styles.unblocked}`}
            onClick={() => handleOnClick(pop)}
        >
            {pop.namedLocation}
        </motion.li>
    );
};

export default SidebarServerListItem;
