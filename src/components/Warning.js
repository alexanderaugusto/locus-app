import React from 'react'
import { KeyboardAvoidingView, Text, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import Button from './Button'
import colors from '../utils/constants/colors.json'

export default function Warning({
  title,
  description,
  isBtnVisible = false,
  btnRoute,
  btnText,
  icon,
  ...rest
}) {
  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView testID="empty-message" style={styles.emptyContainer}>
      <Icon name={icon} size={120} color={colors.blue} />

      <View>
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptyDescription}>{description}</Text>
      </View>

      {isBtnVisible && (
        <Button
          btnText={btnText}
          onPress={() => navigation.navigate(btnRoute)}
        />
      )}
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
    marginTop: 15,
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
  }
})
