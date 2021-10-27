import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Swipeable from 'react-native-swipeable'
import { formatCurrency, createRows } from '../utils/util'
import api, { STORAGE_URL } from '../services/api'
import { FloatButton, Warning } from '../components'
import { useAuth } from '../contexts/auth'
import { useLoading } from '../contexts/loading'
import { useReset } from '../contexts/reset'

import colors from '../utils/constants/colors.json'

export default function Advertise() {
  const navigation = useNavigation()
  const route = useRoute()
  const { signed } = useAuth()
  const { startLoading, stopLoading } = useLoading()
  const { resetScreen } = useReset()

  const [properties, setProperties] = useState([])
  const [refresh, setRefresh] = useState(false)

  const getProperties = async () => {
    await api
      .get('/user/properties')
      .then(res => {
        setProperties(res.data)
      })
      .catch(err => {
        console.error(err)
      })

    setRefresh(false)
    stopLoading()
  }

  useEffect(() => {
    if (route.params?.reload) {
      resetScreen('Anunciar')
    }
  }, [route.params?.reload])

  // const removeProperty = async item => {
  //   api
  //     .delete(`/property/${item.id}`)
  //     .then(res => {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'Anunciar' }],
  //         key: 'Home'
  //       })
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }

  useEffect(() => {
    if (signed) {
      startLoading()
      getProperties()
    }
  }, [signed])

  useEffect(() => {
    if (route.params?.reload) {
      getProperties()
    }
  }, [route.params])

  if (!signed || !properties.length) {
    return (
      <Warning
        title={'Você não possui nenhum imóvel!'}
        description={
          'Para cadastrar o seu primeiro imóvel, clique no botão abaixo.'
        }
        icon={'house-damage'}
        isBtnVisible={true}
        btnRoute={signed ? 'AddProperty' : 'SignIn'}
        btnText={'Meu primeiro imóvel'}
      />
    )
  }

  return (
    <KeyboardAvoidingView testID="advertises" style={styles.container}>
      <View style={styles.header}>
        <Text numberOfLiner={2} style={styles.headerTitle}>
          Anunciar
        </Text>
      </View>

      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={createRows(properties, 2)}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setRefresh(true)
            getProperties()
          }}
          refreshing={refresh}
          renderItem={({ item }) => {
            if (item.empty) {
              return (
                <View
                  style={{
                    ...styles.card,
                    elevation: 0,
                    backgroundColor: 'transparent'
                  }}
                />
              )
            }

            return (
              <Swipeable
                style={[styles.card, { marginTop: 10 }]}
                rightButtonWidth={75}
                rightButtons={[
                  <View style={styles.deleteContainer} key={item.id.toString()}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() =>
                        navigation.navigate('EditProperty', { item })
                      }
                    >
                      <Text style={styles.deleteText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => navigation.navigate('EditProperty')}
                    >
                      <Text style={styles.deleteText}>Deletar</Text>
                    </TouchableOpacity>
                  </View>
                ]}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PropertyDetail', { item })
                  }
                  activeOpacity={1}
                >
                  <View style={styles.card}>
                    <Image
                      style={styles.cardImage}
                      resizeMode="cover"
                      source={{
                        uri: `${STORAGE_URL}/property/${item.images[0]?.path}`
                      }}
                    />
                    <View style={styles.detailContainer}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.cardTitle}
                      >
                        {item.title}
                      </Text>
                      <View>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={styles.cardDescription}
                        >
                          {item.description}
                        </Text>
                      </View>
                      <View style={styles.cardPriceContainer}>
                        <Text style={styles.cardPrice}>
                          {formatCurrency(item.price)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            )
          }}
        />
      </SafeAreaView>

      <FloatButton onPress={() => navigation.navigate('AddProperty')} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['light-primary'],
    paddingVertical: 10,
    paddingHorizontal: 20
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
  },

  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors['light-secondary'],
    borderRadius: 12,
    elevation: 1,
    height: 120,
    width: '100%'
  },

  detailContainer: {
    alignItems: 'flex-start',
    flex: 1,
    padding: 5
  },

  cardImage: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    width: 120,
    height: '100%',
    marginRight: 5
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.h1
  },

  cardDescription: {
    paddingTop: 3,
    fontSize: 14,
    color: colors.h2
  },

  cardPriceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 5
  },

  cardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green'
  },

  deleteContainer: {
    flex: 1,
    height: '100%',
    width: 75
  },

  deleteButton: {
    borderBottomRightRadius: 10,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.danger,
    flex: 1
  },

  editButton: {
    borderTopRightRadius: 10,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.blue,
    flex: 1
  },

  deleteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors['light-primary']
  }
})
