import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import ImovelCard from '../components/ImovelCard'
import colors from '../constants/colors.json'

export default function Home({ navigation }) {

  listTest = {
    names: [
      { 'id': 1, 'address': 'Rua Doutor Teodoro, Centro - São Paulo' },
      { 'id': 2, 'address': 'Rua Portugal, Bela Vista - Belo Horizonte' },
      { 'id': 3, 'address': 'Rua Paula Ney, Vila Mariana - São Paulo' },
      { 'id': 4, 'address': 'Rua Doutor Teodoro, Jardim Europa - São Paulo' },
      { 'id': 5, 'address': 'Rua Doutor Teodoro, Jardim Aeroporto - Alfenas' },
    ]
  }
  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}
      >
        <View style={styles.headerTitle}>
          <Text numberOfLiner={2} style={styles.title} >Encontre o imóvel ideal para você!</Text>
          <Image style={styles.logo} resizeMode="cover" source={require('../../assets/img/house_agreement.png')} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Pesquise por localidade..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.inputButton}>
            <FontAwesome5
              name="search"
              size={16}
              color={colors["blue"]}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          scrollsToTop={true}
          showsVerticalScrollIndicator={false}
        >
          {listTest.names.map((item, index) => (
            <View key={item.id} style={styles.cardsContainer}>
              <ImovelCard address={item.address} navigation={navigation} />
            </View>
          ))}
        </ScrollView>

      </KeyboardAvoidingView>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["platinum"],
    paddingVertical: 10,
    paddingHorizontal: 30,
  },

  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 5,
  },

  title: {
    width: 220,
    fontSize: 26,
    fontWeight: "600",
    color: colors['yellow'],
    textAlign: 'left'
  },

  logo: {
    height: 60,
    width: 60,
  },

  inputContainer: {
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    height: 46,
    borderWidth: 1,
    borderColor: colors["blue"],
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: 'space-between',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },

  inputText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  inputButton: {
    alignSelf: 'center',
  },

  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 15,
  },

})