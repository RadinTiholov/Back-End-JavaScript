import './App.css';
import { Home } from './components/Home';
import {Routes, Route} from 'react-router-dom'
import { NotFound } from './components/NotFound';
import { NavBar } from './components/NavBar';
import { Settings} from './components/Settings'
import { About} from './components/About'
import { Register } from './components/Register';
import { Cats } from './components/Cats';
import { CatDetailed } from './components/CatDetailed';

function App() {
  return (
    <>
    <NavBar/>
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/settings' element = {<Settings/>}/>
          <Route path='/about' element = {<About/>}/>
          <Route path='/register' element = {<Register/>}/>
          <Route path='/cats' element = {<Cats/>}/>
          <Route path='/cats/:id' element = {<CatDetailed/>}/>
          <Route path='*' element = {<NotFound/>}/>
        </Routes>
      </header>
    </div>
    </>
  );
}

export default App;
