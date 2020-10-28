import React from 'react'
import { act, create } from 'react-test-renderer'
import ImagePicker from '../../../src/components/ImagePicker'

jest.useFakeTimers()

describe('ImagePicker test', () => {

  it('render ImagePicker component correctly', () => {
    act(() => {
      tree = create(
        <ImagePicker>
         
        </ImagePicker>
      )
    })

    expect(tree.toJSON()).toMatchSnapshot();
  })
})