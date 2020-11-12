import React from 'react'
import { create } from 'react-test-renderer'
import Account from '../../../src/screens/Account'
import * as auth from '../../../src/contexts/auth'

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
  it('render Account screen correctly when signed=false', () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: false
    }))
    const tree = create(<Account />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
  it('render Account screen correctly when signed=true', () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))
    const tree = create(<Account />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
