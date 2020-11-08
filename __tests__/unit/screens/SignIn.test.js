import React from 'react'
import { create, act } from 'react-test-renderer'
import SignIn from '../../../src/screens/SignIn'

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
jest.mock('../../../src/contexts/auth', () => {
  return {
    ...jest.requireActual('../../../src/contexts/auth'),
    useAuth: () => ({
      signIn: (email, password) => {
        return new Promise((resolve, reject) => {
          if (email === 'user@imovel.com' && password === '12345678') {
            resolve()
          } else {
            reject(new Error())
          }
        })
      }
    })
  }
})

describe('SignIn unit test', () => {
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

    const errorMessageText = tree.findByProps({ testID: 'errorMessageText' })
      .props
    expect(errorMessageText.children).toEqual(
      'Preencha todos os campos corretamente!'
    )
  })

  it('should do a login', async () => {
    const tree = create(<SignIn />)

    const email = tree.root.findByProps({ testID: 'signIn-email' }).props
    act(() => email.onChangeText('user@imovel.com'))

    const password = tree.root.findByProps({ testID: 'signIn-password' }).props
    act(() => password.onChangeText('12345678'))

    const button = tree.root.findByProps({ testID: 'signIn-button' }).props
    await act(async () => await button.onPress())

    expect(mockedGoBack).toHaveBeenCalledTimes(1)
  })

  it('should not do a login because email or password incorrect', async () => {
    const tree = create(<SignIn />)

    const email = tree.root.findByProps({ testID: 'signIn-email' }).props
    act(() => email.onChangeText('user@imovel.com'))

    const password = tree.root.findByProps({ testID: 'signIn-password' }).props
    act(() => password.onChangeText('incorrectPassword'))

    const button = tree.root.findByProps({ testID: 'signIn-button' }).props
    await act(async () => await button.onPress())

    expect(mockedGoBack).toHaveBeenCalledTimes(0)
  })
})
