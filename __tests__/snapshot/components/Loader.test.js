import React from 'react'
import { create } from 'react-test-renderer'
import { Loader } from '../../../src/components'

jest.runAllTimers()

describe('Loader snapshot test', () => {
  it('render Loader component correctly when isLoading is false', () => {
    const tree = create(<Loader isLoading={false} />)
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('render Loader component correctly when isLoading is true', () => {
    const tree = create(<Loader isLoading={true} />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
