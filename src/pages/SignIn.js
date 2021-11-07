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
import { InputArea, Button } from '../components'
import { useAuth } from '../contexts/auth'
import { showMessage } from 'react-native-flash-message'

import logo from '../../assets/logo-blue.png'
import colors from '../utils/constants/colors.json'

export default function SignIn() {
  const navigation = useNavigation()
  const { signIn } = useAuth()

  const [buttonLoading, setButtonLoading] = useState(false)
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
          description: err.response?.data.message,
          type: err.response.status >= 500 ? 'danger' : 'warning',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
      })

    setButtonLoading(false)
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
  }
})
