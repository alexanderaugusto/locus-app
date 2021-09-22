import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/MaterialIcons'

import { Home, Favorite, Account, Advertise } from '../pages'
import colors from '../utils/constants/colors.json'

const tabRoutes = createBottomTabNavigator()

export default function AuthRoutes() {
  return (
    <tabRoutes.Navigator
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
        activeTintColor: colors.blue,
        inactiveTintColor: colors.h2,
        style: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
          backgroundColor: colors['light-secondary']
        }
      }}
    >
      <tabRoutes.Screen name="Home" component={Home} />
      <tabRoutes.Screen name="Favoritos" component={Favorite} />
      <tabRoutes.Screen name="Anunciar" component={Advertise} />
      <tabRoutes.Screen name="Minha conta" component={Account} />
    </tabRoutes.Navigator>
  )
}
