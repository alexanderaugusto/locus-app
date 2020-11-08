import React from 'react'
import { create } from 'react-test-renderer'
import Home from '../../../src/screens/Home'

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})

describe('Home snapshot test', () => {
  it('render Home screen correctly', () => {
    const tree = create(<Home />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
