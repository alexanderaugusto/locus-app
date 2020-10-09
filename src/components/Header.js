import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import colors from '../consts/colors.json'

export default function Header({ title }) {


    return (
        <>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/img/splash.png')} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors["blue"],
        width: "100%",
        height: "12%",
        minHeight: 70,
        maxHeight: 120,
        padding: 15,
        paddingBottom: 18,
        alignItems: "center",        
        flexDirection: "row",
    },

    title: {
        color: colors["white"],
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        paddingLeft: 100,
        marginBottom: -15,
    },

    logo: {
        height: 40,
        width: 40,
        marginBottom: -15,
    },
})