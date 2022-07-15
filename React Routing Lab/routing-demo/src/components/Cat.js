import { Link } from 'react-router-dom'

export const Cat = (props) => {
    return (
        <div class="col">
            <Link className="nav-link" to={"/cats/" + props.id}>{props.id}</Link>
            <img src={props.url} alt="CatPicture" width="500" height="600" />
        </div>
    )
}