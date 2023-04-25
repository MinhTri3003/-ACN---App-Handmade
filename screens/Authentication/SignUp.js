import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { constants, images, FONTS, SIZES, COLORS, icons } from '../../constants';
import AuthLayout from './AuthLayout';
import FormInput from '../../components/FormInput';
import CustomSwitch from '../../components/CustomSwitch';
import TextIconButton from '../../components/TextIconButton';
import { utils } from '../../utils'
import TextButton from '../../components/TextButton';
import { auth } from '../../firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { database } from '../../firebase/firebase-config';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [username, setUserName] = useState("")
    const [pass, setPass] = useState("")
    const [showpass, setShowPass] = useState("")

    const [erroremail, setErrorEmail] = useState("")
    const [errorusername, setErrorUserName] = useState("")
    const [errorpass, setErrorPass] = useState("")

    function isEnableSignUp() {
        return email != "" && username != "" && pass != "" && erroremail == "" && errorpass == "" && errorusername == ""
    }
    function writeUserData(userId, username, email) {
        set(ref(database, 'users/' + userId), {
            username: username,
            email: email,
        });
    }

    const RegisterUser = () => {
        createUserWithEmailAndPassword(auth, email, pass, username)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                writeUserData(user.uid, username, user.email)
                navigation.navigate("OTP", { email: email })
                console.log(userCredential);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <AuthLayout
            title="Hãy đăng ký tài khoản"
        // subtitle="choaf "
        >
            <View>
                <FormInput
                    label={"Email: "}
                    keyboardType="email-address"
                    autoCompleteType='email'
                    containerStyles={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value) => {
                        //validate
                        utils.validateEmail(value, setErrorEmail)
                        setEmail(value)
                    }}
                    errorMsg={erroremail}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: 'center',

                            }}
                        >
                            <Image
                                source={email == "" || (email != "" && erroremail == "") ? icons.correct : icons.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: email == "" ? COLORS.gray : (email != "" && erroremail == "") ? COLORS.green : COLORS.red
                                }}
                            />

                        </View>
                    }
                />

                {/* Username */}
                <FormInput
                    label={"Tên người dùng: "}
                    autoCompleteType='Username'
                    containerStyles={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value) => {
                        utils.va
                        setUserName(value)
                    }}
                    errorMsg={errorusername}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={username == "" || (username != "" && errorusername == "") ? icons.correct : icons.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: username == "" ? COLORS.gray : (username != "" && errorusername == "") ? COLORS.green : COLORS.red
                                }}
                            />

                        </View>
                    }
                />
                <FormInput
                    label={"Mật khẩu: "}
                    secureTextEntry={!showpass}
                    autoCompleteType='password'
                    containerStyles={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value) => {
                        //validate
                        utils.validatePassword(value, setErrorPass)
                        setPass(value)
                    }}
                    errorMsg={errorpass}
                    appendComponent={
                        <TouchableOpacity
                            style={{
                                width: 40,
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                setShowPass(!showpass)
                            }}
                        >
                            <Image
                                source={showpass ? icons.eye_close : icons.eye}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.green
                                }}
                            />
                        </TouchableOpacity>
                    }
                />

                {/* Sign up & Sign In */}
                <TextButton
                    label={"Đăng ký"}
                    disabel={isEnableSignUp() ? false : true}
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnableSignUp() ? COLORS.primary : COLORS.transparentPrimary
                    }}
                    onPress={() => {
                        RegisterUser();
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >Bạn đã có tài khoản? Hãy nhấn</Text>
                    <TextButton
                        label={" đăng nhập"}
                        buttonContainerStyle={{
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                <View
                    style={{
                        marginTop: 50
                    }}
                >
                    <TextIconButton
                        containerStyle={{
                            height: 50,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.blue
                        }}
                        icon={icons.fb}
                        iconPosition="LEFT"
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        label="FACEBOOK"
                        labelStyle={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white
                        }}
                        onPress={() => {
                            console.log('====================================');
                            console.log("FB");
                            console.log('====================================');
                        }}
                    />
                    <TextIconButton
                        containerStyle={{
                            height: 50,
                            alignItems: 'center',
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2
                        }}
                        icon={icons.google}
                        iconPosition="LEFT"
                        iconStyle={{
                            tintColor: null
                        }}
                        label="GOOGLE"
                        labelStyle={{
                            marginLeft: SIZES.radius
                        }}
                        onPress={() => {
                            console.log('====================================');
                            console.log("Google");
                            console.log('====================================');
                        }}
                    />
                </View>
            </View>
        </AuthLayout>
    )
}

export default SignUp;