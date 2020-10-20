import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api, { STORAGE_URL } from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

import colors from '../constants/colors.json'

import EditTextField from '../components/EditTextField'

const CARD_HEIGHT = Dimensions.get('window').height * 0.34

export default function Account() {
  const navigation = useNavigation()

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "default-avatar.png"
  })

  const getUser = async () => {
    const token = await AsyncStorage.getItem("user-token")
    if (!token) {
      navigation.navigate("SignIn", { backPath: "Minha conta" })
      return
    }

    const config = {
      headers: {
        "Authorization": "Bearer " + token
      }
    }

    api.get(`/user`, config)
      .then((res) => {
        setUserInfo(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const logout = async () => {
    await AsyncStorage.clear()
    navigation.navigate("SignIn", { backPath: "Minha conta" })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}> Minha conta </Text>

        <View style={styles.cardContainer}>
          <Image style={styles.avatarContainer} resizeMode="contain"
            source={{ uri: `${STORAGE_URL}/user/${userInfo.avatar}` }} />
          <Text style={styles.name}>{userInfo.name}</Text>
          <TouchableOpacity style={styles.buttonLogout} onPress={() => logout()}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView>
        <KeyboardAvoidingView style={styles.body}
          behavior="padding"
          enabled={Platform.OS === 'ios'}
        >
          <View>
            <EditTextField label={'Nome: '} text={'Pedro Henrique Silva'} edit={true} />
            <EditTextField label={'E-mail: '} text={'pedrohs@gmail.com'} keyboardType={'email-address'} edit={true} />
            <EditTextField label={'Celular: '} text={'(35) 99988-7766'} keyboardType={'phone-pad'} edit={true} />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["platinum"],
  },

  header: {
    paddingVertical: 10,
    backgroundColor: colors["blue-secondary"],
  },

  title: {
    margin: 10,
    fontSize: 28,
    fontWeight: "500",
    color: colors['yellow'],
    alignSelf: 'center',
  },

  cardContainer: {
    width: 330,
    alignSelf: 'center',
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#b2b2b2',
    overflow: 'hidden',
    marginTop: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatarContainer: {
    width: 115,
    height: 115,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors["blue"],
    backgroundColor: colors["blue"],
  },

  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "500",
    color: colors['blue'],
    alignSelf: 'center',
  },

  city: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "300",
    color: colors['blue'],
    alignSelf: 'center',
  },

  buttonLogout: {
    height: 30,
    width: 100,
    backgroundColor: colors['yellow'],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10
  },

  editIcon: {
    position: 'absolute',
    right: 18,
    top: 18,
  },

  body: {
    height: '100%',
    paddingHorizontal: 20,
    marginTop: CARD_HEIGHT * 0.3,
  },

  button: {
    height: 35,
    width: 150,
    maxWidth: 200,
    backgroundColor: colors['yellow'],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: colors['blue'],
    fontWeight: 'bold',
    fontSize: 16,
  },

})