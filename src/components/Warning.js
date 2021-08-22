import React from 'react'
import {
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'

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
        <TouchableOpacity
          testID={'empty-button'}
          style={styles.emptyButton}
          onPress={() => navigation.navigate(btnRoute)}
        >
          <Text style={styles.emptyButtonText}>{btnText}</Text>
        </TouchableOpacity>
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
  },

  emptyButton: {
    height: 40,
    minWidth: 150,
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
    color: colors['light-secondary'],
    fontWeight: '600',
    fontSize: 16
  }
})
