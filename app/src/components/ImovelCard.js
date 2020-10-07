import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import exemplo_house1 from '../../assets/img/exemplo_house1.jpg'
import exemplo_house2 from '../../assets/img/exemplo_house2.jpg'
import colors from '../consts/colors.json'

export default function ImovelCard({ address }) {

	listTest = {
		image: [
			{ 'id': 1, 'img': exemplo_house1 },
			{ 'id': 2, 'img': exemplo_house2 },
			{ 'id': 3, 'img': exemplo_house1 },
			{ 'id': 4, 'img': exemplo_house2 },
		]
	}

	return (
		<View style={[styles.card]} >
			<ScrollView 
				style={styles.scrollImages}
				showsHorizontalScrollIndicator={true}
				horizontal={true}
			>
				{listTest.image.map((item, index) => (
					<Image key={item.id} style={styles.images} resizeMode="cover" source={item.img} />
				))}
			</ScrollView>

			<View style={styles.infoArea} >
				<Text style={styles.name}>Aluguel R$: 1.000,00</Text>
				<Text style={styles.address} numberOfLines={3}>{address}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderColor: '#DDD',
		borderRadius: 24,
		overflow: 'hidden',
		backgroundColor: '#FFF',
	},

	scrollImages: {
		maxHeight: 180,
		maxWidth: '100%',
	},

	images: {		
		resizeMode: "contain",
		height: 180,
		width: 313
	},

	infoArea: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderTopColor: colors['platinum'],
		borderTopWidth: 1.5,
	},

	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
	},

	address: {
		fontSize: 14,
		color: '#999',
		marginTop: 5,
		lineHeight: 18,
	},
})