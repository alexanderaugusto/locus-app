import React from 'react'
import { create } from 'react-test-renderer'
import * as auth from '../../../src/contexts/auth'

import Favorite from '../../../src/screens/Favorite'

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})

describe('Favorite snapshot test', () => {
  it('render Favorite screen correctly when signed=false', () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: false
    }))
    const tree = create(<Favorite />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
  it('render Favorite screen correctly when signed=true', () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))
    const tree = create(<Favorite />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
