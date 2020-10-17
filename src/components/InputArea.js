import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

import colors from '../constants/colors.json'
import Icon from 'react-native-vector-icons/FontAwesome'


export default function InputArea({ prefixIcon, placeholder, password, keyboardType }) {
  return (
    <View style={styles.inputContainer}>
      <Icon
        style={styles.button}
        name={prefixIcon}
        size={16}
        color={colors['blue']}
      />

      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        placeholderTextColor="#d2d2d2"
        secureTextEntry={password}
        keyboardType={keyboardType}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#FFF",
    alignSelf: 'stretch',
    height: 46,
    borderWidth: 1,
    borderColor: colors["blue"],
    borderRadius: 24,
    marginTop: 15,
    paddingHorizontal: 12,
    flexDirection: "row",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },

  inputText: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },

  button: {
    alignSelf: 'center',
  },
})