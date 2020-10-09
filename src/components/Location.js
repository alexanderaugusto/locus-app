import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'

export default function LocationFunction() {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização foi negada!')
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location);
    })()
  }, [])

  let text = 'Carregando..'
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})