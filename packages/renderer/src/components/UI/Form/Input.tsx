import { forwardRef } from "react";

interface Checkbox {
    checked: boolean;
    disabled: boolean;
    isBlocked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, Checkbox>(({ isBlocked, ...props }, ref) => {
    return (
        <div className="flex gap-2">
            <input
                ref={ref}
                type="checkbox"
                className={`
                    peer relative bg-transparent appearance-none shrink-0 w-5 h-5 border-[1px] border-cs2-white/50 rounded-[1px] mt-1
                    focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-cs2-white
                    checked:border-0 ${isBlocked ? "checked:bg-cs2-darkred" : "checked:bg-cs2-white"}
                    disabled:border-steel-400 disabled:bg-steel-400 cursor-pointer`}
                {...props}
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
    );
});
