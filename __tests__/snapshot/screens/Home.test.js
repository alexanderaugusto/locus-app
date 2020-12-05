import React from 'react'
import api from '../../../src/services/api'
import { create } from 'react-test-renderer'
import Home from '../../../src/screens/Home'

import mockedProperties from '../../mocks/constants/properties.json'

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
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

describe('Home snapshot test', () => {
  api.get.mockResolvedValue({ data: mockedProperties })

  it('render Home screen correctly', async () => {
    const tree = create(<Home />)

    await new Promise(resolve => {
      setTimeout(() => resolve(), 2000)
      jest.runAllTimers()
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
