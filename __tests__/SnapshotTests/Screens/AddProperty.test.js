import React from 'react'
import { create } from 'react-test-renderer'
import AddProperty from '../../../src/screens/AddProperty'

jest.useFakeTimers()
jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})

describe('AddProperty test', () => {
  it('render AddProperty screen correctly', () => {
    const tree = create(<AddProperty />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
