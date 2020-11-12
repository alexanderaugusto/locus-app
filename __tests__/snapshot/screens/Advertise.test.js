import React from 'react'
import { create } from 'react-test-renderer'
import Advertise from '../../../src/screens/Advertise'

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

describe('Advertise snapshot test', () => {
  it('render Advertise screen correctly', () => {
    const tree = create(<Advertise />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
