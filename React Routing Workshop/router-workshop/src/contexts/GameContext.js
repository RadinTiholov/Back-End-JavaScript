import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as gamesService from "../services/gamesService";
export const GameContext = createContext();

export const GameProvider = ({children}) => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const addGame = (game) => {
        setGames(state => [...state, game]);
    }
    const updateGame = (game) => {
        setGames(state => games.map(x => x._id === game._id ? game : x));
    }
    const deleteGame = (id) => {
        setGames(state => games.filter(x => x._id !== id));
        navigate('/catalogue');
    }

    useEffect(() => {
        gamesService.getAll()
            .then(res => setGames(res));
    }, [])

    return (
        <GameContext.Provider value={{games, addGame, updateGame, deleteGame}}>
            {children}
        </GameContext.Provider>  
    );
}