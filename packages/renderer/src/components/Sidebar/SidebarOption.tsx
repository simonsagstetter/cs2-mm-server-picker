import { useEffect, useRef } from "react";
import usePop from "../../hooks/usePop";

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
        if (disabled)
            showModal({
                title: "App is running",
                message: "Server blocking action is running. Please cancel the action first.",
            });
    };

    return (
        <div className="flex flex-col bg-cs2-dark/[7%] px-6 py-2">
            <div className="flex flex-row gap-4 items-center justify-between">
                <h2 className="text-cs2-white text-lg">{title}</h2>
                <label htmlFor={title} className="relative inline-block w-12 h-6">
                    <input
                        type="checkbox"
                        id={title}
                        className="opacity-0 w-0 h-0 peer"
                        onChange={handleOnChange}
                        onClick={handleOnClick}
                        defaultChecked={false}
                        ref={checkbox}
                        disabled={disabled}
                    />
                    <span
                        className={`absolute cursor-pointer inset-shadow-sm inset-shadow-cs2-dark top-0 left-0 right-0 bottom-0 bg-stone-700 rounded-xl duration-200 transition-color
                            before:z-10 before:rounded-full before:absolute before:content[' '] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-cs2-white before:duration-200 before:transition-all before:shadow-xs
                            peer-checked:bg-cs2-lightgreen peer-checked:inset-shadow-cs2-darkgreen peer-checked:before:translate-x-[24px]
                            ${disabled ? "!cursor-not-allowed" : ""}`}
                    ></span>
                </label>
            </div>
            <small className="text-cs2-white text-xs">{description}</small>
        </div>
    );
};

export default SidebarOption;
