import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import colors from '../constants/colors.json'

export default function Warning({ navigation }) {
  return (
    <View style={styles.container}>

      <FontAwesome name="warning" size={64} color={colors['blue-secondary']} />

      <Text style={styles.message} numberOfLines={2}> Ops, para prosseguir é necessário que você faça o login!</Text>
      <Text style={styles.secondaryMessage}> Caso não tenha uma conta, cadastra-se!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["platinum"],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  message: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "700",
    color: colors['blue'],
    textAlign: "left",
  },

  secondaryMessage: {
    marginTop: 5,
    width: 300,
    fontSize: 14,
    fontWeight: "500",
    color: colors['blue'],
    textAlign: 'center',
  },

  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    marginHorizontal: 10,
    height: 35,
    width: 120,
    backgroundColor: colors['yellow'],
    borderRadius: 24,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },

  buttonText: {
    color: colors['blue'],
    fontWeight: 'bold',
    fontSize: 16
  }

})