import axios from 'axios'
import Constants from 'expo-constants'

const api = axios.create({
  baseURL: Constants.manifest.extra.housingPredictorApiUrl
})

export default api
