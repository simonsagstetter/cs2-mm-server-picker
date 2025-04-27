import usePop from "../../hooks/usePop";
import SidebarAction from "./SidebarAction";
import SidebarOption from "./SidebarOption";
import styles from "./Sidebar.Styles";
import SidebarServer from "./SidebarServer";

const Sidebar: React.FC = () => {
    const { blockedPops } = usePop(),
        isRunning = blockedPops !== undefined && Array.isArray(blockedPops) && blockedPops.length > 0;
    return (
        <aside className={styles.aside}>
            <div className={styles.optionForm}>
                <p className={styles.title}>Options</p>
                <div className={styles.optionWrapper}>
                    <SidebarOption
                        title="Select Servers"
                        description="Select the severs you want to play on, block all others."
                        isSelectMode
                        disabled={isRunning}
                    />
                    <SidebarOption
                        title="Block Servers"
                        description="Block selected servers, play on all the others."
                        disabled={isRunning}
                    />
                </div>
            </div>
            <SidebarServer isRunning={isRunning} />
            <SidebarAction isRunning={isRunning} />
        </aside>
    );
};

export default Sidebar;
