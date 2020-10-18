import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, StackActions } from '@react-navigation/native'
import api from '../services/api'

export default function Favorite() {
	const navigation = useNavigation()

	const [favorites, setFavorites] = useState([])

	const getFavorites = async () => {
		const user = await AsyncStorage.getItem("user-info")
		if (!user) {
			navigation.navigate("Warning", { backPath: "Home" })
			return
		}

		const config = {
			headers: {
				'Authorization': 'Bearer' + user.token
			}
		}

		api.put(`/user/favorites`, null, config)
			.then((res) => {
				setFavorites(res.data)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	useEffect(() => {
		getFavorites()
	}, [])

	console.log(favorites)

	return (
		<KeyboardAvoidingView>
			<Text>Its Favorite Screen</Text>
		</KeyboardAvoidingView>
	)
}