import styles from "./Header.Styles";

const Header: React.FC = () => {
    return (
        <>
            <div id="dragableArea" className={styles.header}>
                <h1 className={styles.title}>CS2 Matchmaking Server Picker</h1>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Select Servers</li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
