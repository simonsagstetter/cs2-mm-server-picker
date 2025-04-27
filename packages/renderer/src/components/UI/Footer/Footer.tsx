import usePop from "../../../hooks/usePop";
import { Button } from "../Form/Button";
import styles from "./Footer.Styles";

const Footer: React.FC = () => {
    const { selectedPops, blockedPops, blockPops, unblockPops } = usePop(),
        hasPops = selectedPops !== undefined && selectedPops.length > 0,
        hasBlockedPops = blockedPops !== undefined && blockedPops.length > 0;
    return (
        <footer className={styles.footer}>
            {!hasBlockedPops ? (
                <Button disabled={!hasPops} onClick={blockPops} variant="action" label="Go" />
            ) : (
                <Button onClick={unblockPops} variant="cancel" label="Cancel" />
            )}
        </footer>
    );
};

export default Footer;
