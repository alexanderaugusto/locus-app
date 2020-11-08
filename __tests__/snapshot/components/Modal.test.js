import React from 'react'
import { create, act } from 'react-test-renderer'
import { ModalContact } from '../../../src/components'

jest.runAllTimers()

describe('Modal snapshot test', () => {
  it('render Modal component correctly', () => {
    const tree = create(<ModalContact />)
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('render Modal component correctly when modalVisible is true', () => {
    const tree = create(<ModalContact modalVisible={true} />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
