import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from 'react-native'
import api, { STORAGE_URL } from '../services/api'
import { formatFullTextDate, formatTime } from '../utils/util'
import { useLoading } from '../contexts/loading'
import { showMessage } from 'react-native-flash-message'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

import colors from '../utils/constants/colors.json'

export default function EditVisits() {
  const { startLoading, stopLoading } = useLoading()
  const navigation = useNavigation()

  const [visits, setVisits] = useState([])

  const getUserVisits = async () => {
    startLoading()

    await api
      .get('/user/visits')
      .then(res => {
        setVisits(res.data)
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
  }

  useEffect(() => getUserVisits(), [])

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name={'arrow-left'} size={20} color={colors.h1} />
        </TouchableOpacity>

        <Text numberOfLiner={2} style={styles.title}>
          Suas visitas agendadas
        </Text>
        <View style={styles.menu}>
          {visits.map((visit, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() =>
                  navigation.navigate('PropertyDetail', {
                    item: visit.property
                  })
                }
              >
                <Image
                  style={styles.propertyImage}
                  source={{
                    uri: `${STORAGE_URL}/property/${visit.property.images[0]?.path}`
                  }}
                />

                <View style={styles.menuText}>
                  <Text style={styles.menuItemTitle}>
                    {formatFullTextDate(visit.date)}
                  </Text>
                  <Text style={styles.menuItemDescription}>
                    {formatTime(visit.date)}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['light-primary'],
    padding: 30
  },

  title: {
    width: 300,
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    textAlign: 'center',
    paddingTop: 15
  },

  menu: {
    marginTop: 10
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['light-secondary'],
    marginVertical: 5,
    padding: 20,
    borderRadius: 8,
    shadowColor: colors.h1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1
  },

  propertyImage: {
    height: 50,
    width: 50,
    borderRadius: 50
  },

  menuText: {
    marginLeft: 20
  },

  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.h1
  },

  menuItemDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.h2
  }
})
