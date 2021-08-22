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
import { PropertyCard, PropertyFilter } from '../components'
import api from '../services/api'
import { useAuth } from '../contexts/auth'
import { useLoading } from '../contexts/loading'

import colors from '../utils/constants/colors.json'

export default function Home() {
  const navigation = useNavigation()
  const { signed } = useAuth()
  const { startLoading, stopLoading, loading } = useLoading()

  const [properties, setProperties] = useState([])
  const [searchText] = useState('Santa Rita do Sapucaí, MG')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({})
  const [refresh, setRefresh] = useState(false)

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
      })

    stopLoading()
    setRefresh(false)
  }

  const onChangeFavorite = (item, favorite) => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
      key: 'Favoritos'
    })
  }

  const emptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="frown" size={120} color={colors.blue} />
        <Text style={styles.emptyList}>
          Ops, nenhuma propriedade encontrada!
        </Text>
      </View>
    )
  }

  useEffect(() => {
    startLoading()
    getProperties(filters)
  }, [signed])

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
          source={require('../../assets/logo-black.png')}
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

      <View style={styles.inputContainer}>
        <TextInput
          style={{ padding: 5 }}
          placeholder="Pesquise por localidade..."
          placeholderTextColor="#999"
          value={searchText}
          editable={false}
        />
        <TouchableOpacity style={{ alignSelf: 'center' }}>
          <Icon name="search" size={16} color={colors.blue} />
        </TouchableOpacity>
      </View>
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
    borderRadius: 25,
    height: 33,
    paddingHorizontal: 20
  },

  filterButtonText: {
    justifyContent: 'space-between',
    color: colors['light-secondary'],
    marginLeft: 7,
    fontSize: 16,
    fontWeight: 'bold'
  },

  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '25%'
  },

  emptyList: {
    marginTop: 15,
    color: '#333740',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
