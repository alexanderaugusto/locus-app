import axios from 'axios'
import Constants from 'expo-constants'

const api = axios.create({
  baseURL: Constants.manifest.extra.positionStackApiUrl
})

api.interceptors.request.use(config => {
  config.params = config.params || {}
  config.params.access_key = Constants.manifest.extra.positionStackAccessKey
  return config
})

export default api
