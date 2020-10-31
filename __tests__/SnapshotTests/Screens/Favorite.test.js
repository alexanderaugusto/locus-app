import React from 'react'
import { create } from 'react-test-renderer'
import Favorite from '../../../src/screens/Favorite'

jest.useFakeTimers()
jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})

describe('Favorite test', () => {
  it('render Favorite screen correctly', () => {
    const tree = create(<Favorite />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
