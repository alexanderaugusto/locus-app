import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../constants/colors.json'

export default function Loader({ isLoading }) {
  if (!isLoading)
    return false

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.h1} />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: -35,
    left: -35,
    bottom: -35,
    right: -35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(20, 33, 61, 0.4)',
    zIndex: 2,
  },
})
