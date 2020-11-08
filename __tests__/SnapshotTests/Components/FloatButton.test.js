import React from 'react'
import { create } from 'react-test-renderer'
import { FloatButton } from '../../../src/components'

jest.runAllTimers()

describe('FloatButton snapshot test', () => {
  it('render FloatButton component correctly', () => {
    const tree = create(<FloatButton />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
