import usePop from "../../hooks/usePop";
import SidebarServerListItem from "./SidebarServerListItem";

interface SidebarServerList {
    isRunning: boolean;
}

const SidebarServerList: React.FC<SidebarServerList> = ({ isRunning }) => {
    const { selectedPops, blockedPops } = usePop();

    return (
        <div className="basis-5/12 content-start">
            {!isRunning && selectedPops.length > 0 && (
                <>
                    <p className="text-cs2-white font-light uppercase mb-2 text-lg px-6">Selected Servers</p>
                    <ul className="px-6 flex flex-row flex-wrap gap-1 w-full max-h-54 overflow-y-auto">
                        {selectedPops.map((pop) => (
                            <SidebarServerListItem key={pop.id} pop={pop} blocked={isRunning} />
                        ))}
                    </ul>
                </>
            )}
            {isRunning && (
                <>
                    <p className="text-cs2-white font-light uppercase mb-2 text-lg px-6">Blocked Servers</p>
                    <ul className="px-6 flex flex-row flex-wrap gap-1 w-full max-h-54 overflow-y-auto">
                        {blockedPops.map((pop) => (
                            <SidebarServerListItem key={pop.id} pop={pop} blocked={isRunning} />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default SidebarServerList;
