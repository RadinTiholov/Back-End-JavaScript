const baseUrl = 'http://localhost:3030'

const getLatest = () => {
    return fetch(`${baseUrl}/data/games?sortBy=_createdOn%20desc&distinct=category`)
        .then(res => res.json())
        .catch(err => alert(err))
}
const getDetails = (id) => {
    return fetch(`${baseUrl}/data/games/${id}`)
        .then(res => res.json())
        .catch(err => alert(err))
}

export {
    getLatest,
    getDetails
}