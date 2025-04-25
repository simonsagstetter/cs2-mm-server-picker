import usePop from "../../hooks/usePop";

interface RegionItem {
    region: string;
}

const RegionItem: React.FC<RegionItem> = ({ region }) => {
    const { selectedRegion, updateSelectedRegion } = usePop();

    const handleOnClick = () => {
        updateSelectedRegion(region);
    };

    return (
        <li
            key={region}
            onClick={handleOnClick}
            className={`text-cs2-white uppercase hover:bg-cs2-white/10 rounded-sm py-[0.1rem] px-2 **:cursor-pointer cursor-pointer select-none ${
                region !== selectedRegion
                    ? "bg-transparent"
                    : "bg-cs2-blue/90 !text-cs2-lightblue hover:text-cs2-lightblue"
            }`}
        >
            {region}
        </li>
    );
};

export default RegionItem;
