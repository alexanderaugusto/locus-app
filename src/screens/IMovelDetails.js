import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView, StyleSheet, TouchableOpacity, Text, Modal, Alert, TouchableHighlight } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import exemplo_house1 from '../../assets/img/exemplo_house1.jpg'
import exemplo_house2 from '../../assets/img/exemplo_house2.jpg'

import colors from '../constants/colors.json'
import SwiperImage from '../components/SwiperImage'
import ModalContact from '../components/Modal'

export default function IMovelDetails({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)

  listTest = {
    image: [
      { 'id': 1, 'img': exemplo_house1 },
      { 'id': 2, 'img': exemplo_house2 },
      { 'id': 3, 'img': exemplo_house1 },
      { 'id': 4, 'img': exemplo_house2 },
      { 'id': 3, 'img': exemplo_house1 },
      { 'id': 4, 'img': exemplo_house2 },
    ]
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}
        bounces={false}
        scrollsToTop={true}
        showsVerticalScrollIndicator={false}
      >

        <SwiperImage listTest={listTest} />

        <View style={styles.body} >
          <Text style={styles.title} numberOfLines={2}>Casa para alugar com 2 quartos</Text>
          <Text style={styles.address}>Rua Conselheiro Furtado, Liberdade</Text>
          <Text style={styles.address}>São Paulo - SP </Text>

          <Text style={styles.label} >Sobre esse imóvel:</Text>
          <Text style={styles.descriptionInfo} numberOfLines={5} >Aconchegante casa para alugar com 3 quartos e 1 banheiro no total. É bem localizado, próximo a pontos de interesse de Liberdade, tais como Estação Liberdade, Estação Liberdade, Estação Sé, etc.</Text>

          <View style={styles.iconsRow}>

            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name={'bed'} size={18} color={colors['blue']} />
              </View>
              <Text style={styles.iconsLabel}>3 quartos</Text>
            </View>

            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name={'bath'} size={20} color={colors['blue']} />
              </View>
              <Text style={styles.iconsLabel}>1 banheiro</Text>
            </View>

          </View>

          <View style={styles.iconsRow}>

            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name={'ruler-horizontal'} size={18} color={colors['blue']} />
              </View>
              <Text style={styles.iconsLabel}>39 m²</Text>
            </View>

            <View style={styles.iconsInfo}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name={'dog'} size={19} color={colors['blue']} />
              </View>
              <Text style={styles.iconsLabel}>Aceita pet</Text>
            </View>

          </View>

          <View style={styles.footer}>
            <View style={styles.price}>
              <Text style={styles.label} >Aluguel:</Text>
              <Text style={styles.priceInfo} numberOfLines={5}> R$: 2.143,00 </Text>
            </View>

            <TouchableOpacity style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.buttonText}>Entrar em contato</Text>
            </TouchableOpacity>

          </View>

        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <FontAwesome5 name={'arrow-left'} size={20} color={colors['yellow']} />
        </TouchableOpacity>

        <ModalContact modalVisible={modalVisible} setModalVisible={setModalVisible} />

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["blue"],
  },

  scroll: {
    flex: 1,
  },

  body: {
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 50,
    marginTop: -40,
    minHeight: 450,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors['yellow'],
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'right'
  },

  address: {
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#b2b2b2',
    textAlign: 'right'
  },

  label: {
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: '600',
    color: colors['blue'],
  },

  descriptionInfo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999',
    textAlign: 'justify',
  },

  iconsRow: {
    width: '80%',
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors['blue'],
    backgroundColor: '#FFF',
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginRight: 8,
  },

  iconsInfo: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 20,
  },

  price: {
    justifyContent: "center",
    alignItems: "center",
  },

  priceInfo: {
    paddingLeft: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#999',
  },

  button: {
    height: 35,
    width: 160,
    backgroundColor: colors['yellow'],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  buttonText: {
    color: colors['blue'],
    fontWeight: 'bold',
    fontSize: 16,
  },

  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 5,
  },  

})