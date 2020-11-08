import React from 'react'
import { create, act } from 'react-test-renderer'
import { ModalContact } from '../../../src/components'

jest.runAllTimers()

describe('Modal unit test', () => { 
  it('modal should close when press the button', () => {
    const setModalVisibleMock = jest.fn()
    const tree = create(<ModalContact modalVisible={true} setModalVisible={setModalVisibleMock} />).root
    const button = tree.findByProps({ testID: 'modal-button' }).props
    act(() => button.onPress(() => setModalVisibleMock(false)))

    expect(setModalVisibleMock).toHaveBeenCalledTimes(1)
  })
})
