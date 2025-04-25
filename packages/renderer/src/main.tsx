import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PopContextProvider } from "./store/pop-context.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PopContextProvider>
            <App />
        </PopContextProvider>
    </StrictMode>,
);
