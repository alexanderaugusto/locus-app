import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'

import colors from '../constants/colors.json'

export default function ButtonGroup() {

  const state = {
    data: [
      { id: "0", name: "Casa" },
      { id: "1", name: "Apartamento" },
      { id: "2", name: "Kitnet" },
      { id: "3", name: "Sítio" },
      { id: "4", name: "Studio" },
      { id: "5", name: "Outro" },
    ]
  };

  return (
    <View style={styles.groupContainer} >

      <FlatList
        scrollEnabled={false}
        data={state.data}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity key={item.id} style={styles.button}>
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  groupContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: 'center',

  },

  button: {
    height: 33,
    width: 96,
    borderRadius: 24,
    borderColor: colors['blue-secondary'],
    borderWidth: 1,

    marginTop: 10,
    marginHorizontal: 4,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: colors['blue-secondary'],
    fontSize: 12,
  }
})