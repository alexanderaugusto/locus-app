jest.useFakeTimers()

jest.mock('@expo/vector-icons/FontAwesome5', () => 'Icon')
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage')

global.FormData = () => {
  return {
    append: jest.fn()
  }
}
