import React from 'react'
import * as auth from '../../../src/contexts/auth'
import api from '../../../src/services/api'
import { create } from 'react-test-renderer'
import Account from '../../../src/screens/Account'

import mockedUser from '../../mocks/constants/user.json'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
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
})
