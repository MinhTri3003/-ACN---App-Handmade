import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import TextButton from "../../components/TextButton";

import { constants, images, FONTS, SIZES, COLORS, icons } from '../../constants';
import AuthLayout from './AuthLayout';

const Otp = ({ navigation, route }) => {
    const [time, setTime] = useState(60)
    useEffect(() => {
        let interval = setInterval(() => {
            setTime(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1
                }
                else {
                    return prevTimer
                }
            })
        }, 1000);
        return () => clearInterval(interval)
    })

    return (
        <AuthLayout
            title={"OTP Authentication"}
            subtitle={"Một mã được gửi đến \n" + route.params.email}
            titleContainerStyle={{
                // marginTop: SIZES.padding * 2
            }}
        >
            <View
                style={{
                    flex: 1,
                    marginTop: SIZES.padding * 2
                }}
            >
                <OTPInputView
                    pinCount={4}
                    style={{
                        width: "100%",
                        height: 50
                    }}
                    codeInputFieldStyle={{
                        width: 65,
                        height: 65,
                        // margin: "12%",
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                    onCodeFilled={(code) => {
                        console.log(code);
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >
                        Didn't receive code?
                    </Text>
                    <TextButton
                        label={`Resend (${time}s)`}
                        disabel={time == 0 ? false : true}
                        buttonContainerStyle={{
                            marginLeft: SIZES.base,
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => {
                            setTime(60)

                            // console.log(email);
                        }}
                    />
                </View>
                {/* Footer */}
                <View
                    style={{
                        marginTop: "100%"
                    }}
                >
                    <TextButton
                        label={"Tiếp tục"}
                        buttonContainerStyle={{
                            height: 50,
                            alignItems: "center",
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                        onPress={() => {
                            console.log('====================================');
                            console.log("continue");
                            console.log('====================================');
                            navigation.navigate("SignIn")
                        }}
                    />

                </View>
            </View>
        </AuthLayout>
    )
}

export default Otp;