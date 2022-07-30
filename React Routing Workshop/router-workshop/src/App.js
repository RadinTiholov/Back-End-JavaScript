import './App.css';
import {
    Routes,
    Route
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Create } from './components/Create/Create';
import { Edit } from './components/Edit/Edit';
import { Details } from './components/Details/Details';
import { Catalogue } from './components/Catalogue/Catalogue';
import { NotFound } from './components/NotFound/NotFound';
import { Logout } from './components/Logout/Logout';
import { GameProvider } from './contexts/GameContext';
import GuestGuard from './components/common/GuestGuard';
import UserGuard from './components/common/UserGuard';

function App() {
    return (
        <AuthProvider>
            <div id="box">
                <Header />
                {/* Main Content */}
                <main id="main-content"></main>
                <GameProvider>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path='/details/:id' element={<Details />} />
                        <Route path='/catalogue' element={<Catalogue />} />
                        <Route element={<GuestGuard />}>
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/create' element={<Create />} />
                            <Route path='/edit/:id' element={<Edit />} />
                        </Route>
                        <Route element={<UserGuard />}>
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                        </Route>
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </GameProvider>
            </div>
        </AuthProvider>
    );
}

export default App;
