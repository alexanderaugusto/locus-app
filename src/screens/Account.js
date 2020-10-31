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
import { InputArea, ImagePickerFunction } from '../components'
import api, { STORAGE_URL } from '../services/api'
import { useAuth } from '../contexts/auth'

import colors from '../constants/colors.json'

export default function Account() {
  const navigation = useNavigation()
  const { signed, signOut } = useAuth()

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: `${STORAGE_URL}/user/default-avatar.png`
  })

  const getUser = async () => {
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
  }

  const updateInfo = async () => {
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
  }

  const updateAvatar = async image => {
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
  }

  const onChange = (type, value) => setUserInfo({ ...userInfo, [type]: value })

  useEffect(() => {
    if (signed) {
      getUser()
    }
  }, [signed])

  if (!signed) {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Minha conta</Text>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
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
          <Text style={styles.name}>{userInfo.name}</Text>
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
            value={userInfo.phone}
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
