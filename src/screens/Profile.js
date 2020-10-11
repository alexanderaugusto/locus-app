import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import colors from '../consts/colors.json'
import avatar from '../../assets/img/avatar.png'

import EditTextField from '../components/EditTextField'
import InputArea from '../components/InputArea'

const CARD_HEIGHT = Dimensions.get('window').height * 0.34
export default function Profile() {

  const [edit, setEdit] = useState(false)

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title} > Perfil </Text>

        <View style={styles.cardContainer}>
          <Image style={styles.avatarContainer} resizeMode="contain" source={avatar} />
          <Text style={styles.name} > Pedro Henrique</Text>
          <Text style={styles.city} > Pouso Alegre (MG) </Text>

          <TouchableOpacity style={styles.editIcon} onPress={() => setEdit(!edit)}>
            <FontAwesome5 name={'edit'} size={18} color={colors['blue']} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView style={styles.body}
        behavior="padding"
        enabled={Platform.OS === 'ios'}
      >
        <ScrollView showsVerticalScrollIndicator={false} >
          <EditTextField label={'Nome: '} text={'Pedro Henrique Silva'} edit={edit} />
          <EditTextField label={'E-mail: '} text={'pedrohs@gmail.com'} keyboardType={'email-address'} edit={edit} />
          <EditTextField label={'Celular: '} text={'(35) 99988-7766'} keyboardType={'phone-pad'} edit={edit} />

          {
            edit ?
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              : <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Seus Imóveis</Text>
              </TouchableOpacity>
          }
        </ScrollView>
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
    height: CARD_HEIGHT,
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
    height: 200,
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