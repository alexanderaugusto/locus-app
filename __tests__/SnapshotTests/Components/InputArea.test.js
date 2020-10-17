import React from 'react'
import { act, create } from 'react-test-renderer'
import InputArea from '../../../src/components/InputArea'

jest.useFakeTimers()
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon')

describe('<InputArea />', () => {

  it('render correctly', () => {
    act(() => {
      tree = create(
        <InputArea
          icon={'envelope'}
          placeholder={'Entre com o seu email'}
          keyboardType={'email-address'}
          password={false}
        />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot();
  })
})