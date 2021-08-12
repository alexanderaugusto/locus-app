import axios from 'axios'

const api = axios.create({
  baseURL: 'https://imovel-api.herokuapp.com'
})

const zipcodeAPI = axios.create({
  baseURL: 'https://viacep.com.br/ws'
})

const STORAGE_URL = 'https://res.cloudinary.com/imovel/image/upload/v1602331961'

export default api

export { STORAGE_URL, zipcodeAPI }
