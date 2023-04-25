import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FONTS, SIZES, COLORS, icons } from '../../constants'

export default function CardItem({ item, isSelected, onPress }) {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 100,
                alignItems: 'center',
                marginTop: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                borderWidth: 2,
                borderRadius: SIZES.radius,
                borderColor: isSelected ? COLORS.primary : COLORS.lightGray2
            }}
            onPress={onPress}
        >
            {/* Card Image */}
            <View
                style={{
                    width: 60,
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderRadius: SIZES.padding,
                    borderColor: COLORS.lightGray2
                }}
            >
                <Image
                    source={item.icon}
                    resizeMode='center'
                    style={{
                        width: 35,
                        height: 35
                    }}
                />
            </View>
            {/* Card Name */}
            <Text
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    ...FONTS.h3
                }}
            >
                {item.name}
            </Text>
            {/* Radio Button */}

            <Image
                source={isSelected ? icons.check_on : icons.check_off}
                // source={icons.check_on}
                style={{
                    height: 20,
                    width: 20
                }}
            />
        </TouchableOpacity>
    )
}