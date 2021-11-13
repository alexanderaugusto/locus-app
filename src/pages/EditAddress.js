import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { InputArea, InputSelect, Button, Error } from '../components'
import colors from '../utils/constants/colors.json'
import states from '../utils/constants/states.json'
import api, { zipcodeAPI } from '../services/api'
import { formatZipcode } from '../utils/util'
import { useLoading } from '../contexts/loading'
import { showMessage } from 'react-native-flash-message'

export default function EditAddress() {
  const navigation = useNavigation()
  const { startLoading, stopLoading } = useLoading()
  const route = useRoute()
  const item = route.params?.item
  const [errorMessage, setErrorMessage] = useState('')

  const [data, setData] = useState({
    street: item.address.street,
    neighborhood: item.address.neighborhood,
    number: item.address.number.toFixed(0),
    city: item.address.city,
    state: 'MG',
    country: 'Brasil',
    zipcode: item.address.zipcode
  })

  const onChange = (type, value) => setData({ ...data, [type]: value })

  const sendAddress = async () => {
    const propertyData = {
      street: data.street,
      neighborhood: data.neighborhood,
      number: data.number,
      city: data.city,
      state: 'MG',
      country: 'Brasil',
      zipcode: data.zipcode
    }

    startLoading()

    const reload = true

    await api
      .patch(`/property/${item.id}/address`, propertyData)
      .then(res => {
        item.address = res.data
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

  const validateFields = dataFields => {
    let validField = true

    Object.keys(dataFields).forEach(function (key) {
      if (dataFields[key].length <= 0) {
        validField = false
      }
    })

    return validField
  }

  const searchZipcode = async zipcode => {
    const validZipCode = /^[0-9]{8}$/
    setErrorMessage('')

    if (validZipCode.test(zipcode)) {
      await zipcodeAPI
        .get(`/${zipcode}/json`)
        .then(res => {
          if (res.data.erro) {
            setErrorMessage(
              'Ops, este CEP é inválido !\nPara prosseguir, é necessário preencher o campo corretamente!'
            )
          }

          setData({
            ...data,
            zipcode: zipcode,
            street: res.data.logradouro,
            neighborhood: res.data.bairro,
            city: res.data.localidade,
            state: res.data.uf
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
    }
  }

  return (
    <KeyboardAvoidingView testID="edit-property" style={styles.container}>
      <View style={styles.header}>
        <Text numberOfLiner={2} style={styles.headerTitle}>
          Editar Propriedade
        </Text>
      </View>

      {errorMessage.length > 0 ? <Error errorMessage={errorMessage} /> : null}

      <Text style={styles.label}>CEP</Text>
      <InputArea
        testID="zipcode-input"
        placeholder={'CEP do imóvel...'}
        value={formatZipcode(data.zipcode)}
        onChangeText={value => {
          onChange('zipcode', value)
          searchZipcode(value)
        }}
      />

      <Text style={styles.label}>Rua</Text>
      <InputArea
        testID="street-input"
        placeholder={'Rua do imóvel...'}
        value={data.street}
        onChangeText={value => onChange('street', value)}
      />

      <Text style={styles.label}>Bairro</Text>
      <InputArea
        testID="neighborhood-input"
        placeholder={'Bairro do imóvel...'}
        value={data.neighborhood}
        onChangeText={value => onChange('neighborhood', value)}
      />

      <Text style={styles.label}>Número</Text>
      <InputArea
        testID="number-input"
        placeholder={'Número do imóvel...'}
        value={data.number}
        onChangeText={value => onChange('number', value)}
      />

      <Text style={styles.label}>Cidade</Text>
      <InputArea
        testID="city-input"
        placeholder={'Cidade do imóvel...'}
        value={data.city}
        editable={false}
      />

      <Text style={styles.label}>Estado</Text>
      <InputSelect
        testID="state-input"
        items={states}
        selectedValue={data.state}
        onChange={item => onChange('state', item.value)}
      />

      <Button
        btnText={'Finalizar'}
        onPress={() =>
          validateFields(data)
            ? sendAddress()
            : setErrorMessage('Preencha todos os campos antes de prosseguir')
        }
      />
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

  label: {
    marginTop: 15,
    marginBottom: -10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: colors.h2
  }
})
