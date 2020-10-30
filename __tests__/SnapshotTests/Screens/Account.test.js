import React from 'react'
import { act, create } from 'react-test-renderer'
import Account from '../../../src/screens/Account'

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

describe('Account test', () => {
  it('render Account screen correctly', () => {
    act(() => {
      tree = create(<Account />)
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
