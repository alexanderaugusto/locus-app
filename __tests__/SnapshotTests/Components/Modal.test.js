import React from 'react'
import { create } from 'react-test-renderer'
import { ModalContact } from '../../../src/components'

jest.useFakeTimers()

describe('Modal test', () => {
  it('render Modal component correctly', () => {
    const tree = create(<ModalContact />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
