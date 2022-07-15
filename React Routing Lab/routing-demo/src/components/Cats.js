import { useEffect, useState } from "react"
import { Cat } from "./Cat";

export const Cats = () => {
    const [cats, catsSet] = useState([])

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/images/search?limit=10')
            .then(res => res.json())
            .then(resCats => catsSet(resCats));
    }, [])
    return (
        <>
            <h1>These are our cats</h1>
            <div class="container">
                <div class="row row-cols-3">
                    {cats.map(x => <Cat key={x.id} {...x} />)}
                </div>
            </div>
        </>
    )
}