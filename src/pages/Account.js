import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import { InputArea, ImagePickerFunction, Warning, Button } from '../components'
import api, { STORAGE_URL } from '../services/api'
import { useAuth } from '../contexts/auth'
import { formatPhoneNumber } from '../utils/util'
import { useLoading } from '../contexts/loading'
import { showMessage } from 'react-native-flash-message'

import colors from '../utils/constants/colors.json'

export default function Account() {
  const { signed, signOut } = useAuth()
  const { startLoading, stopLoading } = useLoading()

  const [errorMessage, setErrorMessage] = useState('')
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: `${STORAGE_URL}/user/default-avatar.png`
  })
  const [buttonLoading, setButtonLoading] = useState(false)

  const getUser = async () => {
    setErrorMessage('')

    startLoading()

    await api
      .get('/user')
      .then(res => {
        setUserInfo({
          ...res.data,
          avatar: `${STORAGE_URL}/user/${res.data.avatar}`
        })
      })
      .catch(err => {
        console.error(err)

        showMessage({
          message: 'Algo deu errado :(',
          description: err.response?.data.message,
          type: err.response.status >= 500 ? 'danger' : 'warning',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
      })

    stopLoading()
  }

  const updateInfo = async () => {
    setErrorMessage('')

    const data = {
      name: userInfo.name,
      phone: userInfo.phone
    }

    setButtonLoading(true)

    await api
      .put('/user', data)
      .then(res => {})
      .catch(err => {
        console.error(err)

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

  const updateAvatar = async image => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const data = new FormData()

    data.append('file', image)

    startLoading()

    await api
      .put('/user/avatar', data, config)
      .then(res => {
        setUserInfo({ ...userInfo, avatar: image.uri })
      })
      .catch(err => {
        console.error(err)

        showMessage({
          message: 'Algo deu errado :(',
          description: err.response?.data.message,
          type: err.response.status >= 500 ? 'danger' : 'warning',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
      })

    stopLoading()
  }

  const onChange = (type, value) => setUserInfo({ ...userInfo, [type]: value })

  useEffect(() => {
    if (signed) {
      getUser()
    }
  }, [signed])

  if (!signed) {
    return (
      <Warning
        title={'Você ainda não está logado em uma conta!'}
        description={
          'Faça o login no aplicativo para poder acessar os dados da sua conta.'
        }
        icon={'user-alt'}
        isBtnVisible={true}
        btnRoute={'SignIn'}
        btnText={'Entrar'}
      />
    )
  }

  return (
    <ScrollView
      testID="account"
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={Platform.OS === 'ios'}
      >
        <View style={styles.headerContainer} />

        <View style={styles.header}>
          <Text numberOfLiner={2} style={styles.headerTitle}>
            Minha Conta
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <ImagePickerFunction onChange={image => updateAvatar(image)}>
            <Image style={styles.avatar} source={{ uri: userInfo.avatar }} />
          </ImagePickerFunction>
          <Text testID={'account-name'} style={styles.name}>
            {userInfo.name}
          </Text>
          <TouchableOpacity
            style={styles.buttonLogout}
            onPress={() => signOut()}
          >
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text testID={'account-errorMessageText'} style={styles.errorMessage}>
            {errorMessage}
          </Text>

          <InputArea
            testID={'account-input-name'}
            label={'Nome: '}
            placeholder={'Seu nome...'}
            value={userInfo.name}
            onChangeText={value => onChange('name', value)}
          />

          <InputArea
            testID={'account-input-email'}
            label={'E-mail: '}
            placeholder={'Seu email...'}
            value={userInfo.email}
            keyboardType={'email-address'}
            onChangeText={value => onChange('email', value)}
          />

          <InputArea
            testID={'account-input-phone'}
            label={'Celular: '}
            placeholder={'Seu celular...'}
            value={formatPhoneNumber(userInfo.phone)}
            keyboardType={'phone-pad'}
            onChangeText={value => onChange('phone', value)}
          />

          <Button
            btnText={'Salvar'}
            onPress={() =>
              userInfo.name === '' ||
              userInfo.email === '' ||
              userInfo.phone === ''
                ? setErrorMessage('Preencha todos os campos corretamente!')
                : updateInfo()
            }
            buttonLoading={buttonLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors['light-primary']
  },

  container: {
    flex: 1,
    backgroundColor: colors['light-primary']
  },

  headerContainer: {
    backgroundColor: colors.blue,
    width: '100%',
    height: '40%',
    position: 'absolute'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: colors['light-secondary'],
    alignSelf: 'center'
  },

  cardContainer: {
    marginTop: 10,
    padding: 8,
    backgroundColor: colors['light-secondary'],
    borderRadius: 8,
    shadowColor: colors.h1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
    overflow: 'hidden',
    width: 330,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: colors.h2
  },

  name: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '500',
    color: colors.h1,
    alignSelf: 'center'
  },

  buttonLogout: {
    height: 30,
    width: 100,
    backgroundColor: colors.blue,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10
  },

  buttonText: {
    color: colors['light-secondary'],
    fontWeight: 'bold',
    fontSize: 16
  },

  form: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1
  },

  errorMessage: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: colors.danger,
    textAlign: 'center'
  }
})
