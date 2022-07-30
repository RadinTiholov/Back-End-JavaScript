import { useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import { useEditData } from "../../hooks/useEditData";
import * as gamesService from "../../services/gamesService";

export const Edit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const { updateGame } = useContext(GameContext);
    const [inputData, setInputData] = useEditData(id);
    
    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }
        ))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        gamesService.update(id, inputData)
            .then(res => {
                updateGame(res);
                navigate(`/details/${res._id}`)
            })
            .catch(err => {
                console.log(err)
                navigate('/404');
            })

    }
    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value = {inputData.title} onChange = {onChange}/>
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value = {inputData.category} onChange = {onChange}/>
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        value = {inputData.maxLevel}
                        onChange = {onChange}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value = {inputData.imageUrl} onChange = {onChange} />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value = {inputData.summary} onChange = {onChange}/>
                    <input className="btn submit" type="submit" defaultValue="Edit Game" />
                </div>
            </form>
        </section>
    )
}