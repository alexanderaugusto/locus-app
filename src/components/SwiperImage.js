import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Swiper from 'react-native-swiper';
import { STORAGE_URL } from '../services/api'

import colors from '../constants/colors.json'

export default function SwiperImage({ images }) {
  return (
    <Swiper
      style={styles.swiperContainer}
      dot={<View style={styles.swipeDot} />}
      activeDot={<View style={styles.swipeActiveDot} />}
      paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
      autoplay={false}
    >
      {images.map((item) => (
        <View style={styles.swipeItem} key={item.id}>
          <Image style={styles.swipeImage} resizeMode="cover"
            source={{ uri: `${STORAGE_URL}/property/${item.path}` }} />
        </View>
      ))}
    </Swiper>
  )
}

const styles = StyleSheet.create({
  swiperContainer: {
    height: 280, 
  },

  swipeItem: {
    flex: 1,
    backgroundColor: colors['blue']
  },

  swipeImage: {
    width: '100%',
    height: 280,
  },

  swipeDot: {
    width: 10,
    height: 10,
    backgroundColor: '#b2b2b2',
    borderRadius: 5,
    margin: 3,
  },

  swipeActiveDot: {
    width: 10,
    height: 10,
    backgroundColor: colors['yellow'],
    borderRadius: 5,
    margin: 3,
  },
})