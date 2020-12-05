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
jest.mock('../../../src/contexts/loading', () => {
  return {
    ...jest.requireActual('../../../src/contexts/loading'),
    useLoading: () => ({
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
      loading: jest.fn()
    })
  }
})

describe('AddProperty snapshot test', () => {
  it('render AddProperty screen correctly', () => {
    const tree = create(<AddProperty />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
