import usePop from "../../../hooks/usePop";
import Dots from "../../../assets/dots.svg";
const Footer: React.FC = () => {
    const { selectedPops, blockedPops, blockPops, unblockPops } = usePop(),
        hasPops = selectedPops !== undefined && selectedPops.length > 0,
        hasBlockedPops = blockedPops !== undefined && blockedPops.length > 0;
    return (
        <footer className="flex flex-row items-center justify-end w-full h-16 bg-cs2-dark/50 border-t-[1px] border-cs2-white/50">
            {!hasBlockedPops ? (
                <button
                    disabled={!hasPops}
                    onClick={blockPops}
                    className="relative w-48 border-[0.5px] border-cs2-lightgreen bg-gradient-to-r from-cs2-green from-5% via-cs2-darkgreen via-50%  to-cs2-green to-95%  mr-4 h-10 font-bold text-cs2-lightgreen text-2xl uppercase hover:from-cs2-lightgreen hover:to-cs2-lightgreen duration-500 transition-colors ease-in-out cursor-pointer disabled:cursor-not-allowed"
                >
                    <img src={Dots} className="absolute top-0 left-0 w-full h-full object-none opacity-5 z-10" />
                    <span className="z-20">GO</span>
                </button>
            ) : (
                <button
                    onClick={unblockPops}
                    className="relative w-48 border-[0.5px] border-cs2-red bg-gradient-to-r from-cs2-darkred from-5% via-cs2-darkerred via-50% to-cs2-darkred to-95%  mr-4 h-10 font-bold text-cs2-red text-2xl uppercase hover:from-cs2-red hover:to-cs2-red duration-500 transition-colors ease-in-out cursor-pointer disabled:cursor-not-allowed"
                >
                    <img src={Dots} className="absolute top-0 left-0 w-full h-full object-none opacity-5 z-10" />
                    <span className="z-20">Cancel</span>
                </button>
            )}
        </footer>
    );
};

export default Footer;
