import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

import logo from '../../assets/img/house_agreement.png'
import colors from '../constants/colors.json'

import InputArea from '../components/InputArea'

export default function SignIn({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}
    >
      <Image style={styles.logo} source={logo}></Image>
      <Text style={styles.title} >IMovel</Text>

      <InputArea icon={'envelope'} placeholder={'Entre com o seu email'} keyboardType={'email-address'} />
      <InputArea icon={'lock'} placeholder={'Entre com a sua senha'} password={true} />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["platinum"],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35
  },

  logo: {
    width: 110,
    height: 110,
  },

  title: {
    fontSize: 48,
    fontWeight: "500",
    color: colors['blue-secondary'],
    textAlign: 'center',
  },

  button: {
    height: 45,
    backgroundColor: colors['yellow'],
    borderRadius: 24,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },

  buttonText: {
    color: colors['blue'],
    fontWeight: 'bold',
    fontSize: 16
  }
})