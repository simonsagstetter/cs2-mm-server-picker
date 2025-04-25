import usePop from "../../hooks/usePop";
import ServerCard from "./ServerCard";

const Server: React.FC = () => {
    const { groupedPops, selectedRegion, blockedPops } = usePop(),
        isReady = groupedPops !== undefined && groupedPops.size > 0,
        isRunning = blockedPops !== undefined && Array.isArray(blockedPops) && blockedPops.length > 0;

    return (
        <section className="basis-10/12 h-[551px] mx-auto bg-cs2-dark/45 overflow-y-auto">
            <div className="flex flex-row flex-wrap gap-4 p-4">
                {isReady &&
                    groupedPops
                        .get(selectedRegion)
                        ?.filter((pop) => pop.relays.length > 0)
                        .map((pop, index) => <ServerCard key={pop.id} pop={pop} index={index} isRunning={isRunning} />)}
            </div>
        </section>
    );
};

export default Server;
