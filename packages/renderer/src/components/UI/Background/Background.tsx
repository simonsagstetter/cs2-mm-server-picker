import NukeBackground from "../../../assets/nukebg.png";
import Dots from "../../../assets/dots.svg";

const Background: React.FC = () => {
    return (
        <div className="absolute object-cover -z-10 w-screen h-screen top-0 left-0 overflow-hidden">
            <img src={NukeBackground} className="scale-150 blur-xl" />
            <img src={Dots} className="absolute top-0 left-0 h-auto w-screen opacity-15" />
        </div>
    );
};

export default Background;
