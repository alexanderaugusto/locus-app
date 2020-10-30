import React from 'react'
import { act, create } from 'react-test-renderer'
import Home from '../../../src/screens/Home'

jest.useFakeTimers()
jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    })
  }
})

describe('Home test', () => {

  it('render Home screen correctly', () => {
    act(() => {
      tree = create(
        <Home />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot();
  })
})