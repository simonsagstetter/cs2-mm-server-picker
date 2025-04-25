import usePop from "../../hooks/usePop";

import SidebarAction from "./SidebarAction";
import SidebarOption from "./SidebarOption";

import SidebarServerList from "./SidebarServerList";

const Sidebar: React.FC = () => {
    const { blockedPops } = usePop(),
        isRunning = blockedPops !== undefined && Array.isArray(blockedPops) && blockedPops.length > 0;
    return (
        <aside className="flex flex-col basis-2/12 bg-cs2-dark/40 py-2 relative">
            <div className="basis-5/12 content-start">
                <p className="text-cs2-white font-light uppercase mb-2 text-lg px-6">Options</p>
                <div className="flex flex-col justify-start items-start gap-2 mb-6">
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
            <SidebarServerList isRunning={isRunning} />
            <SidebarAction isRunning={isRunning} />
        </aside>
    );
};

export default Sidebar;
