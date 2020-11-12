import React from 'react'
import { create } from 'react-test-renderer'
import PropertyDetail from '../../../src/screens/PropertyDetail'

import mockedProperty from '../../mocks/constants/property.json'

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    }),
    useRoute: () => ({
      route: () => ({
        params: mockedProperty
      })
    })
  }
})

describe('PropertyDetail snapshot test', () => {
  it('render PropertyDetail screen correctly', () => {
    const tree = create(<PropertyDetail />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
