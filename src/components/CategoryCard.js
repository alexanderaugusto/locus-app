import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import colors from '../utils/constants/colors.json'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

export default function CategoryCard({ icon, text, navigateTo, item }) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(navigateTo, { item })}
    >
      <View>
        <Icon
          style={styles.cardIcon}
          name={icon}
          color={colors.blue}
          size={30}
        />
        <Text style={styles.cardText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors['light-secondary'],
    borderRadius: 12,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 1
  },
  cardIcon: {
    marginLeft: 5
  },
  cardText: {
    fontSize: 22,
    margin: 2
  }
})
