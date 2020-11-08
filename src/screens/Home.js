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
import Icon from '@expo/vector-icons/FontAwesome5'
import { ImovelCard } from '../components'
import api from '../services/api'
import { useAuth } from '../contexts/auth'

import colors from '../constants/colors.json'

export default function Home() {
  const navigation = useNavigation()
  const { signed } = useAuth()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)

  const getProperties = async () => {
    setLoading(true)

    await api
      .get('/properties')
      .then(res => {
        setProperties(res.data)
      })
      .catch(err => {
        console.error(err)
      })

    setLoading(false)
  }

  const onChangeFavorite = (item, favorite) => {
    // const newProperties = properties.map(property => {
    //   if (property.id === item.id) {
    //     return { ...property, favorite }
    //   }else{
    //     return property
    //   }
    // })
    // setProperties(newProperties)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
      key: 'Favoritos'
    })
  }

  useEffect(() => {
    getProperties()
    console.log(properties)
  }, [signed])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <View style={styles.headerTitle}>
        <Text numberOfLiner={2} style={styles.title}>
          Encontre o imóvel ideal para você!
        </Text>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/house-agreement-blue.png')}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={{ padding: 5 }}
          placeholder="Pesquise por localidade..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={{ alignSelf: 'center' }}>
          <Icon name="search" size={16} color={colors.blue} />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={properties}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={() => getProperties()}
          refreshing={loading}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('PropertyDetail', { item })}
              >
                <View>
                  <ImovelCard
                    item={item}
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
    backgroundColor: colors.platinum,
    paddingVertical: 10,
    paddingHorizontal: 30
  },

  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },

  title: {
    width: 220,
    fontSize: 26,
    fontWeight: '600',
    color: colors.yellow,
    textAlign: 'left'
  },

  logo: {
    height: 65,
    width: 65,
  },

  inputContainer: {
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 2,
  },

})
