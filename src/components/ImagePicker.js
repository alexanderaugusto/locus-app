import React, { useEffect } from 'react'
import { TouchableOpacity, Platform, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default function ImagePickerFunction({ onChange, children }) {
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
    <TouchableOpacity style={styles.containerInput} onPress={pickImage}>
      {children}
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  containerInput: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})