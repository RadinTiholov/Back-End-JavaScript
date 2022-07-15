import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const CatDetailed = () => {
    const params = useParams();
    const [cat, setCat] = useState({});

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/images/' + params.id)
            .then(res => res.json())
            .then(res => setCat(res));
    }, [])

    return (
        <>
            <h1>Cat</h1>
            <>
                <h1>Id: {cat.id}</h1>
                <img src={cat.url} alt="CatPicture" width="500" height="600" />
            </>
        </>
    )
}