import { use } from "react";
import { PopContext } from "../store/pop-context";

const usePop = () => {
    const ctx = use(PopContext);

    if (!ctx) throw new Error("usePop() can only be used within <PopContextProvider></PopContextProvider> tags.");

    return ctx;
};

export default usePop;
