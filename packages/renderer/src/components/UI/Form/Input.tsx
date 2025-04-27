import { forwardRef } from "react";
import styles from "./Input.Styles";

interface Checkbox {
    checked: boolean;
    disabled: boolean;
    isBlocked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, Checkbox>(({ isBlocked, ...props }, ref) => {
    return (
        <div className="flex gap-2">
            <input
                ref={ref}
                type="checkbox"
                className={`${styles.input} ${isBlocked ? styles.blocked : styles.selected}`}
                {...props}
            />
            <svg
                className={`${styles.svg} ${isBlocked ? styles.svgBlocked : styles.svgSelected}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
    );
});
