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
import styles from "./App.Styles";

function App() {
    const { status } = usePop();
    return (
        <>
            <main className={styles.main}>
                {!status.isLoading && (
                    <>
                        <Header />
                        <Region />
                        <article className={styles.content}>
                            <Sidebar />
                            <Server />
                        </article>
                        <Footer />
                    </>
                )}
            </main>
            <LoadingCard title={status.title} messages={status.messages} isActive={status.isLoading} />
            <ErrorModal title={status.title} message={status.messages[0]} isActive={status.isError} />
            <Background />
        </>
    );
}

export default App;
