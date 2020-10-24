import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, ScrollView } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import api from '../services/api'
import { useNavigation } from '@react-navigation/native'

import colors from '../constants/colors.json'

import InputArea from '../components/InputArea'
import ImagePickerFunction from '../components/ImagePicker'

export default function AddProperty() {
  const navigation = useNavigation()

  const [data, setData] = useState({
    title: "",
    description: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    place: "",
    animal: false,
    type: "Casa",
    images: []
  })

  const onChange = (type, value) => setData({ ...data, [type]: value })

  const add = () => {
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('street', data.street)
    formData.append('neighborhood', data.neighborhood)
    formData.append('city', data.city)
    formData.append('state', data.state)
    formData.append('country', data.country)
    formData.append('price', data.price)
    formData.append('bedrooms', data.bedrooms)
    formData.append('bathrooms', data.bathrooms)
    formData.append('area', data.area)
    formData.append('place', data.place)
    formData.append('animal', data.animal)
    formData.append('type', data.type)
    formData.append('images', data.images)

    api.post("/user/property", data)
      .then((res) => {
        navigation.navigate("Anúnciar")
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
      >
        <View style={styles.header} >
          <Text style={styles.message}>Vamos cadastrar seu imóvel</Text>
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
            label="Informações"
            nextBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            scrollable={false}
          >
            <View style={styles.containerInput}>
              <Text style={styles.label}>Título</Text>
              <InputArea
                placeholder={'Título do anúncio...'}
                value={data.title}
                onChangeText={(value) => onChange("title", value)}
              />
              <Text style={styles.label}>Descrição</Text>
              <InputArea
                placeholder={'Descrição do anúncio...'}
                value={data.description}
                onChangeText={(value) => onChange("description", value)}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            label="Localização"
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
              <Text style={styles.label}>Rua</Text>
              <InputArea
                placeholder={'Rua do imóvel...'}
                value={data.street}
                onChangeText={(value) => onChange("street", value)}
              />
              <Text style={styles.label}>Bairro</Text>
              <InputArea
                placeholder={'Bairro do imóvel...'}
                value={data.neighborhood}
                onChangeText={(value) => onChange("neighborhood", value)}
              />
              <Text style={styles.label}>Cidade</Text>
              <InputArea
                placeholder={'Cidade do imóvel...'}
                value={data.city}
                onChangeText={(value) => onChange("city", value)}
              />
              <Text style={styles.label}>Estado</Text>
              <InputArea
                placeholder={'Estado do imóvel...'}
                value={data.state}
                onChangeText={(value) => onChange("state", value)}
              />
              <Text style={styles.label}>País</Text>
              <InputArea
                placeholder={'País do imóvel...'}
                value={data.country}
                onChangeText={(value) => onChange("country", value)}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            label="Adicionais"
            nextBtnText={'Próximo'}
            previousBtnText={'Anterior'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
          >
            <View style={styles.containerInput}>
              <Text style={styles.label}>Tipo</Text>
              <InputArea
                placeholder={'Tipo do imóvel...'}
                value={data.type}
                onChangeText={(value) => onChange("type", value)}
              />
              <Text style={styles.label}>Quartos</Text>
              <InputArea
                placeholder={'Quantidade de quartos...'}
                value={data.bedrooms}
                onChangeText={(value) => onChange("bedrooms", value)}
              />
              <Text style={styles.label}>Banheiros</Text>
              <InputArea
                placeholder={'Quantidade de banheiros...'}
                value={data.bathrooms}
                onChangeText={(value) => onChange("bathrooms", value)}
              />
              <Text style={styles.label}>Area (m3)</Text>
              <InputArea
                placeholder={'Area do imóvel...'}
                value={data.area}
                onChangeText={(value) => onChange("area", value)}
              />
              <Text style={styles.label}>Pessoas</Text>
              <InputArea
                placeholder={'Quantidade de pessoas...'}
                value={data.place}
                onChangeText={(value) => onChange("place", value)}
              />
              <Text style={styles.label}>Animal</Text>
              <InputArea
                placeholder={'Pode conter animal?'}
                value={data.animal}
                onChangeText={(value) => onChange("animal", value)}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            label="Imagens"
            nextBtnText={'Próximo'}
            previousBtnText={'Anterior'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
          >
            <View style={styles.containerInput}>
              <ImagePickerFunction onPick={(image) => onChange("images", image)} />
            </View>
          </ProgressStep>

          <ProgressStep
            label="Preço"
            previousBtnText={'Anterior'}
            finishBtnText={'Finalizar'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
            onSubmit={() => add()}
          >
            <View style={styles.containerInput}>
              <Text style={styles.label}>Preço</Text>
              <InputArea
                placeholder={'Preço do imóvel...'}
                value={data.price}
                onChangeText={(value) => onChange("price", value)}
              />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["platinum"],
/*     justifyContent: 'center',
    alignItems: 'center', */
    padding: 30,
  },

  containerInput: {
    marginBottom: 20,
  },

  header: {
    marginTop: 25,
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

})