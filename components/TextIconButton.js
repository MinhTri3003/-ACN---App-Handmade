import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTS, COLORS } from '../constants'

export default function TextIconButton({
    containerStyle,
    label,
    labelStyle,
    icon,
    iconPosition,
    iconStyle,
    onPress
}) {
    const style = StyleSheet.create({
        image: {
            marginLeft: 5,
            width: 20,
            height: 20,
            tintColor: COLORS.black
        }
    })
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle
            }}
            onPress={onPress}
        >
            {iconPosition == "LEFT" &&
                <Image
                    source={icon}
                    style={{
                        ...style.image,
                        ...iconStyle
                    }}
                />
            }
            <Text
                style={{
                    ...FONTS.body3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
            {iconPosition == "RIGHT" &&
                <Image
                    source={icon}
                    style={{
                        ...style.image,
                        ...iconStyle
                    }}
                />
            }
        </TouchableOpacity>
    )
}