import usePop from "../../hooks/usePop";
import SidebarServerListItem from "./SidebarServerListItem";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

interface SidebarServerList {
    isRunning: boolean;
}

const SidebarServerList: React.FC<SidebarServerList> = ({ isRunning }) => {
    const { selectedPops, blockedPops } = usePop();

    return (
        <div className="basis-5/12 content-start">
            <AnimatePresence mode="sync">
                {!isRunning && selectedPops.length > 0 && (
                    <>
                        <motion.p
                            key="selectedTitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-cs2-white font-light uppercase mb-2 text-lg px-6"
                        >
                            Selected Servers
                        </motion.p>
                        <LayoutGroup>
                            <motion.ul
                                layout
                                key="selectedList"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                        },
                                    },
                                }}
                                className="px-6 flex flex-row flex-wrap gap-1 w-full max-h-54 overflow-y-auto"
                            >
                                <AnimatePresence mode="sync">
                                    {selectedPops.map((pop) => (
                                        <SidebarServerListItem key={pop.id} pop={pop} blocked={isRunning} />
                                    ))}
                                </AnimatePresence>
                            </motion.ul>
                        </LayoutGroup>
                    </>
                )}
            </AnimatePresence>
            {isRunning && (
                <AnimatePresence mode="popLayout">
                    <motion.p
                        key="blockedTitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-cs2-white font-light uppercase mb-2 text-lg px-6"
                    >
                        Blocked Servers
                    </motion.p>
                    <motion.ul
                        key="blockedList"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.05,
                                },
                            },
                        }}
                        className="px-6 flex flex-row flex-wrap gap-1 w-full max-h-54 overflow-y-auto"
                    >
                        {blockedPops.map((pop) => (
                            <SidebarServerListItem key={pop.id} pop={pop} blocked={isRunning} />
                        ))}
                    </motion.ul>
                </AnimatePresence>
            )}
        </div>
    );
};

export default SidebarServerList;
