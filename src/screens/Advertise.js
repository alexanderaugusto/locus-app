import React, { useEffect, useState } from 'react'
import {
	KeyboardAvoidingView,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	TouchableWithoutFeedback,
	View,
	Image
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import api, { STORAGE_URL } from '../services/api'
import { formatCurrency, createRows } from '../utils/util'

import colors from '../constants/colors.json'
import FloatButton from '../components/FloatButton'

export default function Advertise() {
	const navigation = useNavigation()
	const route = useRoute()

	const [properties, setProperties] = useState([])

	const getProperties = async () => {
		const token = await AsyncStorage.getItem("user-token")
		if (!token) {
			navigation.reset({
				index: 0,
				routes: [{ name: "SignIn" }],
			})
			return
		}

		const config = {
			headers: {
				"Authorization": "Bearer " + token
			}
		}

		api.get(`/user/properties`, config)
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

	useEffect(() => {
		if (route.params?.reload)
			getProperties()
	}, [route.params])

	return (
		<KeyboardAvoidingView style={styles.container}>
			<Text numberOfLiner={2} style={styles.title}>Anúnciar</Text>

			<SafeAreaView style={styles.listContainer}>
				<FlatList
					data={createRows(properties, 2)}
					keyExtractor={item => item.id.toString()}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					renderItem={({ item }) => {
						if (item.empty) {
							return <View style={{ ...styles.card, elevation: 0, backgroundColor: "transparent" }} />
						}

						return (
							<TouchableWithoutFeedback
								onPress={() => console.log("clicou")}
							>
								<View style={styles.card}>
									<Image style={styles.cardImage} resizeMode="cover"
										source={{ uri: `${STORAGE_URL}/property/${item.images[0]?.path}` }} />
									<View style={styles.cardText}>
										<Text numberOfLines={1} ellipsizeMode='tail' style={styles.cardTitle}>{
											item.title}
										</Text>
										<View style={{ flexDirection: "row" }}>
											<Text numberOfLines={4} ellipsizeMode='tail' style={styles.cardDescription}>{
												item.description}
											</Text>
										</View>
										<Text style={styles.cardPrice}>{formatCurrency(item.price)}</Text>
									</View>
								</View>
							</TouchableWithoutFeedback>
						)
					}}
				/>
			</SafeAreaView>

			<FloatButton onPress={() => navigation.navigate("AddProperty")} />
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors["platinum"],
		paddingVertical: 10,
		paddingHorizontal: 20,
	},

	title: {
		margin: 10,
		fontSize: 28,
		fontWeight: "600",
		color: colors['yellow'],
		alignSelf: 'center',
	},

	listContainer: {
		flex: 1
	},

	card: {
		flexGrow: 1,
		flexBasis: 0,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		margin: 3,
		paddingHorizontal: 8,
		paddingVertical: 5,
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.8,
		elevation: 1,
	},

	cardImage: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		width: "100%",
		height: 120
	},

	cardTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors["blue"],
	},

	cardDescription: {
		fontSize: 14,
		color: colors["blue"],
	},

	cardPrice: {
		fontSize: 15,
		fontWeight: "bold",
		color: "green",
		marginTop: 5
	}
})