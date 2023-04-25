import { View, Text, Platform } from 'react-native'
import React from 'react'
import { LinearGradient } from 'react-native-linear-gradient'
import { COLORS, FONTS, SIZES } from '../constants'

const FooterTotal = ({ subTotal, shippingFee, total, onPress }) => {
    return (
        <View>
            <LinearGradient
                start={{
                    x: 0,
                    y: 0
                }}
                end={{
                    x: 0,
                    y: -1
                }}
                colors={[COLORS.transparent, COLORS.lightGray1]}
                style={{
                    position: 'absolute',
                    top: -15,
                    left: 0,
                    right: 0,
                    height: Platform.OS === "ios" ? 200 : 50,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                }}
            />
            <View
                style={{
                    padding: SIZES.padding,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: COLORS.white
                }}
            >
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Text style={{ flex: 1, ...FONTS.body3 }}>Tổng sản phẩm</Text>
                    <Text style={{ ...FONTS.h3 }}>{"gias"}đ</Text>
                </View>

                <View>

                </View>

                <View>

                </View>
            </View>

        </View>
    )
}

export default FooterTotal