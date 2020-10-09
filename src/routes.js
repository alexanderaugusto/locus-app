import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import colors from './consts/colors.json'

import Home from './screens/Home'
import Profile from './screens/Profile'
import Favorite from './screens/Favorite'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import ImagePickerFunction from './components/ImagePicker' 
import LocationFunction from './components/Location' 

const Tab = createBottomTabNavigator()

const TabMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            "Home": "home",
            "Favorite": "favorite",
            "Profile": "person",
          }

          return <MaterialIcons name={icons[route.name]} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: colors["yellow"],
        inactiveTintColor: colors["platinum"],              
        style: { paddingBottom: 10, paddingTop: 10, height: 60, backgroundColor: colors["blue"] }
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Profile" component={Profile} />      
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" component={TabMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}