import React from 'react'
import { act, create } from 'react-test-renderer'
import Advertise from '../../../src/screens/Advertise'

jest.useFakeTimers()
jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    }),
    useRoute: () => ({
      route: jest.fn()
    })
  }
})

describe('Advertise test', () => {
  it('render Advertise screen correctly', () => {
    const tree = create(<Advertise />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
