import React from 'react'
import * as auth from '../../../src/contexts/auth'
import api from '../../../src/services/api'
import { create, act } from 'react-test-renderer'
import Account from '../../../src/screens/Account'

import mockedUser from '../../mocks/constants/user.json'

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate
    }),
    useRoute: () => ({
      route: jest.fn()
    })
  }
})
jest.mock('../../../src/services/api')

describe('Account unit test', () => {
  it('should render Account screen properties correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))

    api.get.mockResolvedValue({ data: mockedUser })

    const tree = create(<Account />)

    await new Promise(resolve => {
      setTimeout(() => resolve(), 2000)
      jest.runAllTimers()
    })

    const account = tree.root.findByProps({ testID: 'account' })
    expect(account).toBeDefined()
  })

  it('should render Account screen empty message correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: false
    }))

    const tree = create(<Account />)

    const emptyMessage = tree.root.findByProps({ testID: 'empty-message' })
    expect(emptyMessage).toBeDefined()
  })

  it('should called navigate when press the button', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: false
    }))

    const tree = create(<Account />)
    const button = tree.root.findByProps({ testID: 'account-empty-button' })
      .props
    await act(async () => await button.onPress())

    expect(mockedNavigate).toHaveBeenCalledTimes(1)
  })

  it('should show user name correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))
    const tree = create(<Account />)

    await new Promise(resolve => {
      setTimeout(() => resolve(), 2000)
      jest.runAllTimers()
    })

    const name = tree.root.findByProps({ testID: 'account-input-name' }).props
    expect(name.value).toBe(mockedUser.name)
  })

  it('should show user email correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))
    const tree = create(<Account />)

    await new Promise(resolve => {
      setTimeout(() => resolve(), 2000)
      jest.runAllTimers()
    })

    const email = tree.root.findByProps({ testID: 'account-input-email' }).props
    expect(email.value).toBe(mockedUser.email)
  })

  it('should show user phone correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))
    const tree = create(<Account />)

    await new Promise(resolve => {
      setTimeout(() => resolve(), 2000)
      jest.runAllTimers()
    })

    const phone = tree.root.findByProps({ testID: 'account-input-phone' }).props
    expect(phone.value).toBe(mockedUser.phone)
  })

  it('should show a specific error message when press button with empty name, email or phone values', () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))

    const tree = create(<Account />)

    const name = tree.root.findByProps({ testID: 'account-input-name' }).props
    act(() => name.onChangeText(''))

    const email = tree.root.findByProps({ testID: 'account-input-email' }).props
    act(() => email.onChangeText(''))

    const phone = tree.root.findByProps({ testID: 'account-input-phone' }).props
    act(() => phone.onChangeText(''))

    const button = tree.root.findByProps({ testID: 'account-save-button' })
      .props
    act(() => button.onPress())

    const errorMessageText = tree.root.findByProps({
      testID: 'account-errorMessageText'
    }).props
    expect(errorMessageText.children).toEqual(
      'Preencha todos os campos corretamente!'
    )
  })
})
