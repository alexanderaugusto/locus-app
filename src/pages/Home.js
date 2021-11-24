import React, { useState, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import {
  DropdownSelect,
  PropertyCard,
  PropertyFilter,
  Warning
} from '../components'
import api from '../services/api'
import { useAuth } from '../contexts/auth'
import { useLoading } from '../contexts/loading'
import { useReset } from '../contexts/reset'
import { showMessage } from 'react-native-flash-message'

import colors from '../utils/constants/colors.json'

export default function Home() {
  const navigation = useNavigation()
  const { signed } = useAuth()
  const { startLoading, stopLoading, loading } = useLoading()
  const { screens, resetScreen } = useReset()

  const [properties, setProperties] = useState([])
  const [cities, setCities] = useState([])
  const [searchText] = useState('Santa Rita do Sapucaí, MG')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({})
  const [refresh, setRefresh] = useState(false)

  const getCities = async () => {
    await api
      .get('/cities')
      .then(response => {
        setCities(response.data)
      })
      .catch(error => {
        showMessage({
          message: 'Erro ao carregar cidades',
          type: 'danger',
          icon: 'danger'
        })
        console.log(error)
      })
  }

  const getProperties = async (params = {}) => {
    const config = {
      params
    }

    await api
      .get('/properties', config)
      .then(res => {
        setProperties(res.data)
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
    setRefresh(false)
  }

  const onChangeFavorite = () => {
    getProperties(filters)
    resetScreen('favorite', true)
  }

  const emptyList = () => {
    return (
      <Warning title={'Ops, nenhuma propriedade encontrada!'} icon={'frown'} />
    )
  }

  useEffect(() => {
    startLoading()
    getProperties(filters)
    getCities()
  }, [signed])

  useEffect(() => {
    if (screens.home) {
      getProperties()
      resetScreen('home', false)
    }
  }, [screens.home])

  return (
    <KeyboardAvoidingView
      testID="home"
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text numberOfLiner={2} style={styles.headerTitle}>
          Encontre o imóvel ideal para você!
        </Text>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/logo-black-mini.png')}
        />
      </View>

      <PropertyFilter
        isOpen={filterOpen}
        toggle={() => setFilterOpen(false)}
        applyFilters={filters => {
          setFilters(filters)
          setFilterOpen(false)
          startLoading()
          getProperties(filters)
        }}
      />
      <DropdownSelect
        items={cities}
        placeholder="Pesquise por localidade..."
        applyFilters={filters => {
          setFilters(filters)
          setFilterOpen(false)
          startLoading()
          getProperties(filters)
        }}
      />
      <View style={styles.filter}>
        <View>
          <Text style={styles.filterTitle}>Imóveis para alugar</Text>
          <Text style={styles.filterCity}>{searchText}</Text>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterOpen(true)}
        >
          <Icon name="filter" size={16} color={colors['light-secondary']} />
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={properties}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setRefresh(true)
            getProperties(filters)
          }}
          refreshing={refresh}
          ListEmptyComponent={!loading ? emptyList : <></>}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('PropertyDetail', { item })}
              >
                <View>
                  <PropertyCard
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
    backgroundColor: colors['light-primary'],
    paddingHorizontal: 30
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 35
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    alignSelf: 'center',
    opacity: 0.8,
    marginRight: 25
  },

  logo: {
    height: 75,
    width: 75
  },

  inputContainer: {
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 2
  },

  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 10
  },

  filterTitle: {
    color: colors.h1,
    fontSize: 17
  },

  filterCity: {
    color: colors.h2,
    fontSize: 16,
    fontStyle: 'italic'
  },

  filterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 8,
    height: 33,
    paddingHorizontal: 20
  },

  filterButtonText: {
    justifyContent: 'space-between',
    color: colors['light-secondary'],
    marginLeft: 7,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
