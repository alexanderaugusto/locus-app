import React from 'react'
import { Text, StyleSheet } from 'react-native'
import colors from '../utils/constants/colors.json'

export default function Error({ errorMessage }) {
  return <Text style={styles.errorMessage}>{errorMessage}</Text>
}

const styles = StyleSheet.create({
  errorMessage: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: colors.danger,
    textAlign: 'center'
  }
})
