import React from 'react'
import { act, create } from 'react-test-renderer'
import EditTextField from '../../../src/components/EditTextField'

describe('<EditTextField />', () => {

  it('render correctly with edit equals false', () => {
    act(() => {
      tree = create(
        <EditTextField
          label={'Celular: '}
          text={'(35) 99988-7766'}
          keyboardType={'phone-pad'}
          edit={false}
        />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('render correctly with edit equals true', () => {
    act(() => {
      tree = create(
        <EditTextField
          label={'Celular: '}
          text={'(35) 99988-7766'}
          keyboardType={'phone-pad'}
          edit={true}
        />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})