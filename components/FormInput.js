import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { constants, images, FONTS, SIZES, COLORS, icons } from '../constants';

export default function FormInput({
    containerStyles,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    readonly,
    secureTextEntry,
    keyboardType = 'default',
    autoCompleteType = "off",
    autoCapitalixe = "none",
    errorMsg = "",
    setValue,
    maxlenght
}) {
    return (
        <View
            style={{
                ...containerStyles
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-between"
                }}
            >
                <Text style={{
                    color: COLORS.gray,
                    ...FONTS.body4
                }}>{label}</Text>
                <Text style={{
                    color: COLORS.gray,
                    ...FONTS.body4
                }}>{errorMsg}</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    height: 55,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                <Text>{prependComponent}</Text>
                <TextInput
                    style={{
                        flex: 1,
                        ...inputStyle
                    }}
                    value={setValue}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalixe}
                    onChangeText={(text) => onChange(text)}
                    readonly={readonly}
                    maxLength={maxlenght}

                />
                {appendComponent}

            </View>
        </View>
    )
}