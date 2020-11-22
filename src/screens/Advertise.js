import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { formatCurrency, createRows } from '../utils/util'
import api, { STORAGE_URL } from '../services/api'
import { FloatButton } from '../components'
import { useAuth } from '../contexts/auth'

import colors from '../constants/colors.json'

export default function Advertise() {
  const navigation = useNavigation()
  const route = useRoute()
  const { signed } = useAuth()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)

  const getProperties = async () => {
    setLoading(true)

    await api
      .get('/user/properties')
      .then(res => {
        setProperties(res.data)
      })
      .catch(err => {
        console.error(err)
      })

    setLoading(false)
  }

  useEffect(() => {
    if (signed) {
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
      <Text numberOfLiner={2} style={styles.title}>
        Anunciar
      </Text>

      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={createRows(properties, 2)}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onRefresh={() => getProperties()}
          refreshing={loading}
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
              <TouchableWithoutFeedback onPress={() => console.log('clicou')}>
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
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Text
                        numberOfLines={4}
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
              </TouchableWithoutFeedback>
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
    width: 'auto',
    backgroundColor: colors['blue-secondary'],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 25,
    marginVertical: 10
  },

  emptyButtonText: {
    color: '#FFFFFF'
  },

  container: {
    flex: 1,
    backgroundColor: colors.platinum,
    paddingVertical: 10,
    paddingHorizontal: 20
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
  },

  card: {
    flexGrow: 1,
    flexBasis: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    elevation: 1,
    height: 250
  },

  detailContainer: {
    justifyContent: 'space-between',
    flex: 1
  },

  cardImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: 120
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blue
  },

  cardDescription: {
    fontSize: 14,
    color: colors.blue
  },

  cardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 5
  }
})
