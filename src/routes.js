import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TabMenu  from './components/TabMenu'

import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import PropertyDetail from './screens/PropertyDetail'
import AddProperty from './screens/AddProperty'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabMenu} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
        <Stack.Screen name="AddProperty" component={AddProperty} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}