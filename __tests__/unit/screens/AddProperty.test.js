import React from 'react'
import api from '../../../src/services/api'
import { create, act } from 'react-test-renderer'
import AddProperty from '../../../src/screens/AddProperty'

const mockedNavigate = jest.fn()
const mockedGoBack = jest.fn()

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack
    })
  }
})
jest.mock('../../../src/services/api')
jest.mock('../../../src/contexts/loading', () => {
  return {
    ...jest.requireActual('../../../src/contexts/loading'),
    useLoading: () => ({
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
      loading: jest.fn()
    })
  }
})

describe('AddProperty unit test', () => {
  it('should create a new property', async () => {
    api.post.mockResolvedValue()

    const tree = create(<AddProperty />)

    const title = tree.root.findByProps({ testID: 'title-input' }).props
    act(() => title.onChangeText('Título do apartamento'))

    const description = tree.root.findByProps({ testID: 'description-input' })
      .props
    act(() => description.onChangeText('Descrição do apartamento'))

    const nextButton1 = tree.root.findByProps({ testID: 'next-button-1' }).props
    act(() => nextButton1.onNext())

    const street = tree.root.findByProps({ testID: 'street-input' }).props
    act(() => street.onChangeText('Rua do apartamento'))

    const neighborhood = tree.root.findByProps({ testID: 'neighborhood-input' })
      .props
    act(() => neighborhood.onChangeText('Bairro do apartamento'))

    const city = tree.root.findByProps({ testID: 'city-input' }).props
    act(() => city.onChangeText('Cidade do apartamento'))

    const state = tree.root.findByProps({ testID: 'state-input' }).props
    act(() =>
      state.onChange({
        label: 'Amapá (AP)',
        value: 'AP'
      })
    )

    const nextButton2 = tree.root.findByProps({ testID: 'next-button-2' }).props
    act(() => nextButton2.onNext())

    const type = tree.root.findByProps({ testID: 'type-input' }).props
    act(() =>
      type.onChange({
        label: 'Casa',
        value: 'Casa'
      })
    )

    const bedrooms = tree.root.findByProps({ testID: 'bedrooms-input' }).props
    act(() => bedrooms.onChangeText('Quartos do apartamento'))

    const bathrooms = tree.root.findByProps({ testID: 'bathrooms-input' }).props
    act(() => bathrooms.onChangeText('Banheiros do apartamento'))

    const area = tree.root.findByProps({ testID: 'area-input' }).props
    act(() => area.onChangeText('Area do apartamento'))

    const place = tree.root.findByProps({ testID: 'place-input' }).props
    act(() => place.onChangeText('Vagas do apartamento'))

    const animal = tree.root.findByProps({ testID: 'animal-input' }).props
    act(() => animal.onChange({ label: 'Sim', value: true }))

    const nextButton3 = tree.root.findByProps({ testID: 'next-button-3' }).props
    act(() => nextButton3.onNext())

    const nextButton4 = tree.root.findByProps({ testID: 'next-button-4' }).props
    act(() => nextButton4.onNext())

    const price = tree.root.findByProps({ testID: 'price-input' }).props
    act(() => price.onChangeText('Preço do apartamento'))

    const submitButton = tree.root.findByProps({ testID: 'submit-button' })
      .props
    await act(async () => await submitButton.onSubmit())

    expect(mockedNavigate).toHaveBeenCalledTimes(1)
  })
})
