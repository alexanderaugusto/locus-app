import React from 'react'
import { act, create } from 'react-test-renderer'
import { ImagePickerFunction } from '../../../src/components'

jest.useFakeTimers()
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')

describe('ImagePicker test', () => {
  it('render ImagePicker component correctly', () => {
    const tree = create(<ImagePickerFunction></ImagePickerFunction>)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
