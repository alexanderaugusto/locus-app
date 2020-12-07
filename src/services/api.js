import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.172:5000'
})

const STORAGE_URL = 'https://res.cloudinary.com/imovel/image/upload/v1602331961'

export default api

export { STORAGE_URL }
