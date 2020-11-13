import React from 'react'
import * as auth from '../../../src/contexts/auth'
import { create } from 'react-test-renderer'
import Account from '../../../src/screens/Account'

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate
    }),
    useRoute: () => ({
      route: jest.fn()
    })
  }
})

describe('Account unit test', () => {
  it('render Account screen correctly when signed=false', () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: false
    }))
    const tree = create(<Account />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
  it('render Account screen correctly when signed=true', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))

    const tree = create(<Account />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
