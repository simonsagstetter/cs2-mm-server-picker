interface SidebarActionItem {
    tooltip: string;
    children: React.ReactNode;
    action: () => void;
    disabled: boolean;
}

const SidebarActionItem: React.FC<SidebarActionItem> = ({ tooltip, children, action, disabled }) => {
    return (
        <li className="relative group">
            <button
                className={`relative hover:bg-cs2-dark/20 rounded-sm p-2 ${
                    disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={action}
                disabled={disabled}
            >
                <span
                    className={`w-20 h-10 flex flex-col items-center justify-center invisible opacity-0 transition-all duration-300 ease-in-out rounded-sm absolute text-cs2-white text-xs -left-5 -top-13 text-center bg-cs2-dark px-2 py-1 shadow-sm
                                    before:content-[' '] before:bg-cs2-dark before:absolute before:rounded-[1px] before:w-4 before:h-4 before:bottom-0 before:translate-y-1 before:rotate-45 before:-z-10
                                    group-hover:visible group-hover:opacity-100`}
                >
                    {tooltip}
                </span>
                {children}
            </button>
        </li>
    );
};

export default SidebarActionItem;
