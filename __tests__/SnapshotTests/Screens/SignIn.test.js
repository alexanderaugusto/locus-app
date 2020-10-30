import React from 'react'
import { act, create } from 'react-test-renderer'
import SignIn from '../../../src/screens/SignIn'

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

describe('SignIn test', () => {
  it('render SignIn screen correctly', () => {
    act(() => {
      tree = create(<SignIn />)
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
