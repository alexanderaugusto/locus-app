import React, { useEffect } from 'react'
import { TouchableOpacity, Image, View, Platform, StyleSheet, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import colors from '../constants/colors.json'

export default function ImagePickerFunction({ onChange, value }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
        if (status !== 'granted') {
          alert('Para prosseguir, é necessário permitir o acesso a câmera!')
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      let localUri = result.uri
      let filename = localUri.split('/').pop()

      let match = /\.(\w+)$/.exec(filename)
      let type = match ? `image/${match[1]}` : `image`

      onChange({ uri: localUri, name: filename, type })
    }
  }

  return (
    <View style={styles.containerInput}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: value }} style={styles.avatar} />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.avatarText}>Alterar</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  containerInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: "100%",
    height: "100%",
    width: 180,
    height: 180,
    borderRadius: 180,
    borderWidth: 3,
    borderColor: colors["yellow"],
  },

  avatarText: {
    color: colors['yellow'],
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
    textDecorationLine: "underline"
  },

})