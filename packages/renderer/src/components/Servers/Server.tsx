import usePop from "../../hooks/usePop";
import { serverList } from "../../motion/server.config";
import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";
import ServerCard from "./ServerCard";
import { AnimatePresence, motion } from "motion/react";

const styles = parse({
    section: {
        layout: "basis-10/12 overflow-y-auto",
        sizing: "h-[551px]",
        spacing: "mx-auto",
        background: "bg-cs2-dark/45",
    },
    list: {
        layout: "flex flex-row flex-wrap gap-4",
        spacing: "p-4",
    },
} as TailwindStylesheet);

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
