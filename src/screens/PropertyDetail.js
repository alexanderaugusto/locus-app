import React from 'react'
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import { SwiperImage } from '../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { formatCurrency } from '../utils/util'
import { useAuth } from '../contexts/auth'

import colors from '../constants/colors.json'

export default function PropertyDetail() {
  const navigation = useNavigation()
  const route = useRoute()
  const { signed } = useAuth()

  const goToContact = () => {
    if (signed) {
      navigation.navigate('Contact', route.params)
    } else {
      navigation.navigate('SignIn')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        bounces={false}
        scrollsToTop={true}
        showsVerticalScrollIndicator={false}
      >
        <SwiperImage images={route.params ? route.params.item.images : []} />

        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>
            {route.params?.item.title}
          </Text>
          <Text style={styles.address}>
            {route.params?.item.street}, {route.params?.item.neighborhood}
          </Text>
          <Text style={styles.address}>
            {route.params?.item.city} - {route.params?.item.state}
          </Text>

          <Text style={styles.label}>Sobre esse imóvel:</Text>
          <Text style={styles.descriptionInfo} numberOfLines={5}>
            {route.params?.item.description}
          </Text>

          <View style={styles.iconsRow}>
            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <Icon name={'bed'} size={18} color={colors.h2} />
              </View>
              <Text style={styles.iconsLabel}>
                {route.params?.item.bedrooms} quartos
              </Text>
            </View>

            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <Icon name={'bath'} size={20} color={colors.h2} />
              </View>
              <Text style={styles.iconsLabel}>
                {route.params?.item.bathrooms} banheiro
              </Text>
            </View>
          </View>

          <View style={styles.iconsRow}>
            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <Icon name={'ruler-horizontal'} size={18} color={colors.h2} />
              </View>
              <Text style={styles.iconsLabel}>
                {route.params?.item.area} m²
              </Text>
            </View>

            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <Icon name={'dog'} size={19} color={colors.h2} />
              </View>
              <Text style={styles.iconsLabel}>
                {route.params?.item.animal ? 'Aceita pet' : 'Não aceita pet'}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.price}>
              <Text style={styles.label}>Aluguel:</Text>
              <Text style={styles.priceInfo} numberOfLines={5}>
                {formatCurrency(route.params?.item.price)}
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={goToContact}>
              <Text style={styles.buttonText}>Entrar em contato</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name={'arrow-left'} size={20} color={colors.h1} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue
  },

  scroll: {
    flex: 1
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors['light-secondary'],
    borderTopLeftRadius: 50,
    marginTop: -15,
    height: '100%'
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.h1,
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'right'
  },

  address: {
    lineHeight: 20,
    fontSize: 17,
    fontWeight: '500',
    color: colors.p,
    textAlign: 'right'
  },

  label: {
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: '600',
    color: colors.h1
  },

  descriptionInfo: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',
    color: colors.p,
    textAlign: 'justify',
    marginBottom: 10
  },

  iconsRow: {
    width: '80%',
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between'
  },

  iconContainer: {
    width: 45,
    height: 45,
    marginRight: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.h2,
    backgroundColor: colors['light-secondary'],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: colors.h1,
    shadowOpacity: 0.05,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },

  iconsInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  iconsLabel: {
    color: colors.h2
  },

  footer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20
  },

  price: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  priceInfo: {
    paddingLeft: 8,
    fontSize: 15,
    fontWeight: '500',
    color: colors.p
  },

  button: {
    height: 35,
    width: 160,
    backgroundColor: colors.blue,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },

  buttonText: {
    color: colors['light-secondary'],
    fontWeight: 'bold',
    fontSize: 16
  },

  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 5
  }
})
