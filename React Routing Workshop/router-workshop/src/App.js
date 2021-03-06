import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Create } from './components/Create/Create';
import { Edit } from './components/Edit/Edit';
import { Details } from './components/Details/Details';
import { Catalogue } from './components/Catalogue/Catalogue';
import { NotFound } from './components/NotFound/NotFound';

function App() {
  return (
    <div id="box">
      <Header />
      {/* Main Content */}
      <main id="main-content"></main>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/catalogue' element={<Catalogue />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>

  );
}

export default App;
