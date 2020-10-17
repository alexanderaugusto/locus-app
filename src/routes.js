import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TabMenu from './components/TabMenu'
import Warning from './screens/Warning'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import IMovelDetails from './screens/IMovelDetails'
import SignUpImovel from './screens/SignUpImovel'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabMenu} />
        <Stack.Screen name="Warning" component={Warning} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUpImovel" component={SignUpImovel} />
        <Stack.Screen name="IMovelDetails" component={IMovelDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}