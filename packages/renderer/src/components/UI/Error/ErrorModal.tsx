import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import usePop from "../../../hooks/usePop";
import { AnimatePresence, motion } from "motion/react";

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
                <motion.dialog
                    key={message}
                    layout
                    initial={{
                        scale: 0.5,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                    }}
                    exit={{
                        scale: 0.5,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        type: "spring",
                    }}
                    ref={dialog}
                    className="overflow-none z-50 w-full h-full top-5 left-5 absolute bg-transparent flex flex-col items-center justify-center backdrop:bg-cs2-dark/50 "
                >
                    <form className="w-4/12  bg-cs2-dark shadow-lg shadow-cs2-dark border-[1px] border-cs2-grey2">
                        <section className="bg-cs2-darkgrey">
                            <h1 className="text-cs2-lightergrey font-bold text-xl px-6 py-3">{title}</h1>
                        </section>
                        <section className="flex flex-col justify-between bg-cs2-grey px-6 py-3">
                            <p className="text-cs2-lightgrey font-medium self-start mb-6">{message}</p>
                            <button
                                onClick={handleOnClick}
                                className="text-cs2-white uppercase self-end hover:bg-cs2-lightergrey/15 rounded-sm px-2 py-1 cursor-pointer tracking-tighter font-medium"
                            >
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
