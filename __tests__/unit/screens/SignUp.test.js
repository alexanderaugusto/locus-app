import React from 'react'
import api from '../../../src/services/api'
import { create, act } from 'react-test-renderer'
import SignUp from '../../../src/screens/SignUp'

const mockedNavigate = jest.fn()
const mockedGoBack = jest.fn()

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack
    })
  }
})
jest.mock('../../../src/services/api')
jest.mock('../../../src/contexts/loading', () => {
  return {
    ...jest.requireActual('../../../src/contexts/loading'),
    useLoading: () => ({
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
      loading: jest.fn()
    })
  }
})

describe('SignUp unit test', () => {
  it('should create a new user', async () => {
    api.post.mockResolvedValue()

    const tree = create(<SignUp />)

    const nome = tree.root.findByProps({ testID: 'signUp-name-input' }).props
    act(() => nome.onChangeText('Nome do usuário'))

    const cpf = tree.root.findByProps({ testID: 'signUp-cpf-input' }).props
    act(() => cpf.onChangeText('11122233345'))

    const phone = tree.root.findByProps({ testID: 'signUp-phone-input' }).props
    act(() => phone.onChangeText('35999887766'))

    const nextButton1 = tree.root.findByProps({
      testID: 'signUp-next-button-1'
    }).props
    act(() => nextButton1.onNext())

    const email = tree.root.findByProps({ testID: 'signUp-email-input' }).props
    act(() => email.onChangeText('emailUser@teste.com.br'))

    const confirmEmail = tree.root.findByProps({
      testID: 'signUp-confirmEmail-input'
    }).props
    act(() => confirmEmail.onChangeText('emailUser@teste.com.br'))

    const nextButton2 = tree.root.findByProps({
      testID: 'signUp-next-button-2'
    }).props
    act(() => nextButton2.onNext())

    const password = tree.root.findByProps({ testID: 'signUp-password-input' })
      .props
    act(() => password.onChangeText('senhaTeste123'))

    const confirmPassword = tree.root.findByProps({
      testID: 'signUp-confirmPassword-input'
    }).props
    act(() => confirmPassword.onChangeText('senhaTeste123'))

    const nextButton3 = tree.root.findByProps({
      testID: 'signUp-next-button-3'
    }).props
    act(() => nextButton3.onNext())

    const submitButton = tree.root.findByProps({
      testID: 'signUp-submit-button'
    }).props
    await act(async () => await submitButton.onSubmit())

    expect(mockedNavigate).toHaveBeenCalledTimes(1)
  })
})
