import { View, Text, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, images, SIZES } from '../../constants'
import TextButton from '../../components/TextButton'

export default function Success({ navigation }) {


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        })
        return () => backHandler.remove()
    })
    return (
        <View
            style={{
                marginTop: SIZES.padding * 2,
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.success}
                    style={{
                        width: 150,
                        height: 150
                    }}
                    resizeMode='contain'
                />
                <Text
                    style={{
                        marginTop: SIZES.padding,
                        ...FONTS.h3
                    }}
                >
                    CHÚC MỪNG BẠN MUA HÀNG THÀNH CÔNG!!!
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: SIZES.base,
                        color: COLORS.darkGray,
                        ...FONTS.body4
                    }}
                >
                    Thanh toán đã được thực hiện thành công!
                </Text>
            </View>
            <TextButton
                label={"DONE"}
                buttonContainerStyle={{
                    height: 55,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                onPress={() => { navigation.navigate("MainLayout") }}
            />
        </View>
    )
}