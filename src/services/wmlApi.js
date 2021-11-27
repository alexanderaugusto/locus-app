import axios from 'axios'
import Constants from 'expo-constants'

const api = axios.create({
  baseURL: Constants.manifest.extra.wmlApiUrl
})

api.interceptors.request.use(async config => {
  const getTokenConfig = {
    params: {
      grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
      apikey: Constants.manifest.extra.wmlApikey
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const wmlResponse = await axios.post(
    Constants.manifest.extra.wmlGetTokenUrl,
    getTokenConfig
  )

  config.headers = config.headers || {}
  config.headers.Authorization = `Bearer ${wmlResponse.data.access_token}`

  return config
})

export default api
