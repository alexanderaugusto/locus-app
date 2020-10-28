import React from 'react'
import { act, create } from 'react-test-renderer'
import InputSelect from '../../../src/components/InputSelect'

jest.useFakeTimers()
jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')

describe('InputSelect test', () => {

  it('render InputSelect component correctly', () => {
    act(() => {
      tree = create(
        <InputSelect
          items={[
            { label: "Minas Gerais", value: "MG" },
            { label: "São Paulo", value: "SP" }
          ]}
          selectedValue="MG"
          menuTitle="Selecione um estado"
        />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot();
  })
})