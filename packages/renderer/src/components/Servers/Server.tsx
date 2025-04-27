import usePop from "../../hooks/usePop";
import { serverList } from "../../motion/server.config";
import ServerCard from "./ServerCard";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Server.Styles";

const Server: React.FC = () => {
    const { groupedPops, selectedRegion, blockedPops } = usePop(),
        isReady = groupedPops !== undefined && groupedPops.size > 0,
        isRunning = blockedPops !== undefined && Array.isArray(blockedPops) && blockedPops.length > 0;

    return (
        <section className={styles.section}>
            <AnimatePresence mode="popLayout">
                <motion.ul key={selectedRegion} className={styles.list} {...serverList}>
                    {isReady &&
                        groupedPops
                            .get(selectedRegion)
                            ?.filter((pop) => pop.relays.length > 0)
                            .map((pop, index) => (
                                <ServerCard key={pop.id} pop={pop} index={index} isRunning={isRunning} />
                            ))}
                </motion.ul>
            </AnimatePresence>
        </section>
    );
};

export default Server;
