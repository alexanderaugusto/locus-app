import React from 'react'
import { create } from 'react-test-renderer'
import { PropertyCard } from '../../../src/components'

import mockedProperty from '../../mocks/constants/property.json'

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})

describe('PropertyCard snapshot test', () => {
  it('render PropertyCard component correctly', () => {
    const tree = create(<PropertyCard favorite={false} item={mockedProperty} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
