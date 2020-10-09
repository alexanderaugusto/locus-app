import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import colors from '../consts/colors.json'

export default function InputArea({ icon, placeholder, password, keyboardType }) {
    return (
        <View style={styles.inputContainer}>
            <FontAwesome
                style={styles.button}
                name={icon}
                size={18}
                color={colors["black"]}
            />

            <TextInput
                style={styles.inputText}
                placeholder={placeholder}               
                placeholderTextColor="#d2d2d2"               
                secureTextEntry={password} 
                keyboardType={keyboardType}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: colors["white"],
        alignSelf: 'stretch',
        height: 46,
        borderWidth: 1,
        borderColor: colors["blue"],
        borderRadius: 24,
        marginTop: 15,       
        paddingHorizontal: 12,
        flexDirection: "row",        
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },

    inputText: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },

    button: {
        alignSelf: 'center',
        paddingHorizontal: 5,
    },
})