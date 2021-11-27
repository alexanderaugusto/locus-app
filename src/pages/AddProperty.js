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
  StepProgress,
  Error
} from '../components'
import { ProgressSteps } from 'react-native-progress-steps'
import { useNavigation } from '@react-navigation/native'
import {
  createRows,
  formatZipcode,
  formatCurrencyInput,
  formatCurrency
} from '../utils/util'
import api, { zipcodeAPI } from '../services/api'
import stackPositionApi from '../services/positionStackApi'
import housingPredictorApi from '../services/housingPredictorApi'
import { showMessage } from 'react-native-flash-message'

import { FontAwesome } from 'react-native-vector-icons'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useLoading } from '../contexts/loading'

import colors from '../utils/constants/colors.json'
import states from '../utils/constants/states.json'
import types from '../utils/constants/types.json'

export default function AddProperty() {
  const navigation = useNavigation()
  const { startLoading, stopLoading } = useLoading()
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    place: '',
    garage: '',
    animal: true,
    type: 'Casa',
    images: [],
    street: '',
    neighborhood: '',
    number: '',
    city: '',
    state: 'MG',
    country: 'Brasil',
    zipcode: ''
  })
  const [estimatedPrice, setEstimatedPrice] = useState('')
  const [activeStep, setActiveStep] = useState(0)

  const onChange = (type, value) => setData({ ...data, [type]: value })

  const onChangeImages = image => {
    setData({
      ...data,
      images: [...data.images, image]
    })
  }

  const addProperty = async () => {
    const propertyData = {
      title: data.title,
      description: data.description,
      price: data.price,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      area: data.area,
      place: data.place,
      garage: data.garage,
      animal: data.animal,
      type: data.type,
      address: {
        street: data.street,
        neighborhood: data.neighborhood,
        number: parseInt(data.number, 10),
        city: data.city,
        state: data.state,
        country: data.country,
        zipcode: data.zipcode
      }
    }

    startLoading()

    await api
      .post('/property', propertyData)
      .then(res => {
        if (data.images.length > 0) {
          addImages(res.data.id)
        } else {
          stopLoading()
          showMessage({
            message: 'Seu imóvel foi inserido com sucesso',
            type: 'success',
            autoHide: true,
            icon: 'auto',
            duration: 3000
          })
          navigation.navigate('Anunciar', { reload: true })
        }
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

  const addImages = async propertyId => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const formData = new FormData()

    data.images.forEach(image => {
      formData.append('files', image)
    })

    startLoading()

    await api
      .post(`/property/${propertyId}/images`, formData, config)
      .then(() => {})
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

    stopLoading()
    showMessage({
      message: 'Seu imóvel foi inserido com sucesso',
      type: 'success',
      autoHide: true,
      icon: 'auto',
      duration: 3000
    })
    navigation.navigate('Anunciar', { reload: true })
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

  const getGeolocationByAddress = async () => {
    const { street, number, neighborhood, city, state, zipcode } = data

    const config = {
      params: {
        query: `${street} ${number}, ${neighborhood}, ${city} - ${state} - ${zipcode}`
      }
    }

    startLoading()

    await stackPositionApi
      .get('/forward', config)
      .then(res => {
        setData({
          ...data,
          latitude: res.data.data[0].latitude,
          longitude: res.data.data[0].longitude
        })
      })
      .catch(err => {
        console.error(err)
      })

    setActiveStep(activeStep + 1)
    stopLoading()
  }

  const getEstimatedPropertyPrice = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    const features = [
      data.type,
      data.area,
      data.bedrooms,
      data.bathrooms,
      data.garage,
      data.latitude,
      data.longitude
    ]

    const requestData = {
      data: [features]
    }

    startLoading()

    await housingPredictorApi
      .post('/predict', requestData, config)
      .then(res => {
        setEstimatedPrice(res.data.prediction[0])
      })
      .catch(err => {
        console.error(err)
      })

    setActiveStep(activeStep + 1)
    stopLoading()
  }

  const copyEstimatedPrice = () => {
    const formatedPrice = parseFloat(estimatedPrice).toFixed(2)
    setData({
      ...data,
      price: formatCurrencyInput(formatedPrice.toString())
    })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name={'arrow-left'} size={20} color={colors.h1} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo anúncio</Text>
      </View>

      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
        <Text style={styles.advertiseMessage}>Vamos cadastrar seu imóvel</Text>

        <ProgressSteps
          activeStep={activeStep}
          activeStepIconBorderColor={colors.blue}
          completedProgressBarColor={colors.blue}
          activeLabelColor={colors.blue}
          completedLabelColor={colors.blue}
          completedStepIconColor={colors.blue}
          completedCheckColor={colors['light-secondary']}
          labelFontSize={2}
        >
          <StepProgress
            key={0}
            testID="next-button-1"
            nextBtnText={true}
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
          </StepProgress>

          <StepProgress
            key={1}
            testID="next-button-2"
            nextBtnText={true}
            previousBtnText={true}
            scrollable={false}
            onNext={() => getGeolocationByAddress()}
            onPrevious={() => setActiveStep(activeStep - 1)}
          >
            <View style={styles.containerInput}>
              <Text style={styles.message}>
                Onde seu imóvel está localizado?
              </Text>

              <Error errorMessage={errorMessage} />

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
            </View>
          </StepProgress>

          <StepProgress
            key={2}
            testID="next-button-3"
            nextBtnText={true}
            previousBtnText={true}
            scrollable={false}
            onNext={() => getEstimatedPropertyPrice()}
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
            </View>
          </StepProgress>

          <StepProgress
            key={3}
            testID="next-button-4"
            nextBtnText={true}
            previousBtnText={true}
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
                              color={colors.blue}
                              size={20}
                            />
                          </View>
                        </ImagePickerFunction>
                      )
                    }
                    console.log(item)
                    return (
                      <Image source={{ uri: item.uri }} style={styles.image} />
                    )
                  }}
                />
              </SafeAreaView>
            </View>
          </StepProgress>

          <StepProgress
            key={4}
            testID="submit-button"
            previousBtnText={true}
            finishBtnText={true}
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
                maxLength={13}
                onChangeText={value =>
                  onChange('price', formatCurrencyInput(value))
                }
              />
              {estimatedPrice && (
                <View style={styles.estimatedPriceContainer}>
                  <Text style={styles.estimatedPriceTitle}>
                    Calculamos um preço estimado para seu imóvel com base nas
                    caracteristicas informadas
                  </Text>
                  <View style={styles.estimatedPriceCopy}>
                    <Text style={styles.estimatedPrice}>
                      {formatCurrency(estimatedPrice)}
                    </Text>
                    <TouchableOpacity
                      style={styles.estimatedPriceCopyButton}
                      onPress={() => copyEstimatedPrice()}
                    >
                      <Icon
                        name={'copy'}
                        size={20}
                        color={colors.h2}
                        solid={true}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </StepProgress>
        </ProgressSteps>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['light-primary'],
    paddingHorizontal: 20
  },

  containerInput: {
    marginBottom: 20
  },

  textArea: {
    height: 130,
    justifyContent: 'flex-start'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30
  },

  goBack: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    alignSelf: 'center',
    opacity: 0.8,
    textAlign: 'center'
  },

  advertiseMessage: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    textAlign: 'center'
  },

  message: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '500',
    color: colors.h2,
    textAlign: 'center',
    marginBottom: 10
  },

  label: {
    marginTop: 15,
    marginBottom: -10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: colors.h2
  },

  imageContainer: {
    flex: 1,
    marginTop: 10
  },

  image: {
    flexGrow: 1,
    flexBasis: 0,
    backgroundColor: colors['light-secondary'],
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
  },

  estimatedPriceContainer: {
    marginTop: 20,
    flex: 1
  },

  estimatedPriceTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.h2
  },

  estimatedPriceCopy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flex: 1
  },

  estimatedPrice: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.h2
  },

  estimatedPriceCopyButton: {
    padding: 10
  }
})
