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
import { ImagePickerFunction, Warning } from '../components'
import api, { STORAGE_URL } from '../services/api'
import { useAuth } from '../contexts/auth'
import { useLoading } from '../contexts/loading'
import { useReset } from '../contexts/reset'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { formatDate } from '../utils/util'

import colors from '../utils/constants/colors.json'

export default function Account() {
  const { signed, signOut } = useAuth()
  const { startLoading, stopLoading } = useLoading()
  const navigation = useNavigation()
  const { screens, resetScreen } = useReset()

  const [userInfo, setUserInfo] = useState({
    avatar: `${STORAGE_URL}/user/default-avatar.png`
  })
  const [userVisits, setUserVisits] = useState([])

  const getUser = async () => {
    startLoading()

    await api
      .get('/user')
      .then(res => {
        setUserInfo({
          ...res.data,
          avatar: res.data.is_oauth_user
            ? res.data.avatar
            : `${STORAGE_URL}/user/${res.data.avatar}`
        })
      })
      .catch(err => {
        console.error(err)

        showMessage({
          message: 'Algo deu errado :(',
          description: err.response?.data.description,
          type: err.response?.status >= 500 ? 'danger' : 'warning',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
      })

    stopLoading()
  }

  const getUserVisits = async () => {
    startLoading()

    await api
      .get('/user/visits')
      .then(res => {
        setUserVisits(res.data)
      })
      .catch(err => {
        console.error(err)

        showMessage({
          message: 'Algo deu errado :(',
          description: err.response?.data.description,
          type: err.response?.status >= 500 ? 'danger' : 'warning',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
      })

    stopLoading()
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
        showMessage({
          message: 'Sucesso',
          description: 'Sua foto de perfil foi atualizada com sucesso',
          type: 'success',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
      })
      .catch(err => {
        console.error(err)

        showMessage({
          message: 'Algo deu errado :(',
          description: err.response?.data.description,
          type: err.response?.status >= 500 ? 'danger' : 'warning',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
      })

    stopLoading()
  }

  useEffect(() => {
    if (signed) {
      getUser()
      getUserVisits()
    }
  }, [signed])

  useEffect(() => {
    if (screens.account) {
      getUser()
      getUserVisits()
      resetScreen('account', false)
    }
  }, [screens.account])

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

        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditUser')}
          >
            <Icon name="user-edit" size={24} color={colors.blue} />

            <View style={styles.menuText}>
              <Text style={styles.menuItemTitle}>Informações de perfil</Text>
              <Text style={styles.menuItemDescription}>
                {userInfo.updatedAt
                  ? `Modificado ${formatDate(userInfo.updatedAt)}`
                  : 'Nenhuma modificação'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditVisit')}
          >
            <Icon name="calendar-alt" size={24} color={colors.blue} />

            <View style={styles.menuText}>
              <Text style={styles.menuItemTitle}>Visitas agendadas</Text>
              <Text
                style={styles.menuItemDescription}
              >{`${userVisits.length} visitas agendadas`}</Text>
            </View>
          </TouchableOpacity>
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

  menu: {
    paddingHorizontal: 30,
    marginTop: 10
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['light-secondary'],
    marginVertical: 10,
    padding: 20,
    borderRadius: 8,
    shadowColor: colors.h1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1
  },

  menuText: {
    marginLeft: 20
  },

  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.h1
  },

  menuItemDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.h2
  }
})
