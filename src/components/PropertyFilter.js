import React, { useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  Text
} from 'react-native'
import InputArea from './InputArea'
import Icon from '@expo/vector-icons/FontAwesome5'
import colors from '../utils/constants/colors.json'

export default function PropertyFilter({ isOpen, toggle, applyFilters }) {
  const [options, setOptions] = useState({
    price: [100, 5000],
    bedrooms: undefined,
    bathrooms: undefined,
    area: [30, 1500],
    place: undefined,
    animal: undefined,
    type: []
  })

  const onChange = (type, value) => {
    setOptions({ ...options, [type]: value })
  }

  if (!isOpen) {
    return null
  }

  return (
    <Modal>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggle}>
            <Icon name="times" size={20} color={colors['light-secondary']} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filtros</Text>
        </View>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.optionTitle}>Valor</Text>
            <View style={styles.optionContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mínimo</Text>
                <InputArea
                  testID="price-input-min"
                  label="R$"
                  placeholder={'100,00'}
                  value={options.price[0].toString()}
                  onChangeText={value => {
                    onChange('price', [value, options.price[1]])
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Máximo</Text>
                <InputArea
                  testID="price-input-max"
                  label="R$"
                  placeholder={'5000,00'}
                  value={options.price[1].toString()}
                  onChangeText={value => {
                    onChange('price', [options.price[0], value])
                  }}
                />
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.optionTitle}>Quartos</Text>
            <View
              style={[styles.optionContainer, { justifyContent: 'flex-start' }]}
            >
              <TouchableOpacity
                onPress={() => onChange('bedrooms', undefined)}
                style={[
                  styles.optionButton,
                  options.bedrooms === undefined ? styles.optionSelected : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    options.bedrooms === undefined
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  Tanto faz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('bedrooms', 1)}
                style={[
                  styles.optionButton,
                  parseInt(options.bedrooms, 10) === 1
                    ? styles.optionSelected
                    : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    parseInt(options.bedrooms, 10) === 1
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('bedrooms', 2)}
                style={[
                  styles.optionButton,
                  parseInt(options.bedrooms, 10) === 2
                    ? styles.optionSelected
                    : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    parseInt(options.bedrooms, 10) === 2
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('bedrooms', 3)}
                style={[
                  styles.optionButton,
                  parseInt(options.bedrooms, 10) === 3
                    ? styles.optionSelected
                    : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    parseInt(options.bedrooms, 10) === 3
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  3+
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <Text style={styles.optionTitle}>Banheiros</Text>
            <View
              style={[styles.optionContainer, { justifyContent: 'flex-start' }]}
            >
              <TouchableOpacity
                onPress={() => onChange('bathrooms', undefined)}
                style={[
                  styles.optionButton,
                  options.bathrooms === undefined ? styles.optionSelected : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    options.bathrooms === undefined
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  Tanto faz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('bathrooms', 1)}
                style={[
                  styles.optionButton,
                  parseInt(options.bathrooms, 10) === 1
                    ? styles.optionSelected
                    : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    parseInt(options.bathrooms, 10) === 1
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('bathrooms', 2)}
                style={[
                  styles.optionButton,
                  parseInt(options.bathrooms, 10) === 2
                    ? styles.optionSelected
                    : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    parseInt(options.bathrooms, 10) === 2
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('bathrooms', 3)}
                style={[
                  styles.optionButton,
                  parseInt(options.bathrooms, 10) === 3
                    ? styles.optionSelected
                    : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    parseInt(options.bathrooms, 10) === 3
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  3+
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <Text style={styles.optionTitle}>Área</Text>
            <View style={styles.optionContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mínimo</Text>
                <InputArea
                  testID="area-input-min"
                  label="m²"
                  placeholder={'100,00'}
                  value={options.area[0].toString()}
                  onChangeText={value => {
                    onChange('area', [value, options.area[1]])
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Máximo</Text>
                <InputArea
                  testID="area-input-max"
                  label="m²"
                  placeholder={'1500,00'}
                  value={options.area[1].toString()}
                  onChangeText={value => {
                    onChange('area', [options.area[0], value])
                  }}
                />
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.optionTitle}>Vagas</Text>
            <View
              style={[styles.optionContainer, { justifyContent: 'flex-start' }]}
            >
              <TouchableOpacity
                onPress={() => onChange('place', undefined)}
                style={[
                  styles.optionButton,
                  options.place === undefined ? styles.optionSelected : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    options.place === undefined ? styles.optionSelectedText : {}
                  ]}
                >
                  Tanto faz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('place', 1)}
                style={[
                  styles.optionButton,
                  parseInt(options.place, 10) === 1 ? styles.optionSelected : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    parseInt(options.place, 10) === 1
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('place', 2)}
                style={[
                  styles.optionButton,
                  parseInt(options.place, 10) === 2 ? styles.optionSelected : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    parseInt(options.place, 10) === 2
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('place', 3)}
                style={[
                  styles.optionButton,
                  parseInt(options.place, 10) === 3 ? styles.optionSelected : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    parseInt(options.place, 10) === 3
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  3+
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <Text style={styles.optionTitle}>Tipo</Text>

            <View style={[styles.optionContainer, { flexDirection: 'column' }]}>
              <TouchableOpacity
                onPress={() => {
                  const type = options.type

                  if (type.includes('Apartamento')) {
                    type.splice(type.indexOf('Apartamento'), 1)
                  } else {
                    type.push('Apartamento')
                  }

                  onChange('type', type)
                }}
                style={styles.checkBoxInput}
              >
                <View
                  style={[
                    styles.checkBox,
                    options.type.includes('Apartamento')
                      ? styles.checkBoxChecked
                      : {}
                  ]}
                >
                  {options.type.includes('Apartamento') && (
                    <Icon
                      name="check"
                      size={12}
                      color={colors['light-secondary']}
                    />
                  )}
                </View>
                <Text style={styles.checkBoxText}>Apartamento</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const type = options.type

                  if (type.includes('Casa')) {
                    type.splice(type.indexOf('Casa'), 1)
                  } else {
                    type.push('Casa')
                  }

                  onChange('type', type)
                }}
                style={styles.checkBoxInput}
              >
                <View
                  style={[
                    styles.checkBox,
                    options.type.includes('Casa') ? styles.checkBoxChecked : {}
                  ]}
                >
                  {options.type.includes('Casa') && (
                    <Icon
                      name="check"
                      size={12}
                      color={colors['light-secondary']}
                    />
                  )}
                </View>
                <Text style={styles.checkBoxText}>Casa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const type = options.type

                  if (type.includes('Casa de Condomínio')) {
                    type.splice(type.indexOf('Casa de Condomínio'), 1)
                  } else {
                    type.push('Casa de Condomínio')
                  }

                  onChange('type', type)
                }}
                style={styles.checkBoxInput}
              >
                <View
                  style={[
                    styles.checkBox,
                    options.type.includes('Casa de Condomínio')
                      ? styles.checkBoxChecked
                      : {}
                  ]}
                >
                  {options.type.includes('Casa de Condomínio') && (
                    <Icon
                      name="check"
                      size={12}
                      color={colors['light-secondary']}
                    />
                  )}
                </View>
                <Text style={styles.checkBoxText}>Casa de Condomínio</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <Text style={styles.optionTitle}>Aceita pets?</Text>
            <View
              style={[styles.optionContainer, { justifyContent: 'flex-start' }]}
            >
              <TouchableOpacity
                onPress={() => onChange('animal', undefined)}
                style={[
                  styles.optionButton,
                  options.animal === undefined ? styles.optionSelected : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    options.animal === undefined
                      ? styles.optionSelectedText
                      : {}
                  ]}
                >
                  Tanto faz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('animal', true)}
                style={[
                  styles.optionButton,
                  options.animal === true ? styles.optionSelected : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    options.animal === true ? styles.optionSelectedText : {}
                  ]}
                >
                  Sim
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange('animal', false)}
                style={[
                  styles.optionButton,
                  options.animal === false ? styles.optionSelected : {}
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    options.animal === false ? styles.optionSelectedText : {}
                  ]}
                >
                  Não
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.applyButtons}>
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  {
                    borderWidth: 1,
                    borderColor: colors.blue,
                    backgroundColor: 'transparent'
                  }
                ]}
                onPress={() =>
                  applyFilters({
                    price: [100, 5000],
                    bedrooms: undefined,
                    bathrooms: undefined,
                    area: [30, 1500],
                    place: undefined,
                    animal: undefined,
                    type: []
                  })
                }
              >
                <Text style={[styles.applyButtonText, { color: colors.blue }]}>
                  Limpar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => applyFilters(options)}
              >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.blue
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },

  headerTitle: {
    fontSize: 20,
    marginLeft: 20,
    color: colors['light-secondary']
  },

  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: colors['light-secondary'],
    padding: 20
  },

  optionTitle: {
    color: colors.h1,
    fontSize: 20,
    marginBottom: 15
  },

  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  inputContainer: {
    width: '48%'
  },

  inputLabel: {
    color: colors.h2,
    fontSize: 16,
    marginBottom: -7
  },

  optionButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 25,
    height: 40,
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 10
  },

  optionSelected: {
    backgroundColor: colors.blue
  },

  optionSelectedText: {
    color: colors['light-secondary']
  },

  optionButtonText: {
    color: colors.h2,
    fontSize: 15
  },

  checkBoxInput: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },

  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 5,
    marginRight: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  checkBoxText: {
    color: colors.h2,
    fontSize: 16
  },

  checkBoxChecked: {
    backgroundColor: 'blue'
  },

  divider: {
    width: '100%',
    height: 2,
    backgroundColor: colors.h2,
    opacity: 0.2,
    marginVertical: 35
  },

  applyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  applyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.blue,
    borderRadius: 8,
    width: 120,
    height: 40
  },

  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors['light-secondary']
  }
})
