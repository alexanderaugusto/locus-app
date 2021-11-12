import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'
import { InputArea, Button } from '../components'
import api from '../services/api'
import { formatPhoneNumber } from '../utils/util'
import { useLoading } from '../contexts/loading'
import { useReset } from '../contexts/reset'
import { showMessage } from 'react-native-flash-message'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

import colors from '../utils/constants/colors.json'

export default function EditUser() {
  const { startLoading, stopLoading } = useLoading()
  const navigation = useNavigation()
  const { resetScreen } = useReset()

  const [errorMessage, setErrorMessage] = useState('')
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [buttonLoading, setButtonLoading] = useState(false)

  const getUser = async () => {
    setErrorMessage('')

    startLoading()

    await api
      .get('/user')
      .then(res => {
        setUserInfo(res.data)
      })
      .catch(err => {
        console.error(err)

        showMessage({
          message: 'Algo deu errado :(',
          description: err.response?.data.description,
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
      .then(res => {
        showMessage({
          message: 'Sucesso',
          description: 'Seus dados foram atualizado com sucesso',
          type: 'success',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
        resetScreen('account', true)
        navigation.goBack()
      })
      .catch(err => {
        console.error(err)

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

  const onChange = (type, value) => setUserInfo({ ...userInfo, [type]: value })

  useEffect(() => getUser(), [])

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name={'arrow-left'} size={20} color={colors.h1} />
        </TouchableOpacity>

        <Text numberOfLiner={2} style={styles.title}>
          Editar informação do perfil
        </Text>
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
  container: {
    flex: 1,
    backgroundColor: colors['light-primary'],
    padding: 30
  },

  title: {
    width: 300,
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    textAlign: 'center',
    paddingTop: 15
  },

  form: {
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
