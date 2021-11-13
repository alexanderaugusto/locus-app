import axios from 'axios'
import Constants from 'expo-constants'

const api = axios.create({
  baseURL: Constants.manifest.extra.apiUrl
})

const zipcodeAPI = axios.create({
  baseURL: Constants.manifest.extra.zipcodeApiUrl
})

const STORAGE_URL = Constants.manifest.extra.storageUrl

export default api

export { STORAGE_URL, zipcodeAPI }
