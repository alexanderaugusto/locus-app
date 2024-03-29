import React from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { CategoryCard } from '../components'
import Icon from '@expo/vector-icons/FontAwesome5'
import colors from '../utils/constants/colors.json'

export default function EditProperty() {
  const route = useRoute()
  const navigation = useNavigation()
  const item = route.params?.item

  return (
    <KeyboardAvoidingView testID="edit-property" style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.goBack()}
        >
          <Icon name={'arrow-left'} size={20} color={colors.h1} />
        </TouchableOpacity>
        <Text numberOfLiner={2} style={styles.headerTitle}>
          Editar Imóvel
        </Text>
      </View>

      <View style={styles.menu}>
        <CategoryCard
          icon="map"
          text="Endereço"
          navigateTo="EditAddress"
          item={item}
        />

        <CategoryCard
          icon="building"
          text="Características"
          navigateTo="EditInfo"
          item={item}
        />

        <CategoryCard
          icon="images"
          text="Imagens"
          navigateTo="EditImages"
          item={item}
        />

        <CategoryCard
          icon="calendar-alt"
          text="Horários para visitação"
          navigateTo="AddVisitPeriod"
          item={item}
        />
      </View>
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

  goBack: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0
  },

  menu: {
    paddingHorizontal: 15,
    marginTop: 10
  }
})
