/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import { formatCurrency } from '../utils/util'
import api, { STORAGE_URL } from '../services/api'
import { useAuth } from '../contexts/auth'
import { showMessage } from 'react-native-flash-message'

import colors from '../utils/constants/colors.json'

const CARD_WIDTH = Dimensions.get('window').width * 0.84
const CARD_HEIGHT = Dimensions.get('window').height * 0.27

export default function PropertyCard({ item, favorite, onChangeFavorite }) {
  const navigation = useNavigation()
  const { signed } = useAuth()
  const [favoriteToggle, setFavoriteToggle] = useState(favorite)

  const addFavorite = async () => {
    setFavoriteToggle(true)
    api
      .put(`/property/${item.id}/favorite`, null)
      .then(res => {
        if (onChangeFavorite) {
          onChangeFavorite()
        }
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

  const removeFavorite = async () => {
    setFavoriteToggle(false)
    api
      .delete(`/property/${item.id}/favorite`)
      .then(res => {
        if (onChangeFavorite) {
          onChangeFavorite()
        }
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

  return (
    <View style={[styles.card]}>
      <ScrollView
        style={styles.scrollImages}
        pagingEnabled
        decelerationRate={0}
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={true}
        horizontal={true}
      >
        {item.images.map(image => (
          <View key={image.id} onStartShouldSetResponder={() => true}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('PropertyDetail', { item })}
            >
              <Image
                style={styles.images}
                resizeMode="cover"
                source={{ uri: `${STORAGE_URL}/property/${image.path}` }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.favoriteIcon}>
        <TouchableOpacity
          testID="btn-favorite"
          style={styles.button}
          onPress={() =>
            signed
              ? favorite
                  ? removeFavorite()
                  : addFavorite()
              : navigation.navigate('SignIn')
          }
        >
          <Icon
            name="heart"
            solid={favoriteToggle}
            size={18}
            color={favoriteToggle ? colors.danger : colors.blue}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoHeader}>
          <Text style={styles.price}>Venda {formatCurrency(item.price)}</Text>
        </View>

        <Text style={styles.address} numberOfLines={3}>
          {`${item.address.street}, ${item.address.neighborhood} - ${item.address.city} (${item.address.state})`}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.h1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors['light-secondary'],
    marginVertical: 10
  },

  scrollImages: {
    height: 180,
    maxWidth: '100%'
  },

  images: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT
  },

  infoContainer: {
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderTopColor: colors.p,
    borderTopWidth: 2
  },

  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  price: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.h1
  },

  address: {
    paddingTop: 5,
    fontSize: 14,
    fontWeight: '500',
    color: colors.p
  },

  favoriteIcon: {
    margin: 10,
    alignSelf: 'flex-end',
    position: 'absolute'
  },

  button: {
    width: 40,
    height: 40,
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
  },

  buttonInfo: {
    height: 30,
    width: 80,
    backgroundColor: colors.h1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },

  buttonInfoText: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 14
  }
})
