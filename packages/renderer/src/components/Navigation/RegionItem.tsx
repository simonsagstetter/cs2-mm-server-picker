import usePop from "../../hooks/usePop";
import { motion } from "motion/react";
import { parse } from "../../util/tw";
import { TailwindStylesheet } from "../../types/tw";

const styles = parse({
    listItem: {
        typo: "text-cs2-white uppercase",
        pseudo: "group",
        layout: "relative",
        border: "rounded-sm",
        spacing: "py-[0.1rem] px-2",
        interactivity: "**:cursor-pointer cursor-pointer select-none",
        background: "bg-transparent",
    },
    active: {
        typo: "!text-cs2-lightblue",
        hover: {
            typo: "hover:text-cs2-lightblue",
        },
    },
    notActive: {
        hover: {
            background: "hover:bg-cs2-white/10",
        },
    },
    marker: {
        layout: "block absolute top-0 left-0",
        sizing: "w-full h-full",
        background: "bg-cs2-blue/90",
        border: "rounded-sm",
        hover: {
            background: "group-hover:bg-cs2-white/10",
        },
    },
    title: { layout: "relative" },
} as TailwindStylesheet);

interface RegionItem {
    region: string;
}

const RegionItem: React.FC<RegionItem> = ({ region }) => {
    const { selectedRegion, updateSelectedRegion } = usePop(),
        isActive = region === selectedRegion;

    const handleOnClick = () => {
        updateSelectedRegion(region);
    };

    return (
        <motion.li
            key={region}
            onClick={handleOnClick}
            className={`${styles.listItem} ${isActive ? styles.active : styles.notActive}`}
        >
            {isActive && <motion.span layoutId="regionItem" className={styles.marker}></motion.span>}
            <p className={styles.title}>{region}</p>
        </motion.li>
    );
};

export default RegionItem;
