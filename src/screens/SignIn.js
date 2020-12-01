import React, { useState } from 'react'
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { InputArea, Loader } from '../components'
import { useAuth } from '../contexts/auth'

import logo from '../../assets/logo-text.png'
import colors from '../constants/colors.json'

export default function SignIn() {
  const navigation = useNavigation()
  const { signIn } = useAuth()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const login = async () => {
    setLoading(true)
    await signIn(email, password)
      .then(() => {
        navigation.goBack()
      })
      .catch(err => {
        setErrorMessage('Algo deu errado, tente novamente!')
        console.log(err)
      })
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}
    >
      <Loader isLoading={loading} />

      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={logo}></Image>
      </View>

      <Text testID={'errorMessageText'} style={styles.errorMessage}>
        {errorMessage}
      </Text>

      <InputArea
        testID={'signIn-email'}
        secureTextEntry={false}
        prefixIcon={'envelope'}
        placeholder={'Entre com o seu email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <InputArea
        testID={'signIn-password'}
        password={true}
        prefixIcon={'lock'}
        placeholder={'Entre com a sua senha'}
        value={password}
        onChangeText={value => setPassword(value)}
      />

      <TouchableOpacity
        testID={'signIn-button'}
        style={styles.button}
        onPress={() => {
          email === '' || password === ''
            ? setErrorMessage('Preencha todos os campos corretamente!')
            : login()
        }}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Ainda não possui conta?</Text>
        <TouchableOpacity
          onPress={() => {
            setErrorMessage('')
            navigation.navigate('SignUp')
          }}
        >
          <Text style={styles.signUpBtnText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['light-primary'],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35
  },

  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    width: 200,
    height: 121.21
  },

  title: {
    fontSize: 48,
    fontWeight: '500',
    color: colors.blue,
    textAlign: 'center'
  },

  errorMessage: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: colors.danger,
    textAlign: 'center'
  },

  button: {
    height: 45,
    backgroundColor: colors.blue,
    borderRadius: 24,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  buttonText: {
    color: colors['light-secondary'],
    fontWeight: 'bold',
    fontSize: 16
  },

  signUpContainer: {
    flexDirection: 'row',
    marginVertical: 10
  },

  signUpText: {
    color: colors.h2
  },

  signUpBtnText: {
    color: colors.h2,
    fontWeight: 'bold',
    paddingHorizontal: 5
  }
})
