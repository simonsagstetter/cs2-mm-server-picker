import { PoP } from "../../../../../types/pop.types";
import SidebarServerListItem from "./SidebarServerListItem";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import styles from "./SidebarServerList.Styles";
import { serverList, serverListTitle } from "../../motion/sidebar.config";

interface SidebarServerList {
    isRunning: boolean;
    title: string;
    pops: PoP[];
}

const SidebarServerList: React.FC<SidebarServerList> = ({ isRunning, title, pops }) => {
    return (
        <>
            <motion.p key={title} className={styles.title} {...serverListTitle}>
                {title}
            </motion.p>
            <LayoutGroup>
                <motion.ul layout key={title} {...serverList} className={styles.list}>
                    <AnimatePresence mode="sync">
                        {pops.map((pop) => (
                            <SidebarServerListItem key={pop.id} pop={pop} blocked={isRunning} />
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </LayoutGroup>
        </>
    );
};

export default SidebarServerList;
