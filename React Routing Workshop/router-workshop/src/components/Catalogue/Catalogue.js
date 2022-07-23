import * as gamesService from '../../services/gamesService'
import { useEffect, useState } from "react"
import { Game } from './Game/Game';

export const Catalogue = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gamesService.getAll()
            .then(res => setGames(res));
    }, [])
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0 ? games.map(x => <Game key={x._id} {...x} />) : <h3 className="no-articles">No articles yet</h3>}
        </section>
    )
}