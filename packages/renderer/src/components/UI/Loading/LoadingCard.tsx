import Dust2 from "../../../assets/images/dust2.png";
import CS2Logo from "../../../assets/images/logo-24x24.png";
import { createPortal } from "react-dom";
import Dots from "../../../assets/images/dots.svg";
import LoadingAnimation from "./LoadingAnimation";
import LoadingMessage from "./LoadingMessage";
import { AnimatePresence, motion } from "motion/react";
import { loading } from "../../../motion/ui.config";
import styles from "./LoadingCard.Styles";

interface LoadingCard {
    title: string;
    messages: string[];
    isActive: boolean;
}

const LoadingCard: React.FC<LoadingCard> = ({ title, messages, isActive }) => {
    const domNode = document.getElementById("loading") as HTMLDivElement; // Does exist, is hardcoded

    return createPortal(
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div key={title} {...loading} className={styles.container}>
                    <div className={styles.frame}>
                        <div className={styles.body}>
                            <img src={Dust2} className={styles.image} />
                            <img src={Dots} className={styles.layer} />
                            <div className={styles.content}>
                                <div className={styles.layout}>
                                    <h1 className={styles.title}>{title}</h1>
                                    <hr className={styles.hr} />
                                    <div className={styles.ci}>
                                        <img src={CS2Logo} className={styles.ciLogo} />
                                        <small className={styles.ciName}>Counter Strike 2</small>
                                    </div>
                                </div>
                                <LoadingAnimation>
                                    <LoadingMessage {...{ messages }} />
                                </LoadingAnimation>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        domNode,
    );
};

export default LoadingCard;
