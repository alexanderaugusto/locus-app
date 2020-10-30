import React from 'react'
import { act, create } from 'react-test-renderer'
import SignUp from '../../../src/screens/SignUp'

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

describe('SignUp test', () => {
  it('render SignUp screen correctly', () => {
    const tree = create(<SignUp />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
