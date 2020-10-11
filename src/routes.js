import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TabMenu from './components/TabMenu'

import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import IMovelDetails from './screens/IMovelDetails'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" component={TabMenu} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignUp} />
        <Stack.Screen name="IMovelDetails" component={IMovelDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}