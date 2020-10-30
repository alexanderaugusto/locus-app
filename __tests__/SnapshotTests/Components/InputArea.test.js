import React from 'react'
import { act, create } from 'react-test-renderer'
import { InputArea } from '../../../src/components'

jest.useFakeTimers()
jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')

describe('InputArea test', () => {
  it('render InputArea component without icon and label correctly', () => {
    act(() => {
      tree = create(
        <InputArea
          placeholder={'Entre com o seu email'}
          keyboardType={'email-address'}
        />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('render InputArea component with icon correctly', () => {
    act(() => {
      tree = create(
        <InputArea
          prefixIcon={'envelope'}
          placeholder={'Entre com o seu email'}
          keyboardType={'email-address'}
        />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('render InputArea component with label correctly', () => {
    act(() => {
      tree = create(
        <InputArea
          label={'Email'}
          placeholder={'Entre com o seu email'}
          keyboardType={'email-address'}
        />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
