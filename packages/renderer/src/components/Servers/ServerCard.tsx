import { FaRegClock } from "react-icons/fa";
import CS2Logo from "../../assets/logo-24x24.png";
import { PoP } from "../../../../../types/pop.types";
import { useRef } from "react";
import usePop from "../../hooks/usePop";
import Ancient from "../../assets/ancient.png";
import Anubis from "../../assets/anubis.jpg";
import Cache from "../../assets/cache.jpg";
import Dust2 from "../../assets/dust2.png";
import Inferno from "../../assets/inferno.jpeg";
import Italy from "../../assets/italy.jpg";
import Mirage from "../../assets/mirage.jpg";
import Overpass from "../../assets/overpass.jpg";
import Train from "../../assets/train.jpg";
import Vertigo from "../../assets/vertigo.jpg";
import Dots from "../../assets/dots.svg";

const BACKGROUNDS = new Map<number, string>([
    [0, Ancient],
    [1, Anubis],
    [2, Cache],
    [3, Dust2],
    [4, Inferno],
    [5, Italy],
    [6, Mirage],
    [7, Vertigo],
    [8, Overpass],
    [9, Train],
]);

interface ServerCard {
    pop: PoP;
    index: number;
    isRunning: boolean;
}

const ServerCard: React.FC<ServerCard> = ({ pop, index, isRunning }) => {
    const { addPop, removePop, selectedPops, blockedPops, showModal } = usePop();
    const checkbox = useRef<HTMLInputElement>(null);
    const averagePingMsg = pop.averageTime === 0 ? "Not Reachable" : `${pop.averageTime} ms`,
        isSelected = selectedPops.findIndex((item) => item.id === pop.id) !== -1,
        image =
            index < 10 ? BACKGROUNDS.get(index) : BACKGROUNDS.get(parseInt(new Number(Math.random() * 9).toFixed(0))),
        isBlocked = blockedPops.findIndex((item) => item.id === pop.id) !== -1;

    const handleOnClick = () => {
        if (checkbox.current !== null && !isRunning) checkbox.current.click();
        if (isRunning)
            showModal({
                title: "App is running",
                message: "Server blocking action is running. Please cancel the action first.",
            });
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        if (value !== undefined && !isRunning) {
            if (value) addPop(pop);
            else removePop(pop);
        }
    };

    return (
        <div
            className={`relative flex flex-col items-center p-2 mb-2 w-38 h-64 shadow-sm align-middle hover:bg-cs2-dark/5 duration-100 ease-in-out text-cs2-white overflow-hidden 
                ${isSelected && !isBlocked ? "border-4 border-cs2-white bg-cs2-dark/5" : "bg-cs2-dark/45"}
                ${isBlocked ? "border-4 border-cs2-darkred bg-cs2-darkred/15" : "bg-cs2-dark/45"}
                ${isRunning ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleOnClick}
        >
            <div className="flex flex-row justify-between items-start w-full basis-3/12 select-none">
                <img src={CS2Logo} className="border-cs2-white/50 border-[1px] rounded-xs h-5 w-5" />
                <div className="flex gap-2">
                    <input
                        ref={checkbox}
                        onChange={handleOnChange}
                        onClick={(event: React.MouseEvent) => event.stopPropagation()}
                        checked={isSelected}
                        type="checkbox"
                        disabled={isRunning}
                        className={`
                                peer relative bg-transparent appearance-none shrink-0 w-5 h-5 border-[1px] border-cs2-white/50 rounded-[1px] mt-1
                                focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-cs2-white
                                checked:border-0 ${isBlocked ? "checked:bg-cs2-darkred" : "checked:bg-cs2-white"}
                                disabled:border-steel-400 disabled:bg-steel-400 cursor-pointer`}
                    />
                    <svg
                        className={`absolute w-5 h-5 pointer-events-none hidden peer-checked:block  mt-1 outline-none ${
                            isBlocked ? "stroke-cs2-white" : "stroke-cs2-dark/85"
                        }`}
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
            </div>
            <div className="basis-4/12 items-center justify-center content-center">
                <p className="text-center text-sm bg-linear-to-r from-stone-700/75 to-stone-700 border-[1px] border-stone-400/50 rounded-xs py-[0.1rem] px-2 select-none">
                    <strong>{pop.relays.length}</strong> Servers
                    <br /> Available
                </p>
            </div>
            <div className="flex flex-col gap-1 text-center basis-5/12 items-center justify-end">
                <h1 className="text-lg leading-4 tracking-tightest uppercase select-none text-cs2-white">
                    {pop.namedLocation}
                </h1>
                <h3 className="font-light text-xs select-none">
                    <FaRegClock className="inline text-[0.6rem] mr-1 mb-[2px]" />
                    {averagePingMsg}
                </h3>
            </div>
            <div className="absolute top-0 -z-10 w-38 h-64 overflow-hidden">
                <img src={image} className="object-none w-full h-full blur-xs" />
            </div>
            <img src={Dots} className="absolute top-0 left-0 -z-10 w-38 h-64 object-none opacity-5" />
        </div>
    );
};

export default ServerCard;
