import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Swiper from 'react-native-swiper';

import colors from '../constants/colors.json'

export default function SwiperImage({listTest}) {
  return (
    <Swiper
      style={styles.swiperContainer}
      dot={<View style={styles.swipeDot} />}
      activeDot={<View style={styles.swipeActiveDot} />}
      paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
      autoplay={false}      
    >
      {listTest.image.map((item) => (
        <View style={styles.swipeItem} key={item.id}>
          <Image style={styles.swipeImage} resizeMode="cover" source={item.img} />
        </View>
      ))}
    </Swiper>
  )
}

const styles = StyleSheet.create({
  swiperContainer:{
    height: 250,
  },

  swipeItem: {
    flex: 1,
    backgroundColor: colors['blue']
  },

  swipeImage: {
    width: '100%',
    height: 250,
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