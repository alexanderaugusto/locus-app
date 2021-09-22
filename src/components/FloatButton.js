import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5'

import colors from '../utils/constants/colors.json'

export default function FloatButton(props) {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Icon name="plus" color="#FFFFFF" size={16} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.blue,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 560,
    right: 20,
    bottom: 30
  }
})
