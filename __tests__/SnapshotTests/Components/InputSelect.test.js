import React from 'react'
import { create } from 'react-test-renderer'
import { InputSelect } from '../../../src/components'

jest.runAllTimers()

describe('InputSelect snapshot test', () => {
  it('render InputSelect component correctly', () => {
    const tree = create(
      <InputSelect
        items={[
          { label: 'Minas Gerais', value: 'MG' },
          { label: 'São Paulo', value: 'SP' }
        ]}
        selectedValue="MG"
        menuTitle="Selecione um estado"
      />
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
