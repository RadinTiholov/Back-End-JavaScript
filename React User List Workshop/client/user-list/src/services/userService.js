export const getAll = async (baseUrl) => {
    const response = await fetch(baseUrl + '/users');
    const result = await response.json();
    return result.users;
}

export const getOne = async (id, baseUrl) => {
    const response = await fetch(baseUrl + '/users/' + id);
    const result = await response.json();
    return result.user;
}

export const deleteById = async (id, baseUrl) => {
    const response = await fetch(baseUrl + '/users/' + id, {
        method: 'DELETE'});
    const result = await response.json();
    return result;
}