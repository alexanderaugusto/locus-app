import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Favorite from '../screens/Favorite'
import Warning from '../screens/Warning'

import colors from '../constants/colors.json'

const Tab = createBottomTabNavigator()

export default function TabMenu() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					const icons = {
						"Home": "home",
						"Favoritos": "favorite",
						"Perfil": "person",
					}

					return <Icon name={icons[route.name]} size={size} color={color} />
				},
			})}
			tabBarOptions={{
				activeTintColor: colors["yellow"],
				inactiveTintColor: colors["platinum"],
				style: { paddingBottom: 10, paddingTop: 10, height: 60, backgroundColor: colors["blue"] }
			}}
		>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Favoritos" component={Warning} />
			<Tab.Screen name="Perfil" component={Profile} />
		</Tab.Navigator>
	)
}
