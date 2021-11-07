import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../services/api'
import { PropertyCard, Warning } from '../components'
import { useAuth } from '../contexts/auth'
import { useLoading } from '../contexts/loading'
import { useReset } from '../contexts/reset'
import { showMessage } from 'react-native-flash-message'

import colors from '../utils/constants/colors.json'

export default function Favorite() {
  const navigation = useNavigation()
  const { signed } = useAuth()
  const { startLoading, stopLoading } = useLoading()
  const { screens, resetScreen } = useReset()

  const [favorites, setFavorites] = useState([])
  const [refresh, setRefresh] = useState(false)

  const getFavorites = async () => {
    await api
      .get('/user/favorites')
      .then(res => {
        setFavorites(res.data)
      })
      .catch(err => {
        console.error(err)

        showMessage({
          message: 'Algo deu errado :(',
          description: err.response?.data.message,
          type: err.response.status >= 500 ? 'danger' : 'warning',
          autoHide: true,
          icon: 'auto',
          duration: 3000
        })
      })
    stopLoading()
    setRefresh(false)
  }

  const onChangeFavorite = () => {
    getFavorites()
    resetScreen('home', true)
  }

  useEffect(() => {
    if (signed) {
      startLoading()
      getFavorites()
    }
  }, [signed])

  useEffect(() => {
    if (screens.favorite) {
      getFavorites()
      resetScreen('favorite', false)
    }
  }, [screens.favorite])

  if (!signed || !favorites.length) {
    return (
      <Warning
        title={'Você ainda não possui imóveis favoritos'}
        description={
          'Vá para tela principal para visualizar os imóveis e favoritá-los!'
        }
        icon={'heart-broken'}
        isBtnVisible={true}
        btnRoute={'Home'}
        btnText={'Tela inicial'}
      />
    )
  }

  return (
    <KeyboardAvoidingView testID="favorites" style={styles.container}>
      <View style={styles.header}>
        <Text numberOfLiner={2} style={styles.headerTitle}>
          Favoritos
        </Text>
      </View>

      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setRefresh(true)
            getFavorites()
          }}
          refreshing={refresh}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('PropertyDetail', { item })}
              >
                <View>
                  <PropertyCard
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
  container: {
    flex: 1,
    backgroundColor: colors['light-primary'],
    paddingVertical: 10,
    paddingHorizontal: 30
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    alignSelf: 'center',
    opacity: 0.8
  },

  listContainer: {
    flex: 1
  }
})
