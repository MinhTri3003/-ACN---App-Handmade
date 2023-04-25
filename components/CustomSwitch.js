import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { constants, images, FONTS, SIZES, COLORS, icons } from '../constants';


export default function CustomSwitch({ value, onChange }) {
    const styles = StyleSheet.create({
        switchOnContainer: {
            width: 40,
            height: 20,
            paddingRight: 2,
            justifyContent: 'center',
            alignItems: 'flex-end',
            borderRadius: 10,
            backgroundColor: COLORS.primary
        },
        switchOffContainer: {
            width: 40,
            height: 20,
            paddingRight: 2,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.gray,
            borderRadius: 10
        },
        dot: {
            width: 12,
            height: 12,
            borderRadius: 6
        }
    })
    return (
        <TouchableWithoutFeedback
            onPress={() => onChange(!value)}
        >
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                {/* Switch */}
                <View
                    style={value ? styles.switchOnContainer : styles.switchOffContainer}
                >
                    <View
                        style={{
                            ...styles.dot,
                            backgroundColor: value ? COLORS.white : COLORS.gray
                        }}
                    />
                </View>
                {/* Text */}
                <Text
                    style={{
                        color: value ? COLORS.primary : COLORS.gray,
                        marginLeft: SIZES.base,
                        ...FONTS.body4
                    }}
                >
                    Nhớ tài khoản
                </Text>
            </View>

        </TouchableWithoutFeedback>
    )
}