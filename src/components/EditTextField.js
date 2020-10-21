import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'

import colors from '../constants/colors.json'

export default function EditTextField({ label, text, keyboardType }) {
  return (
    <View style={styles.inputContainer}>

      <View style={styles.infoContainer} >
        <Text style={styles.label} >{label}</Text>
        <TextInput style={styles.infoText} keyboardType={keyboardType}
          placeholder={text}
          placeholderTextColor={colors["blue"]}
        />
      </View>

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

  infoContainer: {
    paddingHorizontal: 5,
    alignSelf: 'center',
    flexDirection: 'row',
  },

  label: {
    fontWeight: '600',
    color: colors["blue"],
  },  
})