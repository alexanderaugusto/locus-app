import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ImagePickerFunction, Button } from '../components'
import colors from '../utils/constants/colors.json'
import api, { STORAGE_URL } from '../services/api'
import { createRows } from '../utils/util'
import { useLoading } from '../contexts/loading'
import { showMessage } from 'react-native-flash-message'

import { FontAwesome } from 'react-native-vector-icons'
import Icon from '@expo/vector-icons/FontAwesome5'
export default function EditAddress() {
  const navigation = useNavigation()
  const { startLoading, stopLoading } = useLoading()
  const route = useRoute()
  const routeItem = route.params?.item

  const [removeIds, setRemoveIds] = useState([])

  const [data, setData] = useState({
    images: routeItem.images
  })

  const onChangeImages = image => {
    setData({
      ...data,
      images: [...data.images, image]
    })
  }

  const addImageToRemove = image => {
    if ('path' in image) {
      setRemoveIds([...removeIds, image.id])
    }

    const index = data.images.indexOf(image)
    data.images.splice(index, 1)
    setData({
      images: data.images
    })
  }

  const removeImages = async () => {
    startLoading()

    if (removeIds.length <= 0) {
      return
    }

    await api
      .delete(`/property/${routeItem.id}/image`, {
        data: { images_ids: removeIds }
      })
      .then(res => {})
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
  }

  const addImages = async () => {
    startLoading()

    const formData = new FormData()

    data.images.forEach(image => {
      if ('uri' in image) {
        formData.append('files', image)
      }
    })

    const reload = true

    if (formData._parts.length <= 0) {
      navigation.navigate('Anunciar', { reload })
      stopLoading()
      return
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    await api
      .post(`/property/${routeItem.id}/images`, formData, config)
      .then(() => {
        showMessage({
          message: 'Sucesso',
          description: 'As imagens foram atualizados com sucesso',
          type: 'success',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })

        navigation.navigate('Anunciar', { reload })
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

    stopLoading()
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView testID="edit-property" style={styles.container}>
        <View style={styles.containerInput}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => navigation.goBack()}
            >
              <Icon name={'arrow-left'} size={20} color={colors.h1} />
            </TouchableOpacity>
            <Text numberOfLiner={2} style={styles.headerTitle}>
              Editar Imgens
            </Text>
          </View>

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

                let url = item.uri
                if ('path' in item) {
                  url = `${STORAGE_URL}/property/${item.path}`
                }

                return (
                  <View style={styles.imageCard}>
                    <Image source={{ uri: url }} style={styles.image} />
                    <View style={styles.favoriteIcon}>
                      <TouchableOpacity
                        testID="btn-favorite"
                        style={styles.button}
                        onPress={() => addImageToRemove(item)}
                      >
                        <Icon name="minus" size={15} color={colors.blue} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }}
            />
            <Button
              btnText={'Salvar'}
              onPress={() => {
                removeImages()
                addImages()
              }}
            />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    justifyContent: 'center',
    height: 170
  },

  imageCard: {
    flexGrow: 1,
    flexBasis: 0
  },

  addIcon: {
    alignSelf: 'center'
  },

  favoriteIcon: {
    margin: 10,
    alignSelf: 'flex-end',
    position: 'absolute'
  },

  button: {
    width: 27,
    height: 27,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors['light-primary'],
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    }
  }
})
