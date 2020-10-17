import React from 'react'
import { act, create } from 'react-test-renderer'
import Warning from '../../../src/screens/Warning'

jest.useFakeTimers()
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon')

describe('<Warning />', () => {

  it('render correctly', () => {
    act(() => { tree = create(<Warning />) })

    expect(tree.toJSON()).toMatchSnapshot()
  })


})