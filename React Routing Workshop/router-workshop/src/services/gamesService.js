import * as request from "./requester" 
const baseUrl = 'http://localhost:3030'

const getLatest = () => {
    return request.get(`${baseUrl}/data/games?sortBy=_createdOn%20desc&distinct=category`)
        .catch(err => alert(err))
}
const getDetails = (id) => {
    return request.get(`${baseUrl}/data/games/${id}`)
        .catch(err => alert(err))
}
const getAll = () => {
    return request.get(`${baseUrl}/data/games`)
        .catch(err => alert(err))
}
const create = (data) => {
    return request.post(`${baseUrl}/data/games`, data)
        .catch(err => alert(err))
}
const update = (id, data) => {
    return request.put(`${baseUrl}/data/games/${id}`, data)
        .catch(err => alert(err))
}
const delGame = (id) => {
    return request.del(`${baseUrl}/data/games/${id}`)
        .catch(err => alert(err))
}
export {
    getLatest,
    getDetails,
    getAll,
    create,
    update,
    delGame
}