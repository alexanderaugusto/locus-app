import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList
} from 'react-native'
import { Button } from '../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useLoading } from '../contexts/loading'
import api from '../services/api'
import { formatDate, formatWeekday, formatHour } from '../utils/util'
import colors from '../utils/constants/colors.json'

export default function ScheduleVisit() {
  const navigation = useNavigation()
  const route = useRoute()
  const { startLoading, stopLoading, loading } = useLoading()
  const [propertyVisits, setPropertyVisits] = useState([])
  const [selectedHour, setSelectedHour] = useState()
  const [selectedVisit, setSelectedVisit] = useState({
    available_times: [],
    date: '',
    weekday: ''
  })

  const getPropertyVisits = async () => {
    await api
      .get(`/property/${route.params.item.id}/visits`)
      .then(res => {
        setPropertyVisits(res.data)
        setSelectedVisit(res.data[0])
      })
      .catch(err => {
        console.error(err)
      })

    stopLoading()
  }

  // CRIAR REQUISIÇÃO PARA AGENDAR VISITA

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
        <SafeAreaView style={styles.dataContainer}>
          <FlatList
            data={propertyVisits}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            numberOfLiner={3}
            scrollEnabled={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedVisit(item)}
                  style={[
                    styles.optionButton,
                    selectedVisit.date === item.date
                      ? styles.optionSelected
                      : {}
                  ]}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      selectedVisit.date === item.date
                        ? styles.optionSelectedText
                        : {}
                    ]}
                  >
                    {formatWeekday(item.weekday)}
                  </Text>
                  <Text
                    style={[
                      styles.optionButtonText,
                      selectedVisit.date === item.date
                        ? styles.optionSelectedText
                        : {}
                    ]}
                  >
                    {formatDate(item.date)}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        </SafeAreaView>

        <Text style={styles.label}>Escolha o melhor horário:</Text>
        <SafeAreaView style={styles.dataContainer}>
          <FlatList
            data={selectedVisit.available_times}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            numberOfLiner={3}
            scrollEnabled={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedHour(item)}
                  style={[
                    styles.optionButton,
                    selectedHour === item ? styles.optionSelected : {}
                  ]}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      selectedHour === item ? styles.optionSelectedText : {}
                    ]}
                  >
                    {formatHour(item)}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        </SafeAreaView>

        <Button
          btnText="Enviar"
          // onPress={handleSubmitVisit}
          disabled={loading}
        />
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
  },

  dataContainer: {
    flex: 1,
    marginTop: 10
  },

  optionButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    backgroundColor: colors['light-secondary'],
    borderRadius: 100,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 5,
    padding: 10
  },

  optionSelected: {
    backgroundColor: colors.blue
  },

  optionSelectedText: {
    color: '#FFF'
  },

  optionButtonText: {
    color: colors.h2,
    fontSize: 13
  }
})
