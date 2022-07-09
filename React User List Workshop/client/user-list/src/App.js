import {useState, useEffect} from 'react';
import './App.css';
import * as userService from './services/userService'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Search } from './components/Search';
import { UserSection } from './components/UserSection';

const baseUrl = 'http://localhost:3005/api';


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll(baseUrl)
      .then(users => setUsers(users));
  }, []);

  return (
    <div>
        <Header/>
        <main className="main">
          <section className="card users-container">
            <Search/>
            <UserSection users = {users}/>
          </section>
        </main>
        <Footer/>
      </div>
  );
}

export default App;
