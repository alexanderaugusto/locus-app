import React, { useState } from 'react'
import {
  Platform,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import {
  InputArea,
  ImagePickerFunction,
  InputSelect,
  Loader
} from '../components'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { useNavigation } from '@react-navigation/native'
import { createRows } from '../utils/util'
import api from '../services/api'
import { FontAwesome } from 'react-native-vector-icons'
import Icon from '@expo/vector-icons/FontAwesome5'

import colors from '../constants/colors.json'
import states from '../constants/states.json'
import types from '../constants/types.json'

export default function AddProperty() {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
    street: '',
    neighborhood: '',
    city: '',
    state: 'MG',
    country: 'Brasil',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    place: '',
    animal: true,
    type: 'Casa',
    images: []
  })
  const [activeStep, setActiveStep] = useState(0)

  const onChange = (type, value) => setData({ ...data, [type]: value })

  const onChangeImages = image => {
    setData({
      ...data,
      images: [...data.images, image]
    })
  }

  const addProperty = async () => {
    setLoading(true)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('street', data.street)
    formData.append('neighborhood', data.neighborhood)
    formData.append('city', data.city)
    formData.append('state', data.state)
    formData.append('country', data.country)
    formData.append('price', parseFloat(data.price.replace(',', '.')))
    formData.append('bedrooms', parseInt(data.bedrooms, 10))
    formData.append('bathrooms', parseInt(data.bathrooms, 10))
    formData.append('area', parseFloat(data.area.replace(',', '.')))
    formData.append('place', parseInt(data.place, 10))
    formData.append('animal', data.animal)
    formData.append('type', data.type)

    data.images.forEach(image => {
      formData.append('files', image)
    })

    api
      .post('/user/property', formData, config)
      .then(res => {
        navigation.navigate('Anúnciar', { reload: true })
      })
      .catch(err => {
        console.error(err)
      })

    setLoading(false)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Loader isLoading={loading} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name={'arrow-left'} size={20} color={colors.yellow} />
      </TouchableOpacity>

      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
        <View style={styles.header}>
          <Text style={styles.headerMessage}>Vamos cadastrar seu imóvel</Text>
        </View>

        <ProgressSteps
          activeStep={activeStep}
          activeStepIconBorderColor={colors.yellow}
          completedProgressBarColor={colors.yellow}
          activeLabelColor={colors.yellow}
          completedLabelColor={colors.yellow}
          completedStepIconColor={colors.yellow}
          completedCheckColor={colors.platinum}
        >
          <ProgressStep
            key={0}
            testID="next-button-1"
            nextBtnText={'Próximo'}
            nextBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            scrollable={false}
            onNext={() => setActiveStep(activeStep + 1)}
          >
            <View style={styles.containerInput}>
              <Text style={styles.message}>
                Primeiramente, nos diga as informações que você gostaria de
                conter no seu anúncio
              </Text>
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
            </View>
          </ProgressStep>

          <ProgressStep
            key={1}
            testID="next-button-2"
            nextBtnText={'Próximo'}
            previousBtnText={'Anterior'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
            onNext={() => setActiveStep(activeStep + 1)}
            onPrevious={() => setActiveStep(activeStep - 1)}
          >
            <View style={styles.containerInput}>
              <Text style={styles.message}>
                Onde seu imóvel está localizado?
              </Text>
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
              <Text style={styles.label}>Cidade</Text>
              <InputArea
                testID="city-input"
                placeholder={'Cidade do imóvel...'}
                value={data.city}
                onChangeText={value => onChange('city', value)}
              />
              <Text style={styles.label}>Estado</Text>
              <InputSelect
                testID="state-input"
                items={states}
                selectedValue={data.state}
                onChange={item => onChange('state', item.value)}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            key={2}
            testID="next-button-3"
            nextBtnText={'Próximo'}
            previousBtnText={'Anterior'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
            onNext={() => setActiveStep(activeStep + 1)}
            onPrevious={() => setActiveStep(activeStep - 1)}
          >
            <View style={styles.containerInput}>
              <Text style={styles.message}>
                Precisamos de mais algumas informações do seu imóvel
              </Text>
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
              <Text style={styles.label}>Area (m3)</Text>
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
            </View>
          </ProgressStep>

          <ProgressStep
            key={3}
            testID="next-button-4"
            nextBtnText={'Próximo'}
            previousBtnText={'Anterior'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
            onNext={() => setActiveStep(activeStep + 1)}
            onPrevious={() => setActiveStep(activeStep - 1)}
          >
            <View style={styles.containerInput}>
              <Text style={styles.message}>
                Selecione algumas imagens do seu imóvel para deixa-lo mais
                apresentável
              </Text>
              <SafeAreaView style={styles.imageContainer}>
                <FlatList
                  data={createRows([...data.images, { imagePicker: true }], 2)}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  scrollEnabled={false}
                  renderItem={({ item }) => {
                    if (item.empty) {
                      return (
                        <View
                          style={{
                            ...styles.image,
                            backgroundColor: 'transparent'
                          }}
                        />
                      )
                    }

                    if (item.imagePicker) {
                      return (
                        <ImagePickerFunction
                          style={styles.image}
                          onChange={image => onChangeImages(image)}
                        >
                          <View style={styles.addIcon}>
                            <FontAwesome
                              name="plus"
                              color={colors['blue-secondary']}
                              size={20}
                            />
                          </View>
                        </ImagePickerFunction>
                      )
                    }

                    return (
                      <Image source={{ uri: item.uri }} style={styles.image} />
                    )
                  }}
                />
              </SafeAreaView>
            </View>
          </ProgressStep>

          <ProgressStep
            key={4}
            testID="submit-button"
            previousBtnText={'Anterior'}
            finishBtnText={'Finalizar'}
            nextBtnStyle={styles.button}
            previousBtnStyle={styles.button}
            nextBtnTextStyle={styles.buttonText}
            previousBtnTextStyle={styles.buttonText}
            scrollable={false}
            onSubmit={() => addProperty()}
            onPrevious={() => setActiveStep(activeStep - 1)}
          >
            <View style={styles.containerInput}>
              <Text style={styles.message}>
                Vamos definir um preço para seu imóvel
              </Text>
              <Text style={styles.label}>Preço</Text>
              <InputArea
                testID="price-input"
                keyboardType={'number-pad'}
                label="R$"
                placeholder={'0,00'}
                value={data.price}
                onChangeText={value => onChange('price', value)}
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
    backgroundColor: colors.platinum,
    padding: 30
  },

  containerInput: {
    marginBottom: 20
  },

  textArea: {
    height: 100,
    justifyContent: 'flex-start'
  },

  header: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerMessage: {
    width: 300,
    fontSize: 23,
    fontWeight: '600',
    color: colors.blue,
    textAlign: 'left'
  },

  message: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '500',
    color: '#999',
    textAlign: 'center',
    marginBottom: 10
  },

  label: {
    marginTop: 15,
    marginBottom: -10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: colors.blue
  },

  button: {
    height: 35,
    width: 90,
    backgroundColor: colors.yellow,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 16
  },

  imageContainer: {
    flex: 1,
    marginTop: 10
  },

  image: {
    flexGrow: 1,
    flexBasis: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'center',
    width: '100%',
    height: 170
  },

  addIcon: {
    alignSelf: 'center'
  }
})
