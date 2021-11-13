/* eslint-disable multiline-ternary */
/* eslint-disable camelcase */
import React, { useState } from 'react'
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { InputArea, Button } from '../components'
import { useAuth } from '../contexts/auth'
import { showMessage } from 'react-native-flash-message'
import GoogleSignIn from '../services/auth/google'

import logo from '../../assets/logo-blue.png'
import google_icon from '../../assets/google-icon.png'
import colors from '../utils/constants/colors.json'

export default function SignIn() {
  const navigation = useNavigation()
  const { signIn, signInWithGoogle } = useAuth()

  const [buttonLoading, setButtonLoading] = useState(false)
  const [googleButtonLoading, setGoogleButtonLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    setButtonLoading(true)

    await signIn(email, password)
      .then(() => {
        navigation.goBack()
      })
      .catch(err => {
        console.log(err)

        showMessage({
          message: 'Algo deu errado :(',
          description: err.response?.data.description,
          type: err.response.status >= 500 ? 'danger' : 'warning',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
      })

    setButtonLoading(false)
  }

  const loginWithGoogle = async () => {
    setGoogleButtonLoading(true)

    const { type, accessToken } = await GoogleSignIn.getToken()
    if (type === 'success') {
      await signInWithGoogle(accessToken)
        .then(() => {
          navigation.goBack()
        })
        .catch(err => {
          console.log(err)

          showMessage({
            message: 'Algo deu errado :(',
            description: err.response?.data.description,
            type: err.response.status >= 500 ? 'danger' : 'warning',
            autoHide: true,
            icon: 'auto',
            duration: 3000
          })
        })

      setGoogleButtonLoading(false)
    } else {
      setGoogleButtonLoading(false)

      showMessage({
        message: 'Algo deu errado :(',
        description:
          'Ocorreu um erro inesperado na autentiação. Por favor, tente novamente!',
        type: 'warning',
        autoHide: true,
        icon: 'auto',
        duration: 3000
      })
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}
    >
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={logo}></Image>
      </View>

      <InputArea
        testID={'signIn-email'}
        secureTextEntry={false}
        prefixIcon={'envelope'}
        placeholder={'Entre com o seu email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={value => {
          setEmail(value)
        }}
      />

      <InputArea
        testID={'signIn-password'}
        password={true}
        prefixIcon={'lock'}
        placeholder={'Entre com a sua senha'}
        value={password}
        onChangeText={value => {
          setPassword(value)
        }}
      />

      <Button
        btnText={'Entrar'}
        onPress={() => {
          email === '' || password === ''
            ? showMessage({
                message: 'Algo deu errado :(',
                description: 'Os campos de e-mail e senha não podem ser vazios',
                type: 'warning',
                autoHide: true,
                icon: 'auto',
                duration: 3000
              })
            : login()
        }}
        buttonLoading={buttonLoading}
      />

      <TouchableOpacity
        disabled={googleButtonLoading}
        style={styles.googleButton}
        onPress={() => loginWithGoogle()}
      >
        {googleButtonLoading ? (
          <ActivityIndicator
            style={styles.googleButtonLoader}
            size="small"
            color={colors.blue}
          />
        ) : (
          <Image style={styles.googleIcon} source={google_icon} />
        )}
        <Text style={styles.googleButtonText}>Entrar com Google</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Ainda não possui conta?</Text>
        <TouchableOpacity
          onPress={() => {
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
  },

  googleButton: {
    height: 45,
    backgroundColor: colors['light-secondary'],
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 5,
    paddingHorizontal: 8
  },

  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10
  },

  googleButtonText: {
    color: colors.h2,
    fontWeight: 'bold',
    fontSize: 16
  },

  googleButtonLoader: {
    marginRight: 10,
    marginLeft: -10
  }
})
