import React, { useEffect } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Button } from '../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useLoading } from '../contexts/loading'
import api from '../services/api'

import colors from '../utils/constants/colors.json'

export default function ScheduleVisit() {
  const navigation = useNavigation()
  const route = useRoute()
  const { startLoading, stopLoading, loading } = useLoading()

  const getPropertyVisits = async () => {
    await api
      .get(`/property/${route.params.item.id}/visits`)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })

    stopLoading()
  }

  useEffect(() => {
    startLoading()
    getPropertyVisits()
  }, [])

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
          Agendar visita ao imóvel
        </Text>

        <Text style={styles.message}>
          Agende a melhor data e horário para você visitar o imóvel. Mas
          atente-se ao horário disponivel pelo proprietário.
        </Text>

        <Text style={styles.label}>Escolha a melhor data:</Text>
        {/* ADICIONAR AQUI OPÇÃO PARA SELECIONAR DATA */}

        <Text style={styles.label}>Escolha o melhor horário:</Text>
        {/* ADICIONAR AQUI OPÇÃO PARA SELECIONAR DATA */}

        <Button
          btnText="Enviar"
          // onPress={handleSubmitVisit}
          disabled={loading}
        />

        {/* <TouchableOpacity
          disabled={buttonLoading}
          style={styles.contactButton}
          onPress={handleContact}
        >
          {buttonLoading && (
            <ActivityIndicator
              style={styles.buttonLoader}
              size="small"
              color={colors['light-secondary']}
            />
          )}
          <Text style={styles.contactButtonText}>Enviar</Text>
        </TouchableOpacity> */}
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

  message: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: colors.h2,
    textAlign: 'center'
  },

  label: {
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: '600',
    color: colors.h1
  }
})
