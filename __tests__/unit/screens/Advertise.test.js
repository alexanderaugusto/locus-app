import React from 'react'
import * as auth from '../../../src/contexts/auth'
import api from '../../../src/services/api'
import { create } from 'react-test-renderer'
import Advertise from '../../../src/screens/Advertise'

const mockedAdvertises = [
  {
    id: 1,
    title: 'Casa para alugar com 2 quartos',
    description:
      'Aconchegante casa para alugar com 3 quartos e 1 banheiro no total. É bem localizado, próximo a pontos de interesse de Liberdade, tais como Estação Liberdade, Estação Sé. etc',
    street: 'Rua Conselheiro Furtado',
    neighborhood: 'Liberdade',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    price: 2143,
    bedrooms: 3,
    bathrooms: 1,
    area: 64,
    place: 3,
    animal: true,
    type: 'Apartamento',
    createdAt: '2020-10-18T13:59:30.708Z',
    updatedAt: '2020-10-18T13:59:30.708Z',
    user_id: 1,
    images: [
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
    ]
  }
]

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    }),
    useRoute: () => ({
      route: jest.fn()
    })
  }
})
jest.mock('../../../src/services/api')

describe('Advertise snapshot test', () => {
  it('should render Advertise screen properties correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: true
    }))

    api.get.mockResolvedValue({ data: mockedAdvertises })

    const tree = create(<Advertise />)

    await new Promise(resolve => {
      setTimeout(() => resolve(), 2000)
      jest.runAllTimers()
    })

    const advertises = tree.root.findByProps({ testID: 'advertises' })
    expect(advertises).toBeDefined()
  })

  it('render Advertise screen empty message correctly', async () => {
    jest.spyOn(auth, 'useAuth').mockImplementation(() => ({
      signed: false
    }))

    const tree = create(<Advertise />)

    const emptyMessage = tree.root.findByProps({ testID: 'empty-message' })
    expect(emptyMessage).toBeDefined()
  })
})
