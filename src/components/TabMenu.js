import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Favorite from '../screens/Favorite'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import ImagePickerFunction from './ImagePicker'
import LocationFunction from './Location'

import colors from '../consts/colors.json'

const Tab = createBottomTabNavigator()

export default function TabMenu() {
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
