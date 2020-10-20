import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import api from '../services/api'

export default function Advertise() {
	const navigation = useNavigation()

	const [properties, setProperties] = useState([])

	const getProperties = async () => {
		const token = await AsyncStorage.getItem("user-token")
		if (!token) {
			navigation.navigate("SignIn", { backPath: "Properties" })
			return
		}

		const config = {
			headers: {
				"Authorization": "Bearer " + token
			}
		}

		api.get(`/user/${user.id}/properties`, config)
			.then((res) => {
				setProperties(res.data)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	useEffect(() => {
		getProperties()
	}, [])

	console.log(properties)

	return (
		<KeyboardAvoidingView>
			<Text>Its Properties Screen</Text>
		</KeyboardAvoidingView>
	)
}