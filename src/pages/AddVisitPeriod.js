import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { showMessage } from 'react-native-flash-message'
import Icon from '@expo/vector-icons/FontAwesome5'
import { InputArea, InputSelect, Button } from '../components'
import colors from '../utils/constants/colors.json'
import weekdays from '../utils/constants/weekdays.json'
import api from '../services/api'

import { useLoading } from '../contexts/loading'
export default function AddVisitPeriod() {
  const navigation = useNavigation()
  const route = useRoute()
  const { startLoading, stopLoading } = useLoading()
  const item = route.params?.item
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const [data, setData] = useState({
    weekday: 'monday',
    time: '00:00'
  })

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const setTime = date => {
    let localeDate = date.toLocaleTimeString('pt-BR')
    localeDate = localeDate.substring(0, 5)
    onChange('time', localeDate)
    hideDatePicker()
  }

  const onChange = (type, value) => setData({ ...data, [type]: value })

  const sendEditInfo = async data => {
    startLoading()

    const reload = true

    await api
      .post(`/property/${item.id}/visit`, data)
      .then(res => {
        showMessage({
          message: 'Sucesso',
          description:
            'Os horários para visitação foram atualizados com sucesso',
          type: 'success',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })

        stopLoading()
        navigation.navigate('Anunciar', { reload })
      })
      .catch(err => {
        stopLoading()
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
  }

  return (
    <KeyboardAvoidingView testID="edit-property" style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.goBack()}
        >
          <Icon name={'arrow-left'} size={20} color={colors.h1} />
        </TouchableOpacity>
        <Text numberOfLiner={2} style={styles.headerTitle}>
          Agendar Visita
        </Text>
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.label}>Tipo</Text>
        <InputSelect
          testID="weekday-input"
          items={weekdays}
          selectedValue={data.weekday}
          menuTitle="Qual o dia da visita?"
          onChange={item => onChange('weekday', item.value)}
        />

        <Text style={styles.label}>Horário</Text>
        <TouchableOpacity onPress={() => showDatePicker()}>
          <InputArea
            testID="time-input"
            placeholder={'Horário da visita...'}
            value={data.time}
            editable={false}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={setTime}
          onCancel={hideDatePicker}
        />

        <Button btnText={'Finalizar'} onPress={() => sendEditInfo(data)} />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['light-primary'],
    paddingVertical: 10,
    paddingHorizontal: 20
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    alignSelf: 'center',
    opacity: 0.8
  },

  goBack: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0
  },

  label: {
    marginTop: 15,
    marginBottom: -10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: colors.h2
  }
})
