import { useEffect, useState } from "react"

import * as gamesService from '../services/gamesService'

export const useEditData = (id) => {
    const [inputData, setInputData] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    })

    useEffect(() => {
        gamesService.getDetails(id)
            .then(res => {
                setInputData({
                    title: res.title,
                    category: res.category,
                    maxLevel: res.maxLevel,
                    imageUrl: res.imageUrl,
                    summary: res.summary
                })
            })
    }, [])

    return [inputData, setInputData]
}