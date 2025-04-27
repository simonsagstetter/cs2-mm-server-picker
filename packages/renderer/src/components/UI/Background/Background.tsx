import NukeBackground from "../../../assets/images/nukebg.png";
import Dots from "../../../assets/images/dots.svg";
import styles from "./Background.Styles";

const Background: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <img src={NukeBackground} className={styles.image} />
            <img src={Dots} className={styles.layer} />
        </div>
    );
};

export default Background;
