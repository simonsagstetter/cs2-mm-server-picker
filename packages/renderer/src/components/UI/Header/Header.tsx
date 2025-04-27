const Header: React.FC = () => {
    return (
        <>
            <div id="dragableArea" className="bg-cs2-dark/35 shadow-xs **:text-2xl **:text-cs2-white select-none ">
                <h1 className="flex flex-row gap-4 w-full h-16 justify-center items-center">
                    CS2 Matchmaking Server Picker
                </h1>
            </div>
            <nav className=" bg-cs2-dark/45 **:text-base **:font-medium">
                <ul className="flex flex-row gap-8 w-full h-12 justify-center items-center **:uppercase">
                    <li className="bg-cs2-blue/90 text-cs2-lightblue py-[0.1rem] px-2 rounded-sm shadow-xs hover:bg-cs2-white/10  **:cursor-pointer cursor-pointer select-none">
                        Select Servers
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
