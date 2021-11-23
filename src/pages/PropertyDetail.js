/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import { SwiperImage, Button, OwnerInfoModal } from '../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { formatCurrency } from '../utils/util'
import { useAuth } from '../contexts/auth'
import { useLoading } from '../contexts/loading'
import { showMessage } from 'react-native-flash-message'
import MapView from 'react-native-maps'
import api from '../services/api'

import colors from '../utils/constants/colors.json'

export default function PropertyDetail() {
  const navigation = useNavigation()
  const route = useRoute()
  const { signed } = useAuth()
  const { startLoading, stopLoading } = useLoading()

  const [openModal, setOpenModal] = useState(false)
  const [property, setProperty] = useState({
    address: {},
    images: [],
    owner: {}
  })

  const goToScheduleVisitPage = () => {
    if (signed) {
      navigation.navigate('ScheduleVisit', route.params)
    } else {
      navigation.navigate('SignIn')
    }
  }

  const getProperty = async (property_id) => {
    startLoading()

    await api.get(`/property/${property_id}`)
      .then(res => {
        setProperty(res.data)
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

  useEffect(() => {
    if (route.params.item) {
      getProperty(route.params.item.id)
    }
  }, [route.params.item])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        bounces={false}
        scrollsToTop={true}
        showsVerticalScrollIndicator={false}
      >
        <OwnerInfoModal
          isVisible={openModal}
          toggle={() => {
            setOpenModal(false)
          }}
          dataInfos={property}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon
            name={'arrow-left'}
            size={20}
            color={colors['light-secondary']}
            iconStyle={styles.backButtonIcon}
          />
        </TouchableOpacity>

        <SwiperImage images={property.images} />

        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>
            {property.title}
          </Text>
          <Text style={styles.address}>
            {property.address.street},{' '}
            {property.neighborhood}
          </Text>
          <Text style={styles.address}>
            {property.city} -{' '}
            {property.state}
          </Text>

          <Text style={styles.label}>Sobre esse imóvel:</Text>
          <Text style={styles.descriptionInfo} numberOfLines={5}>
            {property.description}
          </Text>

          <View style={styles.iconsRow}>
            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <Icon name={'bed'} size={18} color={colors.h2} />
              </View>
              <Text style={styles.iconsLabel}>
                {property.bedrooms} quarto(s)
              </Text>
            </View>

            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <Icon name={'bath'} size={20} color={colors.h2} />
              </View>
              <Text style={styles.iconsLabel}>
                {property.bathrooms} banheiro(s)
              </Text>
            </View>
          </View>

          <View style={styles.iconsRow}>
            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <Icon name={'ruler-horizontal'} size={18} color={colors.h2} />
              </View>
              <Text style={styles.iconsLabel}>
                {property.area} m²
              </Text>
            </View>

            {/* <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <Icon name={'car'} size={19} color={colors.h2} />
              </View>
              <Text style={styles.iconsLabel}>
                {property.garage} vaga(s)
              </Text>
            </View> */}

            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <Icon name={'dog'} size={19} color={colors.h2} />
              </View>
              <Text style={styles.iconsLabel}>
                {property.animal ? 'Aceita pet' : 'Não aceita pet'}
              </Text>
            </View>
          </View>

          {property.address?.latitude &&
            property.address?.longitude && (
              <MapView
                initialRegion={{
                  latitude: parseFloat(property.address.latitude),
                  longitude: parseFloat(property.address.longitude),
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.0038
                }}
                style={styles.mapView}
                rotateEnabled={false}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: parseFloat(property.address.latitude),
                    longitude: parseFloat(property.address.longitude)
                  }}
                />
              </MapView>
          )}

          <View style={styles.footer}>
            <View style={styles.price}>
              <Text style={styles.label}>Venda:</Text>
              <Text style={styles.priceInfo} numberOfLines={5}>
                {formatCurrency(property.price)}
              </Text>
            </View>

            <Button btnText="Agendar visita" onPress={goToScheduleVisitPage} />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => setOpenModal(true)}
            >
              <Icon name={'info-circle'} size={16} color={colors.h2} />
              <Text style={styles.btnText}>
                Informações sobre o proprietário
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    borderTopLeftRadius: 28,
    marginTop: -22,
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

  mapView: {
    marginTop: 20,
    height: 200
  },

  iconsRow: {
    paddingHorizontal: '5%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 140
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

  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  },

  btnText: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: colors.h1
  },

  backButton: {
    position: 'absolute',
    left: 20,
    top: 15,
    zIndex: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
})
