import Footer from "../../components/Footer";
import Hero from "./Hero";
import Dock from "../../components/Dock";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>

            <div className="">
                <Dock onNavigate={navigate} />
                <Hero />
            </div>
            <Footer />


        </>
    );
};

export default Home;
