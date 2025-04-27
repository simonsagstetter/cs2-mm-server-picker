import usePop from "../../hooks/usePop";
import { motion } from "motion/react";
import styles from "./RegionItem.Styles";

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
