import styles from "./SidebarActionItem.Styles";

interface SidebarActionItem {
    tooltip: string;
    children: React.ReactNode;
    action: () => void;
    disabled: boolean;
}

const SidebarActionItem: React.FC<SidebarActionItem> = ({ tooltip, children, action, disabled }) => {
    return (
        <li className={styles.listItem}>
            <button
                className={`${styles.button} ${disabled ? styles.disabled : ""}`}
                onClick={action}
                disabled={disabled}
            >
                <span className={styles.tooltip}>{tooltip}</span>
                {children}
            </button>
        </li>
    );
};

export default SidebarActionItem;
