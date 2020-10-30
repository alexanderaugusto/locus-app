import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import colors from '../constants/colors.json'

export default function FloatButton(props) {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <FontAwesome5 name="plus" color="#FFFFFF" size={16} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: colors["blue-secondary"],
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 560,
    right: 20,
    bottom: 30
  }
})