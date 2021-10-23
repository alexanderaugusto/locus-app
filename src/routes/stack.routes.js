import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  SignIn,
  SignUp,
  PropertyDetail,
  ScheduleVisit,
  AddProperty,
  EditProperty
} from '../pages'
import AuthRoutes from './tab.routes'

const stackRoutes = createStackNavigator()

export default function AppRoutes() {
  return (
    <stackRoutes.Navigator
      headerMode="none"
      screenOptions={{ headerShown: false }}
    >
      <stackRoutes.Screen name="Home" component={AuthRoutes} />

      <stackRoutes.Screen name="SignUp" component={SignUp} />

      <stackRoutes.Screen name="SignIn" component={SignIn} />

      <stackRoutes.Screen name="PropertyDetail" component={PropertyDetail} />

      <stackRoutes.Screen name="ScheduleVisit" component={ScheduleVisit} />

      <stackRoutes.Screen name="AddProperty" component={AddProperty} />

      <stackRoutes.Screen name="EditProperty" component={EditProperty} />
    </stackRoutes.Navigator>
  )
}
