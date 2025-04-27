import { LuSatelliteDish } from "react-icons/lu";
import { TbRestore } from "react-icons/tb";
import { PiStackMinus } from "react-icons/pi";
import SidebarActionItem from "./SidebarActionItem";
import usePop from "../../hooks/usePop";
import styles from "./SidebarAction.Styles";
import { RUNNING_ACTION_ERROR } from "../../constants/messages";

interface SidebarAction {
    isRunning: boolean;
}

const SidebarAction: React.FC<SidebarAction> = ({ isRunning }) => {
    const { resetSelection, refreshPings, resetApp, showModal } = usePop();

    const isRunningWarning = () => showModal(RUNNING_ACTION_ERROR);

    return (
        <div className={styles.wrapper}>
            <nav>
                <ul className={styles.list}>
                    <SidebarActionItem
                        tooltip="Refresh Pings"
                        action={() => (!isRunning ? refreshPings() : isRunningWarning())}
                        disabled={isRunning}
                    >
                        <LuSatelliteDish className={styles.ping} />
                    </SidebarActionItem>
                    <SidebarActionItem
                        tooltip="Reset Selection"
                        action={() => (!isRunning ? resetSelection() : isRunningWarning())}
                        disabled={isRunning}
                    >
                        <PiStackMinus className={styles.unselect} />
                    </SidebarActionItem>
                    <SidebarActionItem tooltip="Reset App" action={resetApp} disabled={false}>
                        <TbRestore className={styles.reset} />
                    </SidebarActionItem>
                </ul>
            </nav>
        </div>
    );
};

export default SidebarAction;
