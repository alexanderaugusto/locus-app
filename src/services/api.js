import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://locus-app.mybluemix.net'
  baseURL: 'http://192.168.1.2:5000'
})

const zipcodeAPI = axios.create({
  baseURL: 'https://viacep.com.br/ws'
})

const STORAGE_URL = 'http://192.168.1.2:5000/storage'
// const STORAGE_URL =
//   'https://res.cloudinary.com/alexanderaugusto/image/upload/v1633174373/locus'

export default api

export { STORAGE_URL, zipcodeAPI }
