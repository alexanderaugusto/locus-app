import React from 'react'
import { create } from 'react-test-renderer'
import { InputArea } from '../../../src/components'

jest.runAllTimers()

describe('InputArea snapshot test', () => {
  it('render InputArea component without icon and label correctly', () => {
    const tree = create(
      <InputArea
        placeholder={'Entre com o seu email'}
        keyboardType={'email-address'}
      />
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('render InputArea component with icon correctly', () => {
    const tree = create(
      <InputArea
        prefixIcon={'envelope'}
        placeholder={'Entre com o seu email'}
        keyboardType={'email-address'}
      />
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('render InputArea component with label correctly', () => {
    const tree = create(
      <InputArea
        label={'Email'}
        placeholder={'Entre com o seu email'}
        keyboardType={'email-address'}
      />
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('render InputArea password component', () => {
    const tree = create(
      <InputArea
        label={'Senha'}
        password={true}
        placeholder={'Entre com a sua senha'}
      />
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
