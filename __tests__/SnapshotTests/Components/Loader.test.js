import React from 'react'
import { create } from 'react-test-renderer'
import { Loader } from '../../../src/components'

jest.useFakeTimers()

describe('Loader test', () => {
  it('render Loader component correctly', () => {
    const tree = create(<Loader />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
