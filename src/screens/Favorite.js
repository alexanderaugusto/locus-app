import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import api from '../services/api'
import { ImovelCard } from '../components'
import { useAuth } from '../contexts/auth'

import colors from '../constants/colors.json'

export default function Favorite() {
  const navigation = useNavigation()
  const { signed } = useAuth()

  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  const getFavorites = async () => {
    setLoading(true)

    await api
      .get('/user/favorites')
      .then(res => {
        setFavorites(res.data)
      })
      .catch(err => {
        console.error(err)
      })

    setLoading(false)
  }

  const onChangeFavorite = item => {
    // const newProperties = []
    // favorites.forEach(property => {
    //   if (property.id !== item.id) {
    //     newProperties.push(property)
    //   }
    // })
    // setFavorites(newProperties)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Favoritos' }],
      key: 'Home'
    })
  }

  useEffect(() => {
    if (signed) {
      getFavorites()
    }
  }, [signed])

  if (!signed || !favorites.length) {
    return (
      <KeyboardAvoidingView
        testID="empty-message"
        style={styles.emptyContainer}
      >
        <Icon name="heart-broken" size={120} color={colors.blue} />

        <View>
          <Text style={styles.emptyTitle}>
            Você ainda não possui imóveis favoritos
          </Text>
          <Text style={styles.emptyDescription}>
            Vá para tela principal para visualizar os imóveis e favoritá-los!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.emptyButtonText}>Tela inicial</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  return (
    <KeyboardAvoidingView testID="favorites" style={styles.container}>
      <Text numberOfLiner={2} style={styles.title}>
        Favoritos
      </Text>

      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={() => getFavorites()}
          refreshing={loading}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('PropertyDetail', { item })}
              >
                <View>
                  <ImovelCard
                    item={item}
                    favorite={true}
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
  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '25%'
  },

  emptyTitle: {
    color: '#333740',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  emptyDescription: {
    color: '#AAADB3',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15
  },

  emptyButton: {
    height: 40,
    width: 130,
    backgroundColor: colors['blue-secondary'],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10
  },

  emptyButtonText: {
    color: '#FFFFFF'
  },

  container: {
    flex: 1,
    backgroundColor: colors.platinum,
    paddingVertical: 10,
    paddingHorizontal: 30
  },

  title: {
    margin: 10,
    fontSize: 28,
    fontWeight: '600',
    color: colors.yellow,
    alignSelf: 'center'
  },

  listContainer: {
    flex: 1
  }
})
