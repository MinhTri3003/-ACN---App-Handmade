import { View, Image } from 'react-native'
import React from 'react'
import { COLORS, icons } from '../constants'

export default function FormInputCheck({ value, error }) {
    return (
        <View
            style={{
                justifyContent: 'center'
            }}
        >
            <Image
                source={(value == "" || (value != "" && error == "") ? icons.correct : icons.cancel)}
                style={{
                    height: 20,
                    width: 20,
                    tintColor: (value == "") ? COLORS.gray : (value != "" && error == "") ? COLORS.green : COLORS.red
                }}
            />
        </View>
    )
}