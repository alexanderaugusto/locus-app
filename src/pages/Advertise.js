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
import Icon from '@expo/vector-icons/FontAwesome5'
import Swipeable from 'react-native-swipeable'
import { formatCurrency, createRows } from '../utils/util'
import api, { STORAGE_URL } from '../services/api'
import { FloatButton } from '../components'
import { useAuth } from '../contexts/auth'
import { useLoading } from '../contexts/loading'

import colors from '../utils/constants/colors.json'

export default function Advertise() {
  const navigation = useNavigation()
  const route = useRoute()
  const { signed } = useAuth()
  const { startLoading, stopLoading } = useLoading()

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

    stopLoading()
  }

  const removeProperty = async item => {
    api
      .delete(`/property/${item.id}`)
      .then(res => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Anunciar' }],
          key: 'Home'
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

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
      <KeyboardAvoidingView
        testID="empty-message"
        style={styles.emptyContainer}
      >
        <Icon name="house-damage" size={120} color={colors.blue} />

        <View>
          <Text style={styles.emptyTitle}>Você não possui nenhum imóvel!</Text>
          <Text style={styles.emptyDescription}>
            Para cadastrar o seu primeiro imóvel, clique no botão abaixo.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => navigation.navigate(signed ? 'AddProperty' : 'SignIn')}
        >
          <Text style={styles.emptyButtonText}>Meu primeiro imóvel</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
                      style={styles.deleteButton}
                      onPress={() => removeProperty(item)}
                    >
                      <Text style={styles.deleteText}>Deletar</Text>
                    </TouchableOpacity>
                  </View>
                ]}
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
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.cardTitle}
                    >
                      {item.title}
                    </Text>
                    <View>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={styles.cardDescription}
                      >
                        {item.description}
                      </Text>
                    </View>
                    <Text style={styles.cardPrice}>
                      {formatCurrency(item.price)}
                    </Text>
                  </View>
                </View>
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
  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '25%'
  },

  emptyTitle: {
    color: colors.h1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  emptyDescription: {
    color: colors.p,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15
  },

  emptyButton: {
    height: 40,
    width: 'auto',
    backgroundColor: colors.blue,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 25,
    marginVertical: 10
  },

  emptyButtonText: {
    color: colors['light-secondary']
  },

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
    justifyContent: 'space-between',
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

  cardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
    margin: 5,
    alignSelf: 'flex-end'
  },

  deleteContainer: {
    flex: 1,
    height: '100%',
    width: 75
  },

  deleteButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: '100%',
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'red'
  },

  deleteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors['light-primary']
  }
})
