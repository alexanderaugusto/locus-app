import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import exemplo_house1 from '../../assets/img/exemplo_house1.jpg'
import exemplo_house2 from '../../assets/img/exemplo_house2.jpg'
import colors from '../consts/colors.json'


const CARD_WIDTH = Dimensions.get('window').width * 0.84
const CARD_HEIGHT = Dimensions.get('window').height * 0.27

export default function ImovelCard({ address, city }) {

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

			<View style={styles.infoContainer} >
				<Text style={styles.type}>Casa</Text>
				<Text style={styles.address} numberOfLines={3}>{address}</Text>
				<Text style={styles.city} numberOfLines={3}>{city}</Text>
				<View style={styles.footerContainer}>					
					<Text style={styles.price}>Aluguel R$: 1.000,00</Text>
					<View style={styles.buttonsContainer}>
						{/* <TouchableOpacity style={styles.button} >
							<FontAwesome5 name={'trash-alt'} size={18} color={colors['blue']} />
						</TouchableOpacity> */}
						<TouchableOpacity style={styles.button}>
							<FontAwesome5 name={'heart'} size={18} color={colors['blue']} />
						</TouchableOpacity>
					</View>
				</View>
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
		height: 180,
		maxWidth: '100%',
	},

	images: {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
	},

	infoContainer: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderTopColor: colors['platinum'],
		borderTopWidth: 1.5,
	},

	type: {
		fontSize: 12,
		fontWeight: '300',
		color: "#999",
		marginBottom: 5,
	},

	address: {
		fontSize: 18,
		fontWeight: '600',
		lineHeight: 20,
		color: colors['black'],		
	},

	city: {
		fontSize: 16,
		fontWeight: '400',
		color: colors['black'],
	},

	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',		
	},

	price: {
		fontSize: 14,
		fontWeight: '400',
		color: '#333',
		alignSelf: 'center'
	},

	buttonsContainer: {
		flexDirection: 'row',		
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