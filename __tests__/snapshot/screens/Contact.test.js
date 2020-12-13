import React from 'react'
import { create } from 'react-test-renderer'
import Contact from '../../../src/screens/Contact'

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    }),
    useRoute: () => ({
      route: jest.fn()
    })
  }
})
jest.mock('../../../src/services/api')

describe('Home snapshot test', () => {
  it('render Home screen correctly', async () => {
    const tree = create(<Contact />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
