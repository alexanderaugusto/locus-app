import React, { useState } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity
} from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5'

import colors from '../constants/colors.json'

export default function InputSelect({
  items,
  selectedValue,
  menuTitle,
  onChange
}) {
  const [menu, setMenu] = useState(false)

  const selectedLabel = () => {
    if (selectedValue === undefined || selectedValue === null) {
      return items[0].label
    }

    return items.filter(item => item.value === selectedValue)[0].label
  }

  return (
    <>
      <TouchableOpacity
        style={styles.selectContainer}
        onPress={() => setMenu(true)}
      >
        <Text testID={'inputSelect-label'} style={styles.selectText}>
          {selectedLabel()}
        </Text>
        <Icon name="sort-down" color="black" size={18} />
      </TouchableOpacity>
      <Modal visible={menu} transparent={true}>
        <View style={styles.modal}>
          <View style={styles.menuContainer}>
            <ScrollView style={styles.menu}>
              {menuTitle && (
                <Text testID={'inputSelect-menuTitle'} style={styles.menuTitle}>
                  {menuTitle}
                </Text>
              )}
              {items.map((item, index) => {
                return (
                  <TouchableOpacity
                    testID={`inputSelect-option${index}`}
                    key={index}
                    style={[
                      styles.itemContainer,
                      selectedValue === item.value && styles.selectedItem
                    ]}
                    onPress={() => {
                      onChange(item, index)
                      setMenu(false)
                    }}
                  >
                    <Text testID={'inputSelect-optionLabel'}>{item.label}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  selectContainer: {
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 25,
    marginTop: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 2,
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  selectText: {
    fontSize: 15
  },

  modal: {
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: '100%'
  },

  menuContainer: {
    height: 'auto'
  },

  menu: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF'
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },

  itemContainer: {
    padding: 13
  },

  selectedItem: {
    backgroundColor: 'rgba(52, 52, 52, 0.15)'
  }
})
