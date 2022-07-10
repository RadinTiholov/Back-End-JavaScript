const baseUrl = 'http://localhost:3005/api';
export const getAll = async () => {
    const response = await fetch(baseUrl + '/users');
    const result = await response.json();
    return result.users;
}

export const getOne = async (id) => {
    const response = await fetch(baseUrl + '/users/' + id);
    const result = await response.json();
    return result.user;
}

export const deleteById = async (id) => {
    const response = await fetch(baseUrl + '/users/' + id, {
        method: 'DELETE'});
    const result = await response.json();
    return result;
}
export const editById = async (id, data) => {
    const response = await fetch(baseUrl + '/users/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)});
    const result = await response.json();
    return result;
}

export const create = async (data) => {
    const response = await fetch(baseUrl + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)});
    const result = await response.json();
    return result;
}