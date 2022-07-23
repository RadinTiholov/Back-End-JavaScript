import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import * as gamesService from '../../services/gamesService'

export const Details = () => {
    const params = useParams()
    const [game, setGame] = useState({});

    useEffect(() => {
        gamesService.getDetails(params.id)
            .then(res => setGame(res))
    }, [])

    return(
        <section id="game-details">
        <h1>Game Details</h1>
        <div className="info-section">
          <div className="game-header">
            <img className="game-img" src={game.imageUrl} alt='img'/>
            <h1>{game.title}</h1>
            <span className="levels">MaxLevel: {game.maxLevel}</span>
            <p className="type">{game.category}</p>
          </div>
          <p className="text">{game.summary}
          </p>
          {/* Bonus ( for Guests and Users ) */}
          <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
              {/* list all comments for current game (If any) */}
              <li className="comment">
                <p>Content: I rate this one quite highly.</p>
              </li>
              <li className="comment">
                <p>Content: The best game.</p>
              </li>
            </ul>
            {/* Display paragraph: If there are no games in the database */}
            <p className="no-comment">No comments.</p>
          </div>
          {/* Edit/Delete buttons ( Only for creator of this game )  */}
          <div className="buttons">
            <Link to={"/edit/" + params.id} className="button">
              Edit
            </Link>
            <Link to='#' className="button">
              Delete
            </Link>
          </div>
        </div>
        {/* Bonus */}
        {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
        <article className="create-comment">
          <label>Add new comment:</label>
          <form className="form">
            <textarea
              name="comment"
              placeholder="Comment......"
              defaultValue={""}
            />
            <input
              className="btn submit"
              type="submit"
              defaultValue="Add Comment"
            />
          </form>
        </article>
      </section>
    )
}