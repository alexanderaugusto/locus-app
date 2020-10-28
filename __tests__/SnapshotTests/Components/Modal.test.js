import React from 'react'
import renderer from 'react-test-renderer'
import Modal from '../../../src/components/Modal'

describe('Modal Component', () => {

    it('renders correctly', () => {
        const component = renderer.create(<Modal />)
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

})