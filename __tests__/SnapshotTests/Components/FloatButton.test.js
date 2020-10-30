import React from 'react'
import { act, create } from 'react-test-renderer'
import { FloatButton } from '../../../src/components'

jest.useFakeTimers()
jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')

describe('FloatButton test', () => {

  it('render FloatButton component correctly', () => {
    act(() => {
      tree = create(
        <FloatButton />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot();
  })
})