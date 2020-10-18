import React from 'react'
import { StatusBar } from 'react-native'
import colors from './src/constants/colors.json'
import Routes from './src/routes'

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors["blue"]} />
      <Routes />
    </>
  )
}

