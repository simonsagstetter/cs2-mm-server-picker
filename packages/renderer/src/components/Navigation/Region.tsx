import usePop from "../../hooks/usePop";
import { TailwindStylesheet } from "../../types/tw";
import { parse } from "../../util/tw";
import RegionItem from "./RegionItem";
import { motion } from "motion/react";

const { navbar, navlist } = parse({
    navbar: {
        border: "border-b-[1px] border-cs2-white/50",
        background: "bg-cs2-dark/40",
    },
    navlist: {
        layout: "flex flex-row gap-3 justify-center items-center",
        sizing: "w-full h-10",
        typo: "**:text-sm **:font-medium",
    },
} as TailwindStylesheet);

const Region: React.FC = () => {
    const { groupedPops } = usePop(),
        isReady = groupedPops !== undefined && groupedPops.size > 0;
    return (
        <nav className={navbar}>
            <motion.ul layoutRoot className={navlist}>
                {isReady && Array.from(groupedPops.keys()).map((region) => <RegionItem key={region} region={region} />)}
            </motion.ul>
        </nav>
    );
};

export default Region;
