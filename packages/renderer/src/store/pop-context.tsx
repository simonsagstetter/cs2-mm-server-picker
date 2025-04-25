import { createContext, useReducer, useMemo, useEffect, useCallback } from "react";
import { PoP } from "../../../../types/pop.types";
import { send, sendWithData } from "@app/preload";
import { FETCH, RESET, REFRESH, UNBLOCK, BLOCK } from "../constants/loading";

type Status = {
    isLoading: boolean;
    isError: boolean;
    title: string;
    messages: string[];
};

const DEFAULT_STATUS = {
    isLoading: false,
    isError: false,
    title: "",
    messages: [],
};

interface PopState {
    status: Status;
    pops: Record<string, PoP>;
    groupedPops: Map<string, PoP[]>;
    selectedPops: PoP[];
    blockedPops: PoP[];
    selectedRegion: string;
    selectMode: boolean;
    ruleNames: string[];
}

enum PopActionKind {
    SET_STATE = "SET_STATE",
    UPDATE_POPS = "UPDATE_POPS",
    UPDATE_REGION = "UPDATE_REGION",
    ADD_POP = "ADD_POP",
    REMOVE_POP = "REMOVE_POP",
    CHANGE_MODE = "CHANGE_MODE",
    RESET_SELECTION = "RESET_SELECTION",
    SET_STATUS = "SET_STATUS",
    BLOCK_POPS = "BLOCK_POPS",
    UNBLOCK_POPS = "UNBLOCK_POPS",
    RESET_APP = "RESET_APP",
    HIDE_MODAL = "HIDE_MODAL",
    SHOW_MODAL = "SHOW_MODAL",
}

type PopAction =
    | { type: PopActionKind.SET_STATE; state: PopState }
    | { type: PopActionKind.UPDATE_POPS; payload: { pops: Record<string, PoP>; groupedPops: Map<string, PoP[]> } }
    | { type: PopActionKind.UPDATE_REGION; selectedRegion: string }
    | { type: PopActionKind.ADD_POP; pop: PoP }
    | { type: PopActionKind.REMOVE_POP; pop: PoP }
    | { type: PopActionKind.CHANGE_MODE; selectMode: boolean }
    | { type: PopActionKind.RESET_SELECTION }
    | { type: PopActionKind.SET_STATUS; status: Status }
    | { type: PopActionKind.BLOCK_POPS; payload: { ruleNames: string[]; blockedPops: PoP[] } }
    | { type: PopActionKind.UNBLOCK_POPS }
    | { type: PopActionKind.RESET_APP }
    | { type: PopActionKind.HIDE_MODAL }
    | { type: PopActionKind.SHOW_MODAL; payload: { title: string; message: string } };

interface PopContext extends PopState {
    updatePops: ({ pops, groupedPops }: { pops: Record<string, PoP>; groupedPops: Map<string, PoP[]> }) => void;
    updateSelectedRegion: (selectedRegion: string) => void;
    addPop: (pop: PoP) => void;
    removePop: (pop: PoP) => void;
    changeMode: (selectMode: boolean) => void;
    resetSelection: () => void;
    refreshPings: () => void;
    blockPops: () => void;
    unblockPops: () => void;
    resetApp: () => void;
    hideModal: () => void;
    showModal: ({ title, message }: { title: string; message: string }) => void;
}

const initialPopContext: PopContext = {
    status: DEFAULT_STATUS,
    pops: {},
    groupedPops: new Map(),
    selectedPops: [],
    blockedPops: [],
    selectedRegion: "Western Europe",
    selectMode: true,
    ruleNames: [],
    updatePops: () => {},
    updateSelectedRegion: () => {},
    addPop: () => {},
    removePop: () => {},
    changeMode: () => {},
    resetSelection: () => {},
    refreshPings: () => {},
    blockPops: () => {},
    unblockPops: () => {},
    resetApp: () => {},
    hideModal: () => {},
    showModal: () => {},
};

const PopContext = createContext<PopContext>(initialPopContext);

const initialState: PopState = {
    status: DEFAULT_STATUS,
    pops: {},
    groupedPops: new Map(),
    selectedPops: [],
    blockedPops: [],
    selectedRegion: "Western Europe",
    selectMode: true,
    ruleNames: [],
};

interface PopContextProvider {
    children: React.ReactNode;
}

const storeLocal = (state: PopState) => {
    if (typeof window === "undefined") throw new Error("Window object is not definied");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status, ...rest } = state;
    const alteredState = { ...rest, groupedPops: Array.from(state.groupedPops.entries()) };

    localStorage.setItem("state", JSON.stringify(alteredState));
};

const getLocal = () => {
    if (typeof window === "undefined") throw new Error("Window object is not definied");
    const storedState = localStorage.getItem("state");
    if (storedState) {
        const parsedState = JSON.parse(storedState);
        return { ...parsedState, groupedPops: new Map<string, PoP[]>(parsedState.groupedPops) };
    }

    return initialState;
};

const popContextReducer = (state: PopState, action: PopAction) => {
    if (action.type === PopActionKind.SET_STATE) {
        return { ...state, ...action.state };
    }
    if (action.type === PopActionKind.UPDATE_POPS) {
        const newState = { ...state, pops: action.payload.pops, groupedPops: action.payload.groupedPops };
        storeLocal(newState);
        return newState;
    }
    if (action.type === PopActionKind.UPDATE_REGION) {
        const newState = { ...state, selectedRegion: action.selectedRegion };
        storeLocal(newState);
        return newState;
    }
    if (action.type === PopActionKind.ADD_POP) {
        const newState = { ...state, selectedPops: [...state.selectedPops, action.pop] };
        storeLocal(newState);
        return newState;
    }
    if (action.type === PopActionKind.REMOVE_POP) {
        const newState = { ...state, selectedPops: [...state.selectedPops.filter((pop) => pop.id !== action.pop.id)] };
        storeLocal(newState);
        return newState;
    }
    if (action.type === PopActionKind.CHANGE_MODE) {
        const newState = { ...state, selectMode: action.selectMode };
        storeLocal(newState);
        return newState;
    }
    if (action.type === PopActionKind.RESET_SELECTION) {
        const newState = { ...state, selectedPops: [] };
        storeLocal(newState);
        return newState;
    }
    if (action.type === PopActionKind.SET_STATUS) {
        return { ...state, status: { ...state.status, ...action.status } };
    }
    if (action.type === PopActionKind.BLOCK_POPS) {
        const newState = {
            ...state,
            blockedPops: [...action.payload.blockedPops],
            ruleNames: action.payload.ruleNames,
        };
        storeLocal(newState);
        return newState;
    }
    if (action.type === PopActionKind.UNBLOCK_POPS) {
        const newState = { ...state, blockedPops: [], ruleNames: [] };
        storeLocal(newState);
        return newState;
    }
    if (action.type === PopActionKind.RESET_APP) {
        const newState = { ...initialState, status: state.status };
        storeLocal(newState);
        return newState;
    }
    if (action.type === PopActionKind.HIDE_MODAL) {
        return { ...state, status: { ...state.status, isError: false } };
    }
    if (action.type === PopActionKind.SHOW_MODAL) {
        return {
            ...state,
            status: { ...state.status, isError: true, title: action.payload.title, messages: [action.payload.message] },
        };
    }
    return state;
};

const PopContextProvider: React.FC<PopContextProvider> = ({ children }) => {
    const [state, dispatch] = useReducer(popContextReducer, initialState);

    const fetchPops = useCallback(async () => {
        dispatch({
            type: PopActionKind.SET_STATUS,
            status: {
                isLoading: true,
                isError: false,
                title: "Loading Matchmaking Servers!",
                messages: FETCH,
            },
        });
        try {
            const { pops, groupedPops } = await send("fetch-sdr-config", "");
            dispatch({ type: PopActionKind.UPDATE_POPS, payload: { pops, groupedPops } });
            dispatch({
                type: PopActionKind.SET_STATUS,
                status: {
                    isLoading: false,
                    isError: false,
                    title: "",
                    messages: [],
                },
            });
        } catch (error: unknown) {
            let message = "An unknown error occurred. Please try again";
            if (error instanceof Error) {
                message = error.message;
            }
            dispatch({
                type: PopActionKind.SET_STATUS,
                status: {
                    isLoading: false,
                    isError: true,
                    title: "Fetch Error",
                    messages: [message],
                },
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            dispatch({ type: PopActionKind.SET_STATE, state: getLocal() });
        }
        fetchPops();
    }, [fetchPops]);

    const refreshPings = useCallback(async () => {
        dispatch({
            type: PopActionKind.SET_STATUS,
            status: {
                isLoading: true,
                isError: false,
                title: "Refreshing Ping Data!",
                messages: REFRESH,
            },
        });
        try {
            const { pops, groupedPops } = await sendWithData("refresh-pings", state.pops);
            dispatch({ type: PopActionKind.UPDATE_POPS, payload: { pops, groupedPops } });
            dispatch({
                type: PopActionKind.SET_STATUS,
                status: {
                    isLoading: false,
                    isError: false,
                    title: "",
                    messages: [],
                },
            });
        } catch (error: unknown) {
            let message = "An unknown error occurred. Please try again";
            if (error instanceof Error) {
                message = error.message;
            }
            dispatch({
                type: PopActionKind.SET_STATUS,
                status: {
                    isLoading: false,
                    isError: true,
                    title: "Ping Error",
                    messages: [message],
                },
            });
        }
    }, [state.pops]);

    const updatePops = useCallback(
        ({ pops, groupedPops }: { pops: Record<string, PoP>; groupedPops: Map<string, PoP[]> }) => {
            dispatch({ type: PopActionKind.UPDATE_POPS, payload: { pops, groupedPops } });
        },
        [],
    );

    const updateSelectedRegion = useCallback((selectedRegion: string) => {
        dispatch({ type: PopActionKind.UPDATE_REGION, selectedRegion });
    }, []);

    const addPop = useCallback((pop: PoP) => {
        dispatch({ type: PopActionKind.ADD_POP, pop });
    }, []);

    const removePop = useCallback((pop: PoP) => {
        dispatch({ type: PopActionKind.REMOVE_POP, pop });
    }, []);

    const changeMode = useCallback((selectMode: boolean) => {
        dispatch({ type: PopActionKind.CHANGE_MODE, selectMode });
    }, []);

    const resetSelection = useCallback(() => {
        dispatch({ type: PopActionKind.RESET_SELECTION });
    }, []);

    const blockPops = useCallback(async () => {
        dispatch({
            type: PopActionKind.SET_STATUS,
            status: {
                isLoading: true,
                isError: false,
                title: "Blocking Servers!",
                messages: BLOCK,
            },
        });
        const popsToBlock = state.selectMode
            ? Array.from(Object.entries(state.pops))
                  .flatMap((entry) => entry[1])
                  .filter((elem) => !state.selectedPops.some((pop) => pop.id === elem.id))
            : state.selectedPops;
        try {
            const result: { ruleName: string; status: string; stdout: string; stderr: string }[] = await sendWithData(
                "block-pops",
                popsToBlock,
            );
            dispatch({
                type: PopActionKind.BLOCK_POPS,
                payload: { ruleNames: result.map((r) => r.ruleName), blockedPops: popsToBlock },
            });
            dispatch({
                type: PopActionKind.SET_STATUS,
                status: {
                    isLoading: false,
                    isError: false,
                    title: "",
                    messages: [],
                },
            });
        } catch (error: unknown) {
            let message = "An unknown error occurred. Please try again";
            if (error instanceof Error) {
                message = error.message;
            }

            dispatch({
                type: PopActionKind.SET_STATUS,
                status: {
                    isLoading: false,
                    isError: true,
                    title: "Firewall Error",
                    messages: [message],
                },
            });
        }
    }, [state.pops, state.selectedPops, state.selectMode]);

    const unblockPops = useCallback(async () => {
        dispatch({
            type: PopActionKind.SET_STATUS,
            status: {
                isLoading: true,
                isError: false,
                title: "Unblocking Servers!",
                messages: UNBLOCK,
            },
        });
        try {
            await sendWithData("unblock-pops", state.ruleNames);
            dispatch({ type: PopActionKind.UNBLOCK_POPS });
            dispatch({
                type: PopActionKind.SET_STATUS,
                status: {
                    isLoading: false,
                    isError: false,
                    title: "",
                    messages: [],
                },
            });
        } catch (error: unknown) {
            let message = "An unknown error occurred. Please try again";
            if (error instanceof Error) {
                message = error.message;
            }
            dispatch({
                type: PopActionKind.SET_STATUS,
                status: {
                    isLoading: false,
                    isError: true,
                    title: "Firewall Error",
                    messages: [message],
                },
            });
        }
    }, [state.ruleNames]);

    const resetApp = useCallback(async () => {
        let previousError = null;
        dispatch({
            type: PopActionKind.SET_STATUS,
            status: {
                isLoading: true,
                isError: false,
                title: "Resetting App!",
                messages: RESET,
            },
        });

        try {
            await sendWithData("unblock-pops", state.ruleNames);
        } catch (error: unknown) {
            previousError = "An unknown error occurred. Please try again";
            if (error instanceof Error) {
                previousError = error.message;
            }
        }

        dispatch({ type: PopActionKind.UNBLOCK_POPS });
        dispatch({ type: PopActionKind.RESET_APP });

        try {
            const { pops, groupedPops } = await send("fetch-sdr-config", "");
            dispatch({ type: PopActionKind.UPDATE_POPS, payload: { pops, groupedPops } });
            if (previousError !== null) {
                dispatch({
                    type: PopActionKind.SET_STATUS,
                    status: {
                        isLoading: false,
                        isError: true,
                        title: "Firewall Error",
                        messages: [previousError],
                    },
                });
            } else {
                dispatch({
                    type: PopActionKind.SET_STATUS,
                    status: {
                        isLoading: false,
                        isError: false,
                        title: "",
                        messages: [],
                    },
                });
            }
        } catch (error: unknown) {
            let message = "An unknown error occurred. Please try again";
            if (error instanceof Error) {
                message = error.message;
            }
            dispatch({
                type: PopActionKind.SET_STATUS,
                status: {
                    isLoading: false,
                    isError: true,
                    title: "Fetch Error",
                    messages: [message],
                },
            });
        }
    }, [state.ruleNames]);

    const hideModal = useCallback(() => {
        dispatch({ type: PopActionKind.HIDE_MODAL });
    }, []);

    const showModal = useCallback(({ title, message }: { title: string; message: string }) => {
        dispatch({ type: PopActionKind.SHOW_MODAL, payload: { title, message } });
    }, []);

    const ctx: PopContext = useMemo(
        () => ({
            status: state.status,
            pops: state.pops,
            groupedPops: state.groupedPops,
            selectedPops: state.selectedPops,
            blockedPops: state.blockedPops,
            selectedRegion: state.selectedRegion,
            selectMode: state.selectMode,
            ruleNames: state.ruleNames,
            updatePops,
            updateSelectedRegion,
            addPop,
            removePop,
            changeMode,
            resetSelection,
            refreshPings,
            blockPops,
            unblockPops,
            resetApp,
            hideModal,
            showModal,
        }),
        [
            state,
            updatePops,
            updateSelectedRegion,
            addPop,
            removePop,
            changeMode,
            resetSelection,
            refreshPings,
            blockPops,
            unblockPops,
            resetApp,
            hideModal,
            showModal,
        ],
    );

    return <PopContext.Provider value={ctx}>{children}</PopContext.Provider>;
};

export { PopContextProvider, PopContext };
