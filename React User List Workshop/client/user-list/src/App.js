import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Search } from './components/Search';
import { UserSection } from './components/UserSection';


function App() {

  return (
    <div>
        <Header/>
        <main className="main">
          <section className="card users-container">
            <Search/>
            <UserSection/>
          </section>
        </main>
        <Footer/>
      </div>
  );
}

export default App;
