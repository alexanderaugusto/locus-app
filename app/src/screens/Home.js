import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import Header from '../components/Header'
import ImovelCard from '../components/ImovelCard'

import colors from '../consts/colors.json'

export default function Home() {

	listTest = {
		names: [
			{ 'id': 1, 'address': 'Rua Doutor Teodoro, Centro' },
			{ 'id': 2, 'address': 'Rua Doutora Maria, Centro' },
			{ 'id': 3, 'address': 'Rua Doutor Joaquin, Centro' },
			{ 'id': 4, 'address': 'Rua Doutor Miguel, Centro' },
			{ 'id': 5, 'address': 'Rua Doutor Pedro, Centro' }
		]
	}
	return (
		<>
			<Header title="Home" />

			<KeyboardAvoidingView
				behavior="padding"
				enabled={Platform.OS === 'ios'}
				style={styles.container}
			>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputText}
						placeholder="Pesquise por localidade..."
						placeholderTextColor="#999"
					/>
					<TouchableOpacity style={styles.inputButton}>
						<FontAwesome5
							name="search"
							size={16}
							color={colors["blue"]}
						/>
					</TouchableOpacity>
				</View>

				<ScrollView style={styles.scrollLis}
					showsVerticalScrollIndicator={false}
				>
					{listTest.names.map((item, index) => (
						<View key={item.id} style={styles.cardsContainer}>
							<ImovelCard address={item.address} />
						</View>
					))}
				</ScrollView>

			</KeyboardAvoidingView>

		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors["platinum"],
		paddingVertical: 10,
		paddingHorizontal: 30,
	},

	inputContainer: {
		backgroundColor: colors["white"],
		alignSelf: 'stretch',
		height: 46,
		borderWidth: 1,
		borderColor: colors["blue"],
		borderRadius: 4,
		marginTop: 10,
		marginBottom: 15,
		paddingHorizontal: 12,
		flexDirection: "row",
		justifyContent: 'space-between',
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: {
			height: 0,
			width: 0,
		},
		elevation: 2,
	},

	inputText: {
		paddingHorizontal: 10,
		paddingVertical: 10,
	},

	inputButton: {
		alignSelf: 'center',
	},

	cardsContainer: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center',
		maxHeight: 300,
		marginBottom: 15,
	},

})