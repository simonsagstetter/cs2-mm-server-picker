import { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";

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
        <div className="flex flex-col items-center justify-centers gap-2 text-cs2-green">
            <div className="flex flex-row gap-4">
                {ELEMENTS.map((id) => {
                    const isActive = index >= id,
                        wrapperClasses = `duration-100 ease-in-out p-2 rounded-[1px] border-[1px] border-cs2-darkgreen ${
                            isActive
                                ? "bg-[#109f58] shadow-[0px_0px_3px_2px_#45a347] scale-110"
                                : "bg-cs2-darkgreen  blur-[0.5px]"
                        }`,
                        iconClasses = `text-xl ${isActive ? "text-cs2-white" : "text-stone-300"}`;
                    return (
                        <div key={id} className={wrapperClasses}>
                            <IoMdPerson className={iconClasses} />
                        </div>
                    );
                })}
            </div>
            <div className="!capitalize text-base flex flex-row justify-center items-center ml-4 text-cs2-lightgreen">
                {children}
                <div className="inline w-2 ml-1">
                    {DOTS.map((id) => (
                        <span key={id}>{id <= index ? "." : ""}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingAnimation;
