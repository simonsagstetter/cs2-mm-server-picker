import { LuSatelliteDish } from "react-icons/lu";
import { TbRestore } from "react-icons/tb";
import { PiStackMinus } from "react-icons/pi";
import SidebarActionItem from "./SidebarActionItem";
import usePop from "../../hooks/usePop";

interface SidebarAction {
    isRunning: boolean;
}

const SidebarAction: React.FC<SidebarAction> = ({ isRunning }) => {
    const { resetSelection, refreshPings, resetApp, showModal } = usePop();

    const isRunningWarning = () =>
        showModal({
            title: "App is running",
            message: "Server blocking action is running. Please cancel the action first.",
        });

    return (
        <div className="px-6 basis-2/12 content-end">
            <nav>
                <ul className="flex flex-row items-center justify-evenly">
                    <SidebarActionItem
                        tooltip="Refresh Pings"
                        action={() => (!isRunning ? refreshPings() : isRunningWarning())}
                        disabled={isRunning}
                    >
                        <LuSatelliteDish className="text-cs2-white text-2xl stroke-[1.5px]" />
                    </SidebarActionItem>
                    <SidebarActionItem
                        tooltip="Reset Selection"
                        action={() => (!isRunning ? resetSelection() : isRunningWarning())}
                        disabled={isRunning}
                    >
                        <PiStackMinus className="text-cs2-white text-2xl " />
                    </SidebarActionItem>
                    <SidebarActionItem tooltip="Reset App" action={resetApp} disabled={false}>
                        <TbRestore className="text-cs2-white text-2xl stroke-[1.5px]" />
                    </SidebarActionItem>
                </ul>
            </nav>
        </div>
    );
};

export default SidebarAction;
