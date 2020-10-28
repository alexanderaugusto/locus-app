import React, { useState } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, Image, Platform } from 'react-native'
import { InputArea } from '../components'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

import logo from '../../assets/img/house_agreement.png'
import colors from '../constants/colors.json'

export default function SignIn(props) {
  const navigation = useNavigation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)

  const login = () => {
    const data = {
      email,
      password
    }

    api.post(`/auth/login`, data)
      .then(async (res) => {
        await AsyncStorage.setItem("user-token", res.data.token)
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}
    >
      <Image style={styles.logo} source={logo}></Image>
      <Text style={styles.title} >IMovel</Text>

      <InputArea
        prefixIcon={'envelope'}
        placeholder={'Entre com o seu email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <InputArea
        prefixIcon={'lock'}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        passwordIcon={showPassword ? 'eye-slash' : 'eye'}
        placeholder={'Entre com a sua senha'}
        secureTextEntry={showPassword ? true : false}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />

      <TouchableOpacity style={styles.button} onPress={() => login()}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Ainda não possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpBtnText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  buttonText: {
    color: colors['blue'],
    fontWeight: 'bold',
    fontSize: 16
  },

  signUpContainer: {
    flexDirection: "row",
    marginVertical: 10
  },

  signUpText: {
    color: colors["blue"]
  },

  signUpBtnText: {
    color: colors["blue"],
    fontWeight: "bold",
    paddingHorizontal: 5
  }
})