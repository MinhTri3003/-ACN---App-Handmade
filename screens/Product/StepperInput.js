import { View, Text } from 'react-native'
import React from 'react'

import { COLORS, FONTS, icons, SIZES } from '../../constants'
import TextIconButton from '../../components/TextIconButton'
import { Image } from 'react-native'

export default function StepperInput({
    containerStyle,
    value,
    onAdd,
    onMinus
}) {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 50,
                width: 100,
                backgroundColor: COLORS.lightGray1,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
        >


            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: SIZES.base,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <TextIconButton
                        icon={icons.minus}
                        iconStyle={{
                            height: 15,
                            width: 15,
                            tintColor: value > 0 ? COLORS.primary : COLORS.gray
                        }}
                        iconPosition={"LEFT"}
                        onPress={onMinus}
                    />
                </View>
                <Text style={{ ...FONTS.h3 }}>{value}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: SIZES.base,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <TextIconButton
                        icon={icons.plus}
                        iconStyle={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.primary
                        }}
                        iconPosition={"RIGHT"}
                        onPress={onAdd}
                    />
                </View>
            </View>


        </View>
    )
}