import React from 'react'
import { create } from 'react-test-renderer'
import SignIn from '../../../src/screens/SignIn'

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

describe('SignIn snapshot snapshot test', () => {
  it('render SignIn screen correctly', () => {
    const tree = create(<SignIn />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
