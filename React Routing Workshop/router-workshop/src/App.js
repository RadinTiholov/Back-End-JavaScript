import './App.css';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Create } from './components/Create/Create';
import { Edit } from './components/Edit/Edit';
import { Details } from './components/Details/Details';
import { Catalogue } from './components/Catalogue/Catalogue';

function App() {
  return (
    <div id="box">
      <Header />
      {/* Main Content */}
      <main id="main-content"></main>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
      <Routes>
        <Route path='/register' element={<Register />} />
      </Routes>
      <Routes>
        <Route path='/create' element={<Create />} />
      </Routes>
      <Routes>
        <Route path='/edit' element={<Edit />} />
      </Routes>
      <Routes>
        <Route path='/details' element={<Details />} />
      </Routes>
      <Routes>
        <Route path='/catalogue' element={<Catalogue />} />
      </Routes>
    </div>

  );
}

export default App;
