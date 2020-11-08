import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5'

import colors from '../constants/colors.json'

export default function InputArea({
  prefixIcon,
  password,
  label,
  containerStyle,
  style,
  textId,
  ...inputProps
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (password && !focused) {
      setShowPassword(false)
    }
  }, [focused])

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {prefixIcon && (
        <Icon
          style={styles.button}
          name={prefixIcon}
          size={16}
          color={colors.blue}
        />
      )}

      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        {...inputProps}
        textId={textId}
        style={[styles.inputText, style]}
        placeholderTextColor="#d2d2d2"
        secureTextEntry={!showPassword}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {password && focused && (
        <TouchableOpacity
          style={styles.passwordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={16}
            color={colors.blue}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 25,
    marginTop: 15,
    paddingHorizontal: 12,
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 2
  },

  inputText: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    height: 46
  },

  button: {
    alignSelf: 'center'
  },

  passwordButton: {
    alignSelf: 'center',
    marginLeft: -35
  },

  label: {
    fontWeight: '600',
    color: colors.blue,
    alignSelf: 'center'
  }
})
