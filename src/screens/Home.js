import React, { useState, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

import ImovelCard from '../components/ImovelCard'
import colors from '../constants/colors.json'

export default function Home() {
  const navigation = useNavigation()

  const [properties, setProperties] = useState([])

  const getProperties = async () => {
    const token = await AsyncStorage.getItem("user-token")

    const config = {
      headers: {
        "Authorization": "Bearer " + token
      }
    }

    api.get("/properties", config)
      .then((res) => {
        setProperties(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const onChangeFavorite = (item, favorite) => {
    const newProperties = properties.map(property => {
      if (property.id === item.id) {
        return { ...property, favorite }
      }else{
        return property
      }
    })
    setProperties(newProperties)
  }

  useEffect(() => {
    getProperties()
  }, [])


  return (
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

      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={properties}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('IMovelDetails', { item })}
              >
                <View>
                  <ImovelCard item={item}
                    favorite={item.favorite}
                    onChangeFavorite={onChangeFavorite}
                  />
                </View>
              </TouchableWithoutFeedback>
            )
          }}
        />
      </SafeAreaView>

    </KeyboardAvoidingView>
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

  listContainer: {
    flex: 1
  }
})