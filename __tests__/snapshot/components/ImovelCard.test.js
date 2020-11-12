import React from 'react'
import { create } from 'react-test-renderer'
import { ImovelCard } from '../../../src/components'

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

describe('ImovelCard snapshot test', () => {
  it('render ImovelCard component correctly', () => {
    const tree = create(<ImovelCard favorite={false} item={mockedProperty} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
