import React, { useState } from 'react'
import { Platform, KeyboardAvoidingView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { InputArea, ImagePickerFunction } from '../components'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import api, { STORAGE_URL } from '../services/api'
import { formatPhoneNumber, formatCPF } from '../utils/util'

import colors from '../constants/colors.json'

export default function SignUp() {
  const navigation = useNavigation()

  const [data, setData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
    avatar: null
  })

  const onChange = (type, value) => setData({ ...data, [type]: value })

  const signUp = () => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const formData = new FormData()

    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('name', data.name)
    formData.append('cpf', data.cpf)
    formData.append('phone', data.phone)
    if (data.avatar !== null)
      formData.append('file', data.avatar)

    api.post("/user", formData, config)
      .then((res) => {
        navigation.navigate("SignIn")
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
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("SignIn")}>
          <FontAwesome5 name={'arrow-left'} size={20} color={colors['yellow']} />
        </TouchableOpacity>


        <View style={styles.header} >
          <Text style={styles.message}> Cadastre-se.</Text>
          <Text style={styles.message}> É rápido, simples e gratuito!</Text>
        </View>

        <ProgressSteps
          activeStepIconBorderColor={colors['yellow']}
          completedProgressBarColor={colors['yellow']}
          activeLabelColor={colors['yellow']}
          completedLabelColor={colors['yellow']}
          completedStepIconColor={colors['yellow']}
          completedCheckColor={colors['platinum']}
        >
          <ProgressStep
            nextBtnText={'Próximo'}
            label="Pessoal"
            nextBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            scrollable={false}
          >
            <View style={styles.containerInput}>
              <Text style={styles.label}>Nome</Text>
              <InputArea
                placeholder={'Ex: Pedro Henrique Santos'}
                value={data.name}
                onChangeText={(value) => onChange("name", value)}
              />
              <Text style={styles.label}>CPF</Text>
              <InputArea
                placeholder={'xxx.xxx.xxx-xx'}
                value={formatCPF(data.cpf)}
                onChangeText={(value) => onChange("cpf", value)}
                keyboardType={'numeric'}

              />
              <Text style={styles.label}>Celular</Text>
              <InputArea
                placeholder={'(xx)xxxxx-xxxx'}
                value={formatPhoneNumber(data.phone)}
                onChangeText={(value) => { onChange("phone", value) }}
                keyboardType={'phone-pad'}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            label="Login"
            nextBtnText={'Próximo'}
            previousBtnText={'Anterior'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
          >
            <View style={styles.containerInput}>
              <Text style={styles.messageEmail}>Por favor, entre com um e-mail válido!</Text>
              <Text style={styles.label}>E-mail</Text>
              <InputArea
                placeholder={'Ex: pedrohs@gmail.com'}
                keyboardType={'email-address'}
                value={data.email}
                onChangeText={(value) => onChange("email", value)}
              />
              <Text style={styles.label}>Confirmar e-mail</Text>
              <InputArea
                placeholder={'Ex: pedrohs@gmail.com'}
                keyboardType={'email-address'}
                value={data.confirmEmail}
                onChangeText={(value) => onChange("confirmEmail", value)}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            label="Senha"
            nextBtnText={'Próximo'}
            previousBtnText={'Anterior'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
          >
            <View style={styles.containerInput}>
              <Text style={styles.messageEmail}>Para sua segurança, a senha deve ter no mínimo 8 caracteres, com números, letra maiúscula e minúscula e caracteres especiais.</Text>
              <Text style={styles.label}>Senha</Text>
              <InputArea
                placeholder={'••••••••'}
                secureTextEntry={true}
                value={data.password}
                onChangeText={(value) => onChange("password", value)}
              />
              <Text style={styles.label}>Confirmar senha</Text>
              <InputArea
                placeholder={'••••••••'}
                secureTextEntry={true}
                value={data.confirmPassword}
                onChangeText={(value) => onChange("confirmPassword", value)}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            label="Foto"
            previousBtnText={'Anterior'}
            finishBtnText={'Finalizar'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
            onSubmit={() => signUp()}
          >
            <View style={styles.containerInput}>
              <ImagePickerFunction onChange={(image) => onChange("avatar", image)}>
                <Image
                  source={{ uri: data.avatar ? data.avatar.uri : `${STORAGE_URL}/user/default-avatar.png` }}
                  style={styles.avatar}
                />
              </ImagePickerFunction>
              <ImagePickerFunction onChange={(image) => onChange("avatar", image)}>
                <Text style={styles.avatarText}>Alterar</Text>
              </ImagePickerFunction>
            </View>
          </ProgressStep>

        </ProgressSteps>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["platinum"],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  containerInput: {
    marginBottom: 20,
  },

  backButton: {
    marginTop: 5,
  },

  header: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    width: 300,
    fontSize: 23,
    fontWeight: "600",
    color: colors['blue'],
    textAlign: 'left',
  },

  messageEmail: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "500",
    color: '#999',
    textAlign: 'center',

  },

  label: {
    marginTop: 15,
    marginBottom: -10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: "500",
    color: colors['blue'],
  },

  button: {
    height: 35,
    width: 90,
    backgroundColor: colors['yellow'],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors['blue'],
    fontWeight: 'bold',
    fontSize: 16,
  },

  avatar: {
    width: "100%",
    height: "100%",
    width: 180,
    height: 180,
    borderRadius: 180,
    borderWidth: 3,
    borderColor: colors["blue"],
    alignSelf: 'center',
  },

  avatarText: {
    color: colors['yellow'],
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
    textDecorationLine: "underline",
    alignSelf: 'center',
  }

})