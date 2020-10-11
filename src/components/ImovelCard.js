import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import exemplo_house1 from '../../assets/img/exemplo_house1.jpg'
import exemplo_house2 from '../../assets/img/exemplo_house2.jpg'
import colors from '../consts/colors.json'

const CARD_WIDTH = Dimensions.get('window').width * 0.84
const CARD_HEIGHT = Dimensions.get('window').height * 0.27

export default function ImovelCard({ address, navigation }) {

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
				pagingEnabled
				decelerationRate={0}
				snapToInterval={CARD_WIDTH}
				snapToAlignment='center'
				showsHorizontalScrollIndicator={true}
				horizontal={true}
			>
				{listTest.image.map((item) => (
					<Image key={item.id} style={styles.images} resizeMode="cover" source={item.img} />
				))}
			</ScrollView>

			<View style={styles.favoriteIcon}>
				<TouchableOpacity style={styles.button}
					onPress={()=> navigation.navigate('IMovelDetails')}
				>
					<FontAwesome5 name={'heart'} size={18} color={colors['blue']} />
				</TouchableOpacity>
			</View>

			<View style={styles.infoContainer} >
				<Text style={styles.price}>Aluguel R$: 1.000,00</Text>
				<Text style={styles.address} numberOfLines={3}>{address}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderColor: '#bfbfbf',
		borderRadius: 24,
		overflow: 'hidden',
		backgroundColor: '#FFF',
	},

	scrollImages: {
		height: 180,
		maxWidth: '100%',
	},

	images: {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
	},

	infoContainer: {
		padding: 15,
		borderTopColor: '#bfbfbf',
		borderTopWidth: 2,
	},

	price: {
		fontSize: 16,
		fontWeight: '600',
		lineHeight: 20,
		color: '#000',
	},

	address: {
		paddingTop: 2,
		fontSize: 14,
		fontWeight: '500',
		color: '#999',
	},

	favoriteIcon: {
		margin: 10,
		alignSelf: 'flex-end',
		position: 'absolute',
	},

	button: {
		width: 40,
		height: 40,
		borderRadius: 25,
		borderWidth: 1,
		borderColor: colors['platinum'],
		backgroundColor: '#FFF',
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 7,
		elevation: 2,
		shadowColor: '#000',
		shadowOpacity: 0.08,
		shadowRadius: 2,
		shadowOffset: {
			width: 0,
			height: 2,
		}
	}
})