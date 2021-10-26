import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { ImagePickerFunction, Button } from '../components'
import colors from '../utils/constants/colors.json'
import { FontAwesome } from 'react-native-vector-icons'
import api from '../services/api'
import { createRows } from '../utils/util'
import { useLoading } from '../contexts/loading'

export default function EditAddress() {
  const navigation = useNavigation()
  const { startLoading, stopLoading } = useLoading()
  const route = useRoute()
  const item = route.params?.item

  const [data, setData] = useState({
    images: []
  })

  const onChangeImages = image => {
    setData({
      ...data,
      images: [...data.images, image]
    })
  }

  const addImage = async image => {
    startLoading()

    await api
      .post(`/property/${item.id}/images`, data.images)
      .then(res => {
        item.address = res.data
        stopLoading()
        navigation.navigate('PropertyDetail', { item })
      })
      .catch(err => {
        stopLoading()
        console.error(err)
      })
  }

  return (
    <View style={styles.containerInput}>
      <Text style={styles.message}>
        Selecione algumas imagens do seu imóvel para deixa-lo mais apresentável
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
                    <FontAwesome name="plus" color={colors.blue} size={20} />
                  </View>
                </ImagePickerFunction>
              )
            }

            return <Image source={{ uri: item.uri }} style={styles.image} />
          }}
        />
        <Button btnText={'Salvar'} onPress={() => addImage(data)} />
      </SafeAreaView>
    </View>
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
