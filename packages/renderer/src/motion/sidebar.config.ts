export const serverList = {
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: {
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    },
};

export const serverListTitle = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const serverListItem = {
    variants: {
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: "spring",
                duration: 0.5,
            },
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                duration: 0.5,
            },
        },
        exit: {
            opacity: 0,
            x: 20,
            transition: {
                type: "spring",
                duration: 0.4,
            },
        },
    },
};
