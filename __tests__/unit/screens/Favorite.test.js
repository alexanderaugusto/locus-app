import React from 'react'
import * as auth from '../../../src/contexts/auth'
import api from '../../../src/services/api'
import { create, act } from 'react-test-renderer'
import Favorite from '../../../src/screens/Favorite'

import mockedProperties from '../../mocks/constants/properties.json'

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

describe('Favorite unit test', () => {
  it('should render Favorite screen properties correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))

    api.get.mockResolvedValue({ data: mockedProperties })

    const tree = create(<Favorite />)

    await act(async () => {
      await new Promise(resolve => {
        setTimeout(() => resolve(), 2000)
        jest.runAllTimers()
      })
    })

    const favorites = tree.root.findByProps({ testID: 'favorites' })
    expect(favorites).toBeDefined()
  })

  it('should render Favorite screen empty message correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: false
    }))

    const tree = create(<Favorite />)

    const emptyMessage = tree.root.findByProps({ testID: 'empty-message' })
    expect(emptyMessage).toBeDefined()
  })
})
