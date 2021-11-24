import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import colors from '../utils/constants/colors.json'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

export default function CategoryCard({ icon, text, navigateTo, item }) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(navigateTo, { item })}
    >
      <Icon name={icon} size={30} color={colors.blue} />

      <View style={styles.menuText}>
        <Text style={styles.menuItemTitle}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['light-secondary'],
    marginVertical: 12,
    padding: 22,
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

  menuText: {
    marginLeft: 20
  },

  menuItemTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.h1
  }
})
