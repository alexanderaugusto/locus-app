import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'

import { InputArea, InputSelect, Button } from '../components'
import types from '../utils/constants/types.json'
import colors from '../utils/constants/colors.json'
import api from '../services/api'
import { showMessage } from 'react-native-flash-message'

import { useLoading } from '../contexts/loading'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function EditInfo() {
  const navigation = useNavigation()
  const { startLoading, stopLoading } = useLoading()
  const route = useRoute()
  const item = route.params?.item

  const [data, setData] = useState({
    title: item.title,
    description: item.description,
    price: item.price.toFixed(2),
    bedrooms: item.bedrooms.toFixed(0),
    bathrooms: item.bathrooms.toFixed(0),
    area: item.area.toFixed(0),
    place: item.place.toFixed(0),
    garage: item.garage.toFixed(0),
    animal: item.animal,
    type: item.type
  })

  const onChange = (type, value) => setData({ ...data, [type]: value })

  const updateItemInfo = resData => {
    Object.keys(resData).forEach(function (key) {
      item[key] = resData[key]
    })
  }

  const sendEditInfo = async () => {
    const propertyData = {}

    Object.keys(data).forEach(function (key) {
      if (data[key] !== '') {
        propertyData[key] = data[key]
      }
    })

    startLoading()

    const reload = true

    await api
      .patch(`/property/${item.id}`, propertyData)
      .then(res => {
        updateItemInfo(res.data)
        stopLoading()
        navigation.navigate('Anunciar', { reload })
      })
      .catch(err => {
        stopLoading()
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
  }

  return (
    <KeyboardAvoidingView testID="edit-property" style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollView}
      >
        <View style={styles.header}>
          <Text numberOfLiner={2} style={styles.headerTitle}>
            Editar Propriedade
          </Text>
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.label}>Título</Text>
          <InputArea
            testID="title-input"
            placeholder={'Título do anúncio...'}
            value={data.title}
            onChangeText={value => onChange('title', value)}
          />

          <Text style={styles.label}>Descrição</Text>
          <InputArea
            testID="description-input"
            placeholder={'Descrição do anúncio...'}
            value={data.description}
            multiline={true}
            textAlignVertical="top"
            style={styles.textArea}
            onChangeText={value => onChange('description', value)}
          />
          <Text style={styles.label}>Tipo</Text>
          <InputSelect
            testID="type-input"
            items={types}
            selectedValue={data.type}
            menuTitle="Qual o tipo de imóve?"
            onChange={item => onChange('type', item.value)}
          />

          <Text style={styles.label}>Quartos</Text>
          <InputArea
            testID="bedrooms-input"
            keyboardType={'number-pad'}
            placeholder={'Quantidade de quartos...'}
            value={data.bedrooms}
            onChangeText={value => onChange('bedrooms', value)}
          />

          <Text style={styles.label}>Banheiros</Text>
          <InputArea
            testID="bathrooms-input"
            keyboardType={'number-pad'}
            placeholder={'Quantidade de banheiros...'}
            value={data.bathrooms}
            onChangeText={value => onChange('bathrooms', value)}
          />

          <Text style={styles.label}>Area m²</Text>
          <InputArea
            testID="area-input"
            keyboardType={'number-pad'}
            placeholder={'Area do imóvel...'}
            value={data.area}
            onChangeText={value => onChange('area', value)}
          />

          <Text style={styles.label}>Vagas</Text>
          <InputArea
            testID="place-input"
            keyboardType={'number-pad'}
            placeholder={'É um imóvel para quantas pessoas?'}
            value={data.place}
            onChangeText={value => onChange('place', value)}
          />

          <Text style={styles.label}>Vagas na garagem</Text>
          <InputArea
            testID="garage-input"
            keyboardType={'number-pad'}
            placeholder={'Possui garagem? Se sim, quantas vagas?'}
            value={data.garage}
            onChangeText={value => onChange('garage', value)}
          />

          <Text style={styles.label}>Animal</Text>
          <InputSelect
            testID="animal-input"
            items={[
              { label: 'Sim', value: true },
              { label: 'Não', value: false }
            ]}
            selectedValue={data.animal}
            menuTitle="Seu imóvel pode conter animais?"
            onChange={item => onChange('animal', item.value)}
          />

          <Text style={styles.label}>Preço</Text>
          <InputArea
            testID="price-input"
            keyboardType={'number-pad'}
            label="R$"
            placeholder={'0,00'}
            value={data.price}
            onChangeText={value => onChange('price', value)}
          />

          <Button btnText={'Finalizar'} onPress={() => sendEditInfo()} />
        </View>
      </ScrollView>
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
  },

  textArea: {
    height: 130,
    justifyContent: 'flex-start'
  }
})
