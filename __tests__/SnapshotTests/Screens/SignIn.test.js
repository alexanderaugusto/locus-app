import React from 'react'
import { act, create } from 'react-test-renderer'
import SignIn from '../../../src/screens/SignIn'

jest.useFakeTimers()
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon')

describe('<SignIn />', () => {
  it('render correctly', () => {
    act(() => { tree = create(<SignIn />) })

    expect(tree.toJSON()).toMatchSnapshot()
  })

})