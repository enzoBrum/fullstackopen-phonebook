import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const get = ( paramUrl = "" ) => {
    let request
    if ( paramUrl !== "" && typeof(paramUrl) === "string")
        request = axios.get(paramUrl)
    else
        request = axios.get(`${baseUrl}/persons/`)
    return request.then( (response) => response.data )    
}
const create = newObject => {
    const request = axios.post(`${baseUrl}/persons/`, newObject)
    return request.then( (response) => response.data )    
}
const update = (newObject, id) => {
    const request = axios.put(`${baseUrl}/persons/${id}`, newObject)
    return request.then( (response) => response.data )    
}

const erase = id => {
    const request = axios.delete(`${baseUrl}/persons/${id}`)
    return request.then( (response ) => response.data)
}

export default { get, create, update, erase }
