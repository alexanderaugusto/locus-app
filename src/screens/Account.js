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
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { InputArea, ImagePickerFunction, Loader } from '../components'
import api, { STORAGE_URL } from '../services/api'
import { useAuth } from '../contexts/auth'
import { formatPhoneNumber } from '../utils/util'

import colors from '../constants/colors.json'

export default function Account() {
  const navigation = useNavigation()
  const { signed, signOut } = useAuth()

  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: `${STORAGE_URL}/user/default-avatar.png`
  })

  const getUser = async () => {
    setLoading(true)
    api
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

    setLoading(false)
  }

  const updateInfo = async () => {
    setLoading(true)

    const data = {
      name: userInfo.name,
      phone: userInfo.phone
    }
    api
      .put('/user', data)
      .then(res => {})
      .catch(err => {
        console.error(err)
      })

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const updateAvatar = async image => {
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const data = new FormData()

    data.append('file', image)

    api
      .put('/user/avatar', data, config)
      .then(res => {
        setUserInfo({ ...userInfo, avatar: image.uri })
      })
      .catch(err => {
        console.error(err)
      })
    setTimeout(() => {
      setLoading(false)
    }, 1000)
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
      <Loader isLoading={loading} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={Platform.OS === 'ios'}
      >
        <View style={styles.header} />

        <Text style={styles.title}>Minha conta</Text>

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
          <InputArea
            label={'Nome: '}
            placeholder={'Seu nome...'}
            value={userInfo.name}
            onChangeText={value => onChange('name', value)}
          />
          <InputArea
            label={'E-mail: '}
            placeholder={'Seu email...'}
            value={userInfo.email}
            keyboardType={'email-address'}
            onChangeText={value => onChange('email', value)}
          />
          <InputArea
            label={'Celular: '}
            placeholder={'Seu celular...'}
            value={formatPhoneNumber(userInfo.phone)}
            keyboardType={'phone-pad'}
            onChangeText={value => onChange('phone', value)}
          />
          <TouchableOpacity style={styles.button} onPress={() => updateInfo()}>
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
    color: '#333740',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  emptyDescription: {
    color: '#AAADB3',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15
  },

  emptyButton: {
    height: 40,
    width: 130,
    backgroundColor: colors['blue-secondary'],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 25,
    marginVertical: 10
  },

  emptyButtonText: {
    color: '#FFFFFF'
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: colors.platinum
  },

  container: {
    flex: 1,
    backgroundColor: colors.platinum
  },

  header: {
    backgroundColor: colors.blue,
    width: '100%',
    height: '40%',
    position: 'absolute'
  },

  title: {
    paddingTop: 30,
    margin: 10,
    fontSize: 28,
    fontWeight: '600',
    color: colors.yellow,
    alignSelf: 'center'
  },

  cardContainer: {
    marginTop: 10,
    padding: 8,

    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#b2b2b2',
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
    borderColor: colors.yellow
  },

  name: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '500',
    color: colors.blue,
    alignSelf: 'center'
  },

  buttonLogout: {
    height: 30,
    width: 100,
    backgroundColor: colors.yellow,
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
    backgroundColor: colors.yellow,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30
  },

  buttonText: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 16
  },

  form: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1
  }
})
