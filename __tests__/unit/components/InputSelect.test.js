import React from 'react'
import { create } from 'react-test-renderer'
import { InputSelect } from '../../../src/components'

jest.runAllTimers()

const statesList = [
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Rio de Janeiro', value: 'RJ' }
]

describe('InputSelect unit test', () => {
  it('the initial select input must be Minas Gerais', () => {
    const tree = create(
      <InputSelect items={statesList} menuTitle="Selecione um estado" />
    ).root
    const labelText = tree.findByProps({ testID: 'inputSelect-label' }).props

    expect(labelText.children).toEqual('Minas Gerais')
  })
  it('text that show menuTitle should be equal a Selecione um estado', () => {
    const tree = create(
      <InputSelect items={statesList} menuTitle="Selecione um estado" />
    ).root
    const menuTitleText = tree.findByProps({ testID: 'inputSelect-menuTitle' })
      .props

    expect(menuTitleText.children).toEqual('Selecione um estado')
  })
})
