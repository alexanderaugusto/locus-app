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

  it('modal should close when press the button', () => {
    const setModalVisibleMock = jest.fn()
    const tree = create(<ModalContact modalVisible={true} setModalVisible={setModalVisibleMock} />).root
    const button = tree.findByProps({ testID: 'modal-button' }).props
    act(() => button.onPress(() => setModalVisibleMock(false)))

    expect(setModalVisibleMock).toBeCalled()
  })
})
