import React from 'react'
import { create } from 'react-test-renderer'
import { FloatButton } from '../../../src/components'

jest.useFakeTimers()
jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')

describe('FloatButton test', () => {
  it('render FloatButton component correctly', () => {
    const tree = create(<FloatButton />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
