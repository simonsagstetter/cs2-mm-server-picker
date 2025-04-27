import { useEffect, useRef } from "react";
import usePop from "../../hooks/usePop";
import styles from "./SidebarOption.Styles";
import { RUNNING_ACTION_ERROR } from "../../constants/messages";

interface SidebarOption {
    title: string;
    description: string;
    isSelectMode?: boolean;
    disabled: boolean;
}

const SidebarOption: React.FC<SidebarOption> = ({ title, description, isSelectMode = false, disabled }) => {
    const { selectMode, changeMode, showModal } = usePop(),
        checkbox = useRef<HTMLInputElement>(null),
        isChecked = (selectMode && isSelectMode) || (!isSelectMode && !selectMode);

    useEffect(() => {
        if (checkbox.current !== null) {
            if (isChecked) checkbox.current.checked = true;
            else checkbox.current.checked = false;
        }
    }, [checkbox, isChecked]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        if (isChecked !== undefined) {
            if ((isSelectMode && isChecked) || (!isSelectMode && !isChecked)) changeMode(true);
            if ((isSelectMode && !isChecked) || (!isSelectMode && isChecked)) changeMode(false);
        }
    };

    const handleOnClick = () => {
        if (disabled) showModal(RUNNING_ACTION_ERROR);
    };

    return (
        <div className={styles.optionWrapper}>
            <div className={styles.inputGroup}>
                <h2 className={styles.inputTitle}>{title}</h2>
                <label htmlFor={title} className={styles.inputLabel}>
                    <input
                        type="checkbox"
                        id={title}
                        className={styles.input}
                        onChange={handleOnChange}
                        onClick={handleOnClick}
                        defaultChecked={false}
                        ref={checkbox}
                        disabled={disabled}
                    />
                    <span className={`${styles.switch} ${disabled ? styles.disabled : ""}`}></span>
                </label>
            </div>
            <small className={styles.description}>{description}</small>
        </div>
    );
};

export default SidebarOption;
