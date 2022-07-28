const request = async (method, url, data) => {
    try{
        let beginningRequest;
        if(method === 'GET'){
            beginningRequest = fetch(url)
        }
        else{
            beginningRequest = fetch(url, {
                method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
        const response = await beginningRequest;
        const result = await response.json();
    
        return result;
    }catch(err){
        console.log(err);
    }
}

export const get = request.bind({}, "GET")
export const post = request.bind({}, "POST")
export const put = request.bind({}, "PUT")
export const del = request.bind({}, "DELETE")
export const patch = request.bind({}, "PATCH")
