import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { InputArea, ImagePickerFunction } from '../components'
import api, { STORAGE_URL } from '../services/api'
import { useAuth } from '../contexts/auth'
import { formatPhoneNumber } from '../utils/util'
import { useLoading } from '../contexts/loading'

import colors from '../constants/colors.json'

export default function Account() {
  const navigation = useNavigation()
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
      <KeyboardAvoidingView
        testID="empty-message"
        style={styles.emptyContainer}
      >
        <Icon name="user-alt" size={120} color={colors.blue} />

        <View>
          <Text style={styles.emptyTitle}>
            Você ainda não está logado em uma conta!
          </Text>
          <Text style={styles.emptyDescription}>
            Faça o login no aplicativo para poder acessar os dados da sua conta.
          </Text>
        </View>

        <TouchableOpacity
          testID={'account-empty-button'}
          style={styles.emptyButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.emptyButtonText}>Entrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
          <TouchableOpacity
            disabled={buttonLoading}
            testID={'account-save-button'}
            style={styles.button}
            onPress={() =>
              userInfo.name === '' ||
              userInfo.email === '' ||
              userInfo.phone === ''
                ? setErrorMessage('Preencha todos os campos corretamente!')
                : updateInfo()
            }
          >
            {buttonLoading && (
              <ActivityIndicator
                style={styles.buttonLoader}
                size="small"
                color={colors['light-secondary']}
              />
            )}
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '25%'
  },

  emptyTitle: {
    color: colors.h1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  emptyDescription: {
    color: colors.p,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15
  },

  emptyButton: {
    height: 40,
    width: 130,
    backgroundColor: colors.blue,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 25,
    marginVertical: 10
  },

  emptyButtonText: {
    color: colors['light-secondary']
  },

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
    borderRadius: 24,
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
    color: colors.h2,
    alignSelf: 'center'
  },

  buttonLogout: {
    height: 30,
    width: 100,
    backgroundColor: colors.blue,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10
  },

  button: {
    height: 35,
    width: 150,
    maxWidth: 200,
    backgroundColor: colors.blue,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30
  },

  buttonText: {
    color: colors['light-secondary'],
    fontWeight: 'bold',
    fontSize: 16
  },

  buttonLoader: {
    marginRight: 10,
    marginLeft: -10
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
