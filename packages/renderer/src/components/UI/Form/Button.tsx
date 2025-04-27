import Dots from "../../../assets/images/dots.svg";
import { motion } from "motion/react";
import { button } from "../../../motion/ui.config";
import styles from "./Button.Styles";

interface Button {
    variant: "action" | "cancel";
    label: string;
    disabled?: boolean;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<Button> = ({ variant, label, ...props }) => {
    return (
        <motion.button
            {...button}
            className={`${styles.button} ${variant === "action" ? styles.action : styles.cancel}`}
            {...props}
        >
            <img src={Dots} className={styles.image} />
            <span className={styles.label}>{label}</span>
        </motion.button>
    );
};
