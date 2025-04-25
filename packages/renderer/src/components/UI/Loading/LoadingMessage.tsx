import { useEffect, useState } from "react";

interface LoadingMessage {
    messages: string[];
}

const LoadingMessage: React.FC<LoadingMessage> = ({ messages }) => {
    const [currentMessage, setCurrentMessage] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((lastIndex) => {
                const nextIndex = lastIndex + 1;
                if (messages[nextIndex] !== undefined) return nextIndex;
                else return 0;
            });
        }, 2500);

        return () => clearInterval(interval);
    });

    return <>{messages[currentMessage]}</>;
};

export default LoadingMessage;
