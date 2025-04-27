import usePop from "../../hooks/usePop";
import SidebarServerList from "./SidebarServerList";
import { AnimatePresence } from "motion/react";
import styles from "./SidebarServer.Styles";

interface SidebarServer {
    isRunning: boolean;
}

const SidebarServer: React.FC<SidebarServer> = ({ isRunning }) => {
    const { selectedPops, blockedPops } = usePop();

    return (
        <div className={styles.container}>
            <AnimatePresence mode="sync">
                {!isRunning && selectedPops.length > 0 && (
                    <SidebarServerList title="Selected Servers" pops={selectedPops} isRunning={isRunning} />
                )}
            </AnimatePresence>
            <AnimatePresence mode="sync">
                {isRunning && <SidebarServerList title="Blocked Servers" pops={blockedPops} isRunning={isRunning} />}
            </AnimatePresence>
        </div>
    );
};

export default SidebarServer;
