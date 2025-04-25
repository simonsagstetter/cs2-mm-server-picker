import usePop from "../../hooks/usePop";
import RegionItem from "./RegionItem";

const Region: React.FC = () => {
    const { groupedPops } = usePop(),
        isReady = groupedPops !== undefined && groupedPops.size > 0;
    return (
        <nav className="bg-cs2-dark/40 border-b-[1px] border-cs2-white/50">
            <ul className="flex flex-row gap-3 w-full h-10 justify-center items-center **:text-sm **:font-medium">
                {isReady && Array.from(groupedPops.keys()).map((region) => <RegionItem key={region} region={region} />)}
            </ul>
        </nav>
    );
};

export default Region;
