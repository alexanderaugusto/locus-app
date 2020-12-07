import React from 'react'
import { create } from 'react-test-renderer'
import api from '../../../src/services/api'
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
jest.mock('../../../src/services/api')

describe('PropertyCard unit test', () => {
  it('should add favorite property', async () => {
    const mockCallback = jest.fn()
    api.put.mockResolvedValue()

    const tree = create(
      <PropertyCard
        favorite={false}
        item={mockedProperty}
        onChangeFavorite={mockCallback}
      />
    )

    const button = tree.root.findByProps({ testID: 'btn-favorite' }).props
    await button.onPress()
    expect(mockCallback.mock.calls[0][1]).toBeTruthy()
  })

  it('should remove favorite property', async () => {
    const mockCallback = jest.fn()
    api.delete.mockResolvedValue()

    const tree = create(
      <PropertyCard
        favorite={true}
        item={mockedProperty}
        onChangeFavorite={mockCallback}
      />
    )

    const button = tree.root.findByProps({ testID: 'btn-favorite' }).props
    await button.onPress()
    expect(mockCallback.mock.calls[0][1]).toBeFalsy()
  })
})
