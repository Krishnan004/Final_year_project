import bgImage from '../../assets/bg.jpg';
import '../../css/home.css';
import Form from './Form';
import AboutInHome from './AboutInHome';


const Home = () => {
    return (
        <div className="home" >
            <div className="background" style={{ backgroundImage: `linear-gradient(180deg,#0a0909 0%,rgba(242,240,235,0) 100%),url("	https://zolopik.com/wp-content/uploads/2024/06/chennai-image-website-.jpeg")` }}></div>
            <Form/>
            <AboutInHome />
            <div>
                hello
            </div>
        </div>
    );
};

export default Home;
