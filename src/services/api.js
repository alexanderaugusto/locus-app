import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.1.2:5000'
})

const zipcodeAPI = axios.create({
  baseURL: 'https://viacep.com.br/ws'
})

const STORAGE_URL = 'http://192.168.1.2:5000/storage'

export default api

export { STORAGE_URL, zipcodeAPI }
