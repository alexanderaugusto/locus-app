import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import { formatCurrency } from '../utils/util'
import api, { STORAGE_URL } from '../services/api'

import colors from '../constants/colors.json'

const CARD_WIDTH = Dimensions.get('window').width * 0.84
const CARD_HEIGHT = Dimensions.get('window').height * 0.27

export default function ImovelCard({ item, favorite, onChangeFavorite }) {
  const navigation = useNavigation()

  const addFavorite = async () => {
    const token = await AsyncStorage.getItem("user-token")
    if (!token) {
      navigation.navigate("SignIn", { backPath: "Home" })
      return
    }

    const config = {
      headers: {
        "Authorization": "Bearer " + token
      }
    }

    api.put(`/user/favorite/${item.id}`, null, config)
      .then((res) => {
        if (onChangeFavorite)
          onChangeFavorite(item, true)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const removeFavorite = async () => {
    const token = await AsyncStorage.getItem("user-token")
    if (!token) {
      navigation.navigate("SignIn", { backPath: "Home" })
      return
    }

    const config = {
      headers: {
        "Authorization": "Bearer " + token
      }
    }

    api.delete(`/user/favorite/${item.id}`, config)
      .then((res) => {
        if (onChangeFavorite)
          onChangeFavorite(item, false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <View style={[styles.card]}>

      <ScrollView
        style={styles.scrollImages}
        pagingEnabled
        decelerationRate={0}
        snapToInterval={CARD_WIDTH}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={true}
        horizontal={true}
      >
        {item.images.map((image) => (
          <View key={image.id} onStartShouldSetResponder={() => true}>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('PropertyDetail', { item })}>
              <Image style={styles.images} resizeMode="cover"
                source={{ uri: `${STORAGE_URL}/property/${image.path}` }} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.favoriteIcon}>
        <TouchableOpacity style={styles.button} onPress={() => favorite ? removeFavorite() : addFavorite()}>
          {favorite ?
            <Icon name='heart' solid={true} size={18} color='red' />
            :
            <Icon name='heart' solid={false} size={18} color={colors["blue-secondary"]} />
          }
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer} >
        <View style={styles.infoHeader}>
          <Text style={styles.price}>Aluguel {formatCurrency(item.price)}</Text>
        </View>

        <Text style={styles.address} numberOfLines={3}>
          {`${item.street}, ${item.neighborhood} - ${item.city} (${item.state})`}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    marginVertical: 10
  },

  scrollImages: {
    height: 180,
    maxWidth: '100%',
  },

  images: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },

  infoContainer: {
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderTopColor: '#bfbfbf',
    borderTopWidth: 2,
  },

  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#000',
  },

  address: {
    paddingTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },

  favoriteIcon: {
    margin: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
  },

  button: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors['platinum'],
    backgroundColor: '#FFF',
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },

  buttonInfo: {
    height: 30,
    width: 80,
    backgroundColor: colors['yellow'],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  buttonInfoText: {
    color: colors['blue'],
    fontWeight: 'bold',
    fontSize: 14,
  },

})