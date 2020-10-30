import React from 'react'
import renderer from 'react-test-renderer'
import { ModalContact } from '../../../src/components'

jest.useFakeTimers()
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')

describe('Modal test', () => {
  it('render Modal component correctly', () => {
    const tree = renderer.create(<ModalContact />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
