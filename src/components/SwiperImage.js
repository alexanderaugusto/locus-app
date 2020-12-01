import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import Swiper from 'react-native-swiper'
import { STORAGE_URL } from '../services/api'

import colors from '../constants/colors.json'

export default function SwiperImage({ images }) {
  if (images.length) {
    return (
      <Swiper
        testID={'swiperImage-swiper'}
        style={styles.swiperContainer}
        dot={<View style={styles.swipeDot} />}
        activeDot={<View style={styles.swipeActiveDot} />}
        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
        autoplay={true}
      >
        {images.map(item => (
          <View style={styles.swipeItem} key={item.id}>
            <Image
              style={styles.swipeImage}
              resizeMode="cover"
              source={{ uri: `${STORAGE_URL}/property/${item.path}` }}
            />
          </View>
        ))}
      </Swiper>
    )
  }

  return (
    <Text style={styles.swiperText}>
      Nenhum imagem disponibilizada para este imóvel!
    </Text>
  )
}

const styles = StyleSheet.create({
  swiperContainer: {
    height: 280
  },

  swiperText: {
    height: 280,
    paddingTop: 110,
    paddingHorizontal: 30,
    fontSize: 20,
    fontWeight: '700',
    color: colors.h1,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },

  swipeItem: {
    flex: 1,
    backgroundColor: colors.blue
  },

  swipeImage: {
    width: '100%',
    height: 280
  },

  swipeDot: {
    width: 10,
    height: 10,
    backgroundColor: colors.h2,
    borderRadius: 5,
    margin: 3
  },

  swipeActiveDot: {
    width: 10,
    height: 10,
    backgroundColor: colors.blue,
    borderRadius: 5,
    margin: 3
  }
})
