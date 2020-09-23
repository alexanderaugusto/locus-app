import React from 'react'
import { KeyboardAvoidingView, View, ScrollView, StyleSheet, TextInput, Text, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import Header from '../components/Header'

import colors from '../consts/colors.json'
import exemplo_house1 from '../../assets/img/exemplo_house1.jpg'

export default function Home() {
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
                    <FontAwesome5
                        style={styles.inputIcon}
                        name="search"
                        size={16}
                        color={colors["blue"]}
                    />
                </View>


                <View style={styles.cardsContainer}>
                    <View style={[styles.card]}>
                        <Image style={styles.images} resizeMode="cover" source={exemplo_house1} />
                        <View style={styles.footer} >
                            <Text style={styles.name}>Aluguel R$: 1.000,00</Text>
                            <Text style={styles.address} numberOfLines={3}>Rua Doutor Teodoro, Centro</Text>
                        </View>
                    </View>
                </View>

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
        paddingHorizontal: 15,
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

    inputIcon: {
        alignSelf: 'center',
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 300,
    },

    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 24,
        marginTop: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    images: {
        flex: 1,
        alignSelf: 'center',
        height: '100%',
        width: '100%'
    },

    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
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