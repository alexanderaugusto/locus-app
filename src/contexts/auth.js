import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import * as SplashScreen from 'expo-splash-screen'

const AuthContext = createContext({
  signed: false,
  user: {}
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  async function loadStorageData() {
    await SplashScreen.preventAutoHideAsync()

    const userToken = await AsyncStorage.getItem('user-token')

    if (userToken) {
      api.defaults.headers.Authorization = `Bearer ${userToken}`

      await api
        .put('/auth/renew')
        .then(res => {
          const { token, ...userData } = res.data

          api.defaults.headers.Authorization = `Bearer ${token}`

          setUser(userData)
        })
        .catch(err => {
          console.error(err)
          api.defaults.headers.Authorization = ''
          AsyncStorage.clear()
        })
      await SplashScreen.hideAsync()
    } else {
      await SplashScreen.hideAsync()
    }
  }

  useEffect(() => {
    loadStorageData()
  }, [])

  const signIn = async (email, password) => {
    return new Promise((resolve, reject) => {
      const data = {
        email,
        password
      }

      api
        .post('/auth/login', data)
        .then(async res => {
          const { token, ...userData } = res.data

          api.defaults.headers.Authorization = `Bearer ${token}`

          setUser(userData)

          resolve(res)

          await AsyncStorage.setItem('user-token', token)
          await AsyncStorage.setItem('user-data', JSON.stringify(userData))
        })
        .catch(err => {
          reject(err)
          console.error(err)
        })
    })
  }

  const signOut = async () => {
    await AsyncStorage.clear()

    api.defaults.headers.Authorization = ''

    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
