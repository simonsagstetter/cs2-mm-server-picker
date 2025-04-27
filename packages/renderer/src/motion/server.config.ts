export const serverList = {
    layout: true,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
};

export const serverListItem = {
    variants: {
        hidden: {
            opacity: 0,
            y: 50,
            transition: {
                type: "spring",
                duration: 0.5,
                delay: 0.1,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                duration: 0.5,
            },
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: {
                type: "spring",
                duration: 0.4,
            },
        },
    },
    whileHover: {
        scale: 1.03,
        transition: {
            duration: 0.2,
        },
    },
    whileTap: {
        scale: 1.06,
        transition: {
            duration: 0.1,
        },
    },
};
