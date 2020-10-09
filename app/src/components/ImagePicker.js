import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Image, View, Platform, StyleSheet, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

import colors from '../consts/colors.json'


export default function ImagePickerFunction() {
  const [image, setImage] = useState(null)

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
    });

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  };

  return (
    <View style={styles.containerInput}>
      {image && <Image source={{ uri: image }} style={styles.avatar} />}
      { image
        ? <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Alterar foto</Text>
        </TouchableOpacity>
        : <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Adicionar foto</Text>
        </TouchableOpacity>}

    </View>
  );
}


const styles = StyleSheet.create({
  containerInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    marginTop: 20,
    height: 35,
    width: 150,
    backgroundColor: colors['blue'],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors['yellow'],
    fontWeight: 'bold',
    fontSize: 16,
  },

  avatar: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors["yellow"],
  },


})