import usePop from "../../hooks/usePop";
import RegionItem from "./RegionItem";
import { motion } from "motion/react";
import styles from "./Region.Styles";

const Region: React.FC = () => {
    const { groupedPops } = usePop(),
        isReady = groupedPops !== undefined && groupedPops.size > 0;
    return (
        <nav className={styles.navbar}>
            <motion.ul layoutRoot className={styles.navlist}>
                {isReady && Array.from(groupedPops.keys()).map((region) => <RegionItem key={region} region={region} />)}
            </motion.ul>
        </nav>
    );
};

export default Region;
