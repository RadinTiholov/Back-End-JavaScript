import './App.css';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Qualification } from './components/Qualification';
import { Header } from './components/Header';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';
import { Contact } from './components/Contact';
import { Skills } from './components/Skills';

function App() {
  const user = {
    name : "Radin Tiholov",
    birthday : "00-00-0000",
    degree: "xxxxxxxxxx",
    experience: "none",
    phone: "00000000000",
    email: "example@gmil.com",
    address: "aaaaaaaaaaaaaaaaaaaaaa",
    freelance: "dev"
  }
  return (
    <div>
        <Navbar/>
        <VideoModal/>
        <Header/>
        <About user = {user}/>
        <Qualification/>
        <Skills/>
        <Contact/>
        <Footer/>
        {/* Scroll to Bottom */}
        <i className="fa fa-2x fa-angle-down text-white scroll-to-bottom" />
        {/* Back to Top */}
        <a href="#" className="btn btn-outline-dark px-0 back-to-top"><i className="fa fa-angle-double-up" /></a>
        {/* JavaScript Libraries */}
        {/* Contact Javascript File */}
        {/* Template Javascript */}
      </div>
  );
}

export default App;
