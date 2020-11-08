import React from 'react'
import { create } from 'react-test-renderer'
import Account from '../../../src/screens/Account'

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})

describe('Account snapshot test', () => {
  it('render Account screen correctly', () => {
    const tree = create(<Account />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
