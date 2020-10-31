import React from 'react'
import { create, act } from 'react-test-renderer'
import SignIn from '../../../src/screens/SignIn'

jest.useFakeTimers()
jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})

describe('SignIn test', () => {

  it('render SignIn screen correctly', () => {
    const tree = create(<SignIn />)
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('email value should be empty', () => {
    const tree = create(<SignIn />).root
    const email = tree.findByProps({ testID: 'signIn-email' }).props
    expect(email.value).toBe('')
  })

  it('password value should be empty', () => {
    const tree = create(<SignIn />).root
    const password = tree.findByProps({ testID: 'signIn-password' }).props
    expect(password.value).toBe('')
  })

  it('show a specific error message when press button with empty email and password values', () => {
    const tree = create(<SignIn />).root
    const button = tree.findByProps({ testID: 'signIn-button' }).props
    act(() => button.onPress())

    const errorMessageText = tree.findByProps({ testID: 'errorMessageText' }).props
    expect(errorMessageText.children).toEqual('Preencha todos os campos corretamente!')
  })

  // it('show a specific error message when press button with wrong email and password', () => {
  //   const tree = create(<SignIn />).root

  //   const email = tree.findByProps({ testID: 'signIn-email' }).props
  //   act(() => email.onChangeText('teste@email.com'))

  //   const password = tree.findByProps({ testID: 'signIn-password' }).props
  //   act(() => password.onChangeText('testeSenhaIncorreta'))

  //   const button = tree.findByProps({ testID: 'signIn-button' }).props
  //   act(() => button.onPress())

  //   const errorMessageText = tree.findByProps({ testID: 'errorMessageText' }).props
  //   expect(errorMessageText.children).toEqual('Algo deu errado, tente novamente!')
  // })

})
