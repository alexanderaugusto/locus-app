import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { CategoryCard } from '../components'

import colors from '../utils/constants/colors.json'

export default function EditProperty() {
  return (
    <KeyboardAvoidingView testID="edit-property" style={styles.container}>
      <View style={styles.header}>
        <Text numberOfLiner={2} style={styles.headerTitle}>
          Editar Imóvel
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardItem}>
          <CategoryCard icon="map" text="Address"></CategoryCard>
        </View>
        <View style={styles.cardItem}>
          <CategoryCard icon="building" text="Info"></CategoryCard>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardItem}>
          <CategoryCard icon="images" text="Images"></CategoryCard>
        </View>
        <View style={styles.cardItem}>
          <CategoryCard icon="calendar-alt" text="Visit"></CategoryCard>
        </View>
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

  cardContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  cardItem: {
    flex: 1,
    margin: 5
  }
})
