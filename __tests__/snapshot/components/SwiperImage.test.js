import React from 'react'
import { create } from 'react-test-renderer'
import { SwiperImage } from '../../../src/components'

jest.runAllTimers()

describe('SwiperImage snapshot test', () => {
  it('render SwiperImage component correctly', () => {
    const tree = create(
      <SwiperImage
        images={[
          {
            id: 1,
            path: '44787f89b5bddb4ed318cadd74b11b13-property1_img1.jpg',
            createdAt: '2020-10-18T13:59:30.771Z',
            updatedAt: '2020-10-18T13:59:30.771Z',
            property_id: 1
          },
          {
            id: 2,
            path: 'b0881d860264b258b075452ecdc8611f-property1_img2.jpg',
            createdAt: '2020-10-18T13:59:30.771Z',
            updatedAt: '2020-10-18T13:59:30.771Z',
            property_id: 1
          },
          {
            id: 3,
            path: '3b8f454f5ec946176577ab1e73c17b27-property1_img3.jpg',
            createdAt: '2020-10-18T13:59:30.771Z',
            updatedAt: '2020-10-18T13:59:30.771Z',
            property_id: 1
          },
          {
            id: 4,
            path: '27c1852232a894cf4956c90e8e172ef5-property1_img4.jpg',
            createdAt: '2020-10-18T13:59:30.771Z',
            updatedAt: '2020-10-18T13:59:30.771Z',
            property_id: 1
          }
        ]}
      />
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
