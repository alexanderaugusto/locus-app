import React from 'react'
import * as auth from '../../../src/contexts/auth'
import api from '../../../src/services/api'
import { create } from 'react-test-renderer'
import Home from '../../../src/screens/Home'

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

describe('Home unit test', () => {
  it('should render Home screen properties correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))

    api.get.mockResolvedValue({ data: mockedProperties })

    const tree = create(<Home />)

    await new Promise(resolve => {
      setTimeout(() => resolve(), 2000)
      jest.runAllTimers()
    })

    const home = tree.root.findByProps({ testID: 'home' })
    expect(home).toBeDefined()
  })
})
