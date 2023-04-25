import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { constants, images, FONTS, SIZES, COLORS } from '../constants'

export default function TextButton({ label, disabel, labelStyle, onPress, buttonContainerStyle, label2 = "", labelStyle2 }) {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...buttonContainerStyle
            }}
            onPress={onPress}
            disabled={disabel}
        >
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >{label}</Text>

            {label2 != "" &&
                <Text
                    style={{
                        flex: 1,
                        textAlign: 'right',
                        color: COLORS.white,
                        ...FONTS.h3,
                        ...labelStyle2
                    }}
                >
                    {label2}
                </Text>
            }

        </TouchableOpacity>
    )
}