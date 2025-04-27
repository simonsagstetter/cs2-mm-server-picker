import { useRef } from "react";
import { Checkbox } from "../UI/Form/Input";
import { FaRegClock } from "react-icons/fa";
import { PoP } from "../../../../../types/pop.types";
import usePop from "../../hooks/usePop";
import CS2Logo from "../../assets/images/logo-24x24.png";
import Ancient from "../../assets/images/ancient.png";
import Anubis from "../../assets/images/anubis.jpg";
import Cache from "../../assets/images/cache.jpg";
import Dust2 from "../../assets/images/dust2.png";
import Inferno from "../../assets/images/inferno.jpeg";
import Italy from "../../assets/images/italy.jpg";
import Mirage from "../../assets/images/mirage.jpg";
import Overpass from "../../assets/images/overpass.jpg";
import Train from "../../assets/images/train.jpg";
import Vertigo from "../../assets/images/vertigo.jpg";
import Dots from "../../assets/images/dots.svg";
import { motion } from "motion/react";
import { serverListItem } from "../../motion/server.config";
import styles from "./ServerCard.Styles";
import { RUNNING_ACTION_ERROR } from "../../constants/messages";

const BACKGROUNDS = new Map<number, string>([
    [0, Ancient],
    [1, Anubis],
    [2, Cache],
    [3, Dust2],
    [4, Inferno],
    [5, Italy],
    [6, Mirage],
    [7, Vertigo],
    [8, Overpass],
    [9, Train],
]);

interface ServerCard {
    pop: PoP;
    index: number;
    isRunning: boolean;
}

const ServerCard: React.FC<ServerCard> = ({ pop, index, isRunning }) => {
    const { addPop, removePop, selectedPops, blockedPops, showModal } = usePop();
    const checkbox = useRef<HTMLInputElement>(null);

    const averagePingMsg = pop.averageTime === 0 ? "Not Reachable" : `${pop.averageTime} ms`,
        isSelected = selectedPops.findIndex((item) => item.id === pop.id) !== -1,
        isBlocked = blockedPops.findIndex((item) => item.id === pop.id) !== -1,
        image = BACKGROUNDS.get(index % 10);

    const handleOnClick = () => {
        if (checkbox.current !== null && !isRunning) checkbox.current.click();
        if (isRunning) showModal(RUNNING_ACTION_ERROR);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        if (value !== undefined && !isRunning) {
            if (value) addPop(pop);
            else removePop(pop);
        }
    };

    return (
        <motion.li
            className={`${styles.listItem} ${isSelected && !isBlocked ? styles.selectedNotBlocked : ""}
                ${isBlocked ? styles.blocked : ""}
                ${isRunning ? styles.running : ""}`}
            onClick={handleOnClick}
            layout="preserve-aspect"
            {...serverListItem}
        >
            <div className={styles.actions}>
                <img src={CS2Logo} className={styles.logo} />
                <Checkbox
                    ref={checkbox}
                    checked={isSelected}
                    disabled={isRunning}
                    isBlocked={isBlocked}
                    onChange={handleOnChange}
                    onClick={(event: React.MouseEvent) => event.stopPropagation()}
                />
            </div>
            <div className={styles.relaySection}>
                <p className={styles.relayDetail}>
                    <strong>{pop.relays.length}</strong> Servers
                    <br /> Available
                </p>
            </div>
            <div className={styles.infoSection}>
                <h1 className={styles.infoTitle}>{pop.namedLocation}</h1>
                <h3 className={styles.infoPing}>
                    <FaRegClock className={styles.infoPingIcon} />
                    {averagePingMsg}
                </h3>
            </div>
            <div className={styles.imageWraper}>
                <motion.img
                    src={image}
                    className={` ${styles.image} ${isSelected ? styles.imageSelected : styles.imageUnselected}`}
                />
            </div>
            <img src={Dots} className={styles.imageTexture} />
        </motion.li>
    );
};

export default ServerCard;
