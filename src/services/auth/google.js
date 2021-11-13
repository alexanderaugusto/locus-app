import * as Google from 'expo-google-app-auth'
import axios from 'axios'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

const signIn = accessToken => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    axios
      .get('https://www.googleapis.com/userinfo/v2/me', config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getToken = () => {
  return new Promise((resolve, reject) => {
    const config = {
      clientId:
        Platform.OS === 'ios'
          ? Constants.manifest.extra.googleAuthIosClientId
          : Constants.manifest.extra.googleAuthAndroidClientId
    }

    Google.logInAsync(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  getToken,
  signIn
}
