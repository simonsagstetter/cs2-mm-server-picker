import { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import styles from "./LoadingAnimation.Styles";

const ELEMENTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const DOTS = [2, 5, 8];

interface LoadingAnimation {
    children: React.ReactNode;
}

const LoadingAnimation: React.FC<LoadingAnimation> = ({ children }) => {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                if (prevIndex === 10) return 0;
                else return prevIndex + 1;
            });
        }, 250);

        return () => clearInterval(interval);
    });

    return (
        <div className={styles.container}>
            <div className={styles.players}>
                {ELEMENTS.map((id) => {
                    const isActive = index >= id,
                        wrapperClasses = `${styles.player} ${isActive ? styles.playerActive : styles.playerInactive}`,
                        iconClasses = `${styles.playerIcon} ${isActive ? styles.playerIconActive : ""}`;
                    return (
                        <div key={id} className={wrapperClasses}>
                            <IoMdPerson className={iconClasses} />
                        </div>
                    );
                })}
            </div>
            <div className={styles.messages}>
                {children}
                <div className={styles.dots}>
                    {DOTS.map((id) => (
                        <span key={id}>{id <= index ? "." : ""}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingAnimation;
