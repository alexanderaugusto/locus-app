import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import colors from '../utils/constants/colors.json'

export default function Button({
  logout = false,
  buttonLoading = false,
  btnText,
  ...rest
}) {
  return (
    <TouchableOpacity disabled={buttonLoading} style={styles.button} {...rest}>
      {buttonLoading && (
        <ActivityIndicator
          style={styles.buttonLoader}
          size="small"
          color={colors['light-secondary']}
        />
      )}
      <Text style={styles.buttonText}>{btnText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    backgroundColor: colors.blue,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  buttonText: {
    color: colors['light-secondary'],
    fontWeight: 'bold',
    fontSize: 16
  },

  buttonLoader: {
    marginRight: 10,
    marginLeft: -10
  }
})
