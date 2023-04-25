import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, icons, images, SIZES } from '../../constants'
import FormInput from '../../components/FormInput'
import { utils } from '../../utils'
import TextButton from '../../components/TextButton'
import { auth } from '../../firebase/firebase-config'
import { database } from '../../firebase/firebase-config'
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";




export default function Info({ navigation }) {

    const [email, setEmail] = useState("")
    const [username, setUserName] = useState("")
    const [phonenumber, setPhoneNumber] = useState("")
    const [address, setAddRess] = useState("")

    const [erroremail, setErrorEmail] = useState("")
    const [errorusername, setErrorUserName] = useState("")
    const [errorpass, setErrorPass] = useState("")


    useEffect(() => {
        if (auth.currentUser) {
            const starCountRef = ref(database, 'users/' + auth.currentUser.uid);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setUserName(data.username)
                setEmail(data.email)
                setPhoneNumber(data.phonenumber)
                setAddRess(data.address)
            });
        }
    })


    const SignOUT = () => {
        signOut(auth)
            .then((e) => {
                setUserName("")
                setEmail("")
                setPhoneNumber("")
                setAddRess("")
            }).catch((err) => {
                console.log(err);
            })
    }


    return (
        <View
            style={{
                paddingTop: 20,
                flex: 1,
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
            }}
        >
            <Image
                source={images.logo}
                style={{
                    height: 100,
                    width: 100,
                    // tintColor: COLORS.green
                }}
            />
            {/* User name */}
            <FormInput
                label={"Tên người dùng: "}
                autoCompleteType='Username'
                containerStyles={{
                    marginTop: SIZES.radius,
                    width: "90%",
                }}
                // onChange={"a"}
                onChange={(value) => {

                    setUserName(value)
                }}
                setValue={username}
                // errorMsg={errorusername}
                // placeholder={"sadasd"}
                appendComponent={
                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >


                    </View>
                }
            />
            {/* Email */}
            <FormInput
                label={"Email: "}
                autoCompleteType='email-address'
                containerStyles={{
                    marginTop: SIZES.radius,
                    width: "90%",
                }}
                onChange={(value) => {
                    utils.validateEmail(value, setErrorEmail)
                    setEmail(value)
                }}
                setValue={email}
                errorMsg={erroremail}
                appendComponent={
                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Image

                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.gray
                            }}
                        />

                    </View>
                }
            />
            {/* SĐT */}
            <FormInput
                label={"Số điện thoại: "}
                autoCompleteType='number'
                containerStyles={{
                    marginTop: SIZES.radius,
                    width: "90%",
                }}
                keyboardType={"numeric"}
                onChange={(value) => {
                    // utils.va
                    setPhoneNumber(value)
                }}
                // setValue={phonenumber}
                // errorMsg={errorusername}
                appendComponent={
                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Image

                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.gray
                            }}
                        />

                    </View>
                }
            />
            {/* Địa chỉ */}
            <FormInput
                readonly={"true"}
                label={"Địa chỉ: "}
                autoCompleteType='address'
                containerStyles={{
                    marginTop: SIZES.radius,
                    width: "90%",
                }}
                onChange={(value) => {
                    // utils.va
                    setAddRess(value)
                }}
                // errorMsg={errorusername}
                appendComponent={
                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Image

                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.gray
                            }}
                        />

                    </View>
                }
            />
            {/* SIGNOUT*/}
            <TextButton
                label={auth.currentUser ? "Đăng xuất" : "Đăng nhập"}
                disabel={false}
                buttonContainerStyle={{
                    height: 55,
                    width: "50%",
                    alignItems: 'center',
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                onPress={() => auth.currentUser ? SignOUT() : navigation.navigate("OnBoarding")}
            />
        </View>
    )
}