import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as gamesService from '../../services/gamesService'

export const Create = () => {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        title: "",
        category: "",
        maxLevel: "",
        imageUrl: "",
        summary: "",
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }
        ))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        gamesService.create(inputData)
            .then(() => {

                navigate('/catalogue')
            })
            .catch(err => {
                console.log(err)
                navigate('/404');
            })

    }
    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                        value={inputData.title}
                        onChange={onChange}
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                        value={inputData.category}
                        onChange={onChange}
                    />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        placeholder={1}
                        value={inputData.maxLevel}
                        onChange={onChange}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                        value={inputData.imageUrl}
                        onChange={onChange}
                    />
                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary" 
                        id="summary" 
                        value={inputData.summary}
                        onChange={onChange} 
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Create Game"
                    />
                </div>
            </form>
        </section>
    )
}