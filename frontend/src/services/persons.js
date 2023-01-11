import axios from 'axios'

const baseUrl = '/api/persons'

const get = ( paramUrl = "" ) => {
    let request
    if ( paramUrl !== "" && typeof(paramUrl) === "string")
        request = axios.get(paramUrl)
    else
        request = axios.get(baseUrl)
    return request.then( (response) => response.data )    
}
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then( (response) => response.data )    
}
const update = (newObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then( (response) => response.data )    
}

const erase = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then( (response ) => response.data)
}

export default { get, create, update, erase }
