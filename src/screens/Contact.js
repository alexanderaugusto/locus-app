import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Linking
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import api, { STORAGE_URL } from '../services/api'
import { InputArea, Loader } from '../components'

import colors from '../constants/colors.json'

export default function Contact() {
  const navigation = useNavigation()
  const route = useRoute()

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleContact = async () => {
    setLoading(true)

    const data = {
      message
    }

    api
      .post(`/user/property/${route.params?.item.id}/owner/contact`, data)
      .then(res => {
        navigation.goBack()
      })
      .catch(err => {
        console.error(err)
      })

    setLoading(false)
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <Loader isLoading={loading} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name={'arrow-left'} size={20} color={colors.h1} />
        </TouchableOpacity>

        <Text numberOfLiner={2} style={styles.title}>
          Contatar dono do Imóvel
        </Text>

        <Image
          style={styles.ownerAvatar}
          resizeMode="contain"
          source={{
            uri: STORAGE_URL + '/user/' + route.params?.item.owner.avatar
          }}
        />

        <View style={styles.ownerInfo}>
          <Icon name="phone" size={25} color={colors.h2} />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `https://api.whatsapp.com/send?phone=+5535984529203&&text=Olá, ${route.params?.item.owner.name}! \n\n Estou interessado no seu imóvel de título: ${route.params?.item.title} \n\n Poderia me passar mais informações?`
              )
            }
          >
            <Text style={styles.contactText}>
              {route.params?.item.owner.phone}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ownerInfo}>
          <Icon name="envelope" size={25} color={colors.h2} />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `mailto:${route.params?.item.owner.email}?subject=IMovel - Aluguel de imóvel&body=Olá, ${route.params?.item.owner.name}! \n\n Estou interessado no seu imóvel de título: ${route.params?.item.title} \n\n Poderia me passar mais informações?`
              )
            }
          >
            <Text style={styles.contactText}>
              {route.params?.item.owner.email}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ownerInfo}>
          <Icon name="map-marker-alt" size={25} color={colors.h2} />
          <View>
            <Text style={styles.contactText}>
              {route.params?.item.street +
                ', ' +
                route.params?.item.neighborhood}
            </Text>
            <Text style={styles.contactText}>
              {route.params?.item.city + ' - ' + route.params?.item.state}
            </Text>
          </View>
        </View>

        <Text style={styles.label}>Mensagem</Text>
        <InputArea
          testID="message-input"
          placeholder={'Sua mensagem para o vendedor...'}
          value={message}
          multiline={true}
          textAlignVertical="top"
          style={styles.textArea}
          onChangeText={value => setMessage(value)}
        />

        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <Text style={styles.contactButtonText}>Enviar</Text>
        </TouchableOpacity>
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
    textAlign: 'left'
  },

  ownerAvatar: {
    width: 150,
    height: 150,
    borderRadius: 150,
    alignSelf: 'center',
    marginVertical: 15
  },

  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },

  contactText: {
    fontSize: 17,
    color: colors.h2,
    marginLeft: 15
  },

  label: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: colors.h1
  },

  textArea: {
    height: 150,
    justifyContent: 'flex-start'
  },

  contactButton: {
    height: 35,
    width: 100,
    backgroundColor: colors.blue,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginVertical: 20
  },

  contactButtonText: {
    color: colors['light-secondary'],
    fontWeight: 'bold',
    fontSize: 16
  }
})
