import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import * as Updates from 'expo-updates'

// Contexts
import { AuthProvider } from './src/contexts/auth'
import { LoadingProvider } from './src/contexts/loading'
import { ResetProvider } from './src/contexts/reset'

import Routes from './src/routes'
import colors from './src/utils/constants/colors.json'

export default function App() {
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync()

      if (isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    }

    // eslint-disable-next-line no-undef
    if (!__DEV__) {
      updateApp()
    }
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <AuthProvider>
        <LoadingProvider>
          <ResetProvider>
            <Routes />
          </ResetProvider>
        </LoadingProvider>
      </AuthProvider>
    </>
  )
}
