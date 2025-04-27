import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import usePop from "../../../hooks/usePop";
import { AnimatePresence, motion } from "motion/react";
import { errorModal } from "../../../motion/ui.config";
import styles from "./ErrorModal.Styles";

interface ErrorModal {
    title: string;
    message: string;
    isActive: boolean;
}

const ErrorModal: React.FC<ErrorModal> = ({ title, message, isActive }) => {
    const container = document.getElementById("error") as HTMLDivElement; // hardcoded div element
    const { hideModal } = usePop();
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialog.current !== null && isActive) dialog.current.showModal();

        return dialog.current !== null && !isActive ? dialog.current.close() : () => {};
    }, [dialog, isActive]);

    const handleOnClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        hideModal();
    };

    return createPortal(
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.dialog key={message} layout {...errorModal} ref={dialog} className={styles.dialog}>
                    <form className={styles.form}>
                        <section className={styles.header}>
                            <h1 className={styles.title}>{title}</h1>
                        </section>
                        <section className={styles.body}>
                            <p className={styles.message}>{message}</p>
                            <button onClick={handleOnClick} className={styles.button}>
                                ok
                            </button>
                        </section>
                    </form>
                </motion.dialog>
            )}
        </AnimatePresence>,
        container,
    );
};

export default ErrorModal;
