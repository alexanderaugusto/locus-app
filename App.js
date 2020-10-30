import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import * as Updates from 'expo-updates'
import colors from './src/constants/colors.json'
import Routes from './src/routes'

export default function App() {
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync()

      if (isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    }

    updateApp()
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <Routes />
    </>
  )
}
