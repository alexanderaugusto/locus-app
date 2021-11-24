import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { Picker } from '@react-native-picker/picker'

import colors from '../utils/constants/colors.json'

export default function DropdownSelect({ items, applyFilters }) {
  const [selectedItem, setSelectedItem] = useState()

  return (
    <View style={styles.pickerContainer}>
      {/* <View style={styles.container}>
        <TouchableOpacity
          style={styles.selectContainer}
          onPress={() => setMenu(true)}
        >
          <Text testID={'inputSelect-label'} style={styles.selectText}>
            {inputText}
          </Text>
          <Icon name="search" size={16} color={colors.blue} />
        </TouchableOpacity>
        {menu && (
          <View style={styles.listContainer}>
            {items.map(item => (
              <TouchableOpacity
                key={item.city}
                style={styles.listItem}
                onPress={() => {
                  changeCity(item.city, item.state)
                }}
              >
                <Text>{`${item.city} - ${item.state}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View> */}

      <Picker
        style={styles.picker}
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedItem(itemValue)
          applyFilters({ city: itemValue })
        }}
        itemStyle={styles.pickerItems}
      >
        <Picker.Item
          style={styles.placeholder}
          value=""
          label="Selecione uma cidade..."
        />
        {items.map(item => (
          <Picker.Item
            key={item.city}
            label={`${item.city} - ${item.state}`}
            value={item.city}
          />
        ))}
      </Picker>
      <Icon name="search" size={16} color={colors.blue} />
    </View>
  )
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.blue,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    height: 46,
    backgroundColor: '#fff'
  },
  picker: {
    width: '90%'
  },
  pickerItems: {
    backgroundColor: '#000'
  },
  placeholder: {
    color: '#ccc'
  }
})
