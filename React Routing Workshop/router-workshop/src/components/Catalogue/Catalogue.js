import { Game } from './Game/Game';

export const Catalogue = (props) => {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {props.games.length > 0 ? props.games.map(x => <Game key={x._id} {...x} />) : <h3 className="no-articles">No articles yet</h3>}
        </section>
    )
}