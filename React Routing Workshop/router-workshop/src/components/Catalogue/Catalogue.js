import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { Game } from './Game/Game';

export const Catalogue = () => {
    const {games} = useContext(GameContext);
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0 ? games.map(x => <Game key={x._id} {...x} />) : <h3 className="no-articles">No articles yet</h3>}
        </section>
    )
}