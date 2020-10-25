import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import colors from '../constants/colors.json'


export default function InputArea({ prefixIcon, label, containerStyle, style, ...inputProps }) {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {prefixIcon && (
        <Icon
          style={styles.button}
          name={prefixIcon}
          size={16}
          color={colors['blue']}
        />
      )}

      {label && (
        <Text style={styles.label} >{label}</Text>
      )}

      <TextInput
        {...inputProps}
        style={[styles.inputText, style]}
        placeholderTextColor="#d2d2d2"
      />

    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#FFF",
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors["blue"],
    borderRadius: 25,
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
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 8,
    height: 46
  },

  button: {
    alignSelf: 'center',
  },

  label: {
    fontWeight: '600',
    color: colors["blue"],
    alignSelf: 'center',
  },
})