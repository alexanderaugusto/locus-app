import React from 'react'
import Icon from '@expo/vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Favorite from '../screens/Favorite'
import Advertise from '../screens/Advertise'
import Account from '../screens/Account'

import colors from '../constants/colors.json'

const Tab = createBottomTabNavigator()

export default function TabMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Favoritos: 'favorite',
            Anunciar: 'loyalty',
            'Minha conta': 'person'
          }

          return <Icon name={icons[route.name]} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: colors.yellow,
        inactiveTintColor: colors.platinum,
        style: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
          backgroundColor: colors.blue
        }
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favoritos" component={Favorite} />
      <Tab.Screen name="Anunciar" component={Advertise} />
      <Tab.Screen name="Minha conta" component={Account} />
    </Tab.Navigator>
  )
}
