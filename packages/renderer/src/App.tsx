import "./App.css";
import usePop from "./hooks/usePop";
import LoadingCard from "./components/UI/Loading/LoadingCard";
import Background from "./components/UI/Background/Background";
import Header from "./components/UI/Header/Header";
import Server from "./components/Servers/Server";
import Region from "./components/Navigation/Region";
import Footer from "./components/UI/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import ErrorModal from "./components/UI/Error/ErrorModal";

function App() {
    const { status } = usePop();

    return (
        <>
            <main className="fixed w-screen h-screen">
                <Header />
                {!status.isLoading && (
                    <>
                        <Region />
                        <article className="flex flex-row">
                            <Sidebar />
                            <Server />
                        </article>
                        <Footer />
                    </>
                )}
            </main>
            {status.isLoading && <LoadingCard title={status.title} messages={status.messages} />}
            {status.isError && <ErrorModal title={status.title} message={status.messages[0]} />}
            <Background />
        </>
    );
}

export default App;
