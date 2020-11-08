import React from 'react'
import { create } from 'react-test-renderer'
import AddProperty from '../../../src/screens/AddProperty'

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})

describe('AddProperty snapshot test', () => {
  it('render AddProperty screen correctly', () => {
    const tree = create(<AddProperty />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
