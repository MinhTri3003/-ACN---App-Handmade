import { View, Text, SafeAreaView, ImageBackground, Image } from 'react-native'
import React from 'react'
import HeaderTabs from '../../components/home/HeaderTabs'
import TextButton from '../../components/TextButton'
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { utils } from '../../utils'
import { useState, useEffect } from 'react'
import { auth, database } from '../../firebase/firebase-config'
import { ref, onValue } from "firebase/database";
import FormInput from '../../components/FormInput'
import FormInputCheck from '../../components/FormInputCheck'

export default function AddCard({ navigation, route }) {
    const [selectCard, setSelectCard] = useState(null)
    const [cardNumber, setCardNumber] = useState("")
    const [cardNumberErorr, setCardNumberErorr] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardNameErorr, setCardNameErorr] = useState("")
    const [cardExpiryDate, setCardExpiryDate] = useState("")
    const [cardExpiryDateErorr, setCardExpiryDateErorr] = useState("")
    const [cvv, setCvv] = useState("")
    const [cvvErorr, setCvvErorr] = useState("")
    const [isRemember, setisRemember] = useState(false)
    useEffect(() => {
        let { selectCard } = route.params
        setSelectCard(selectCard)
        console.log(selectCard);
    })
    function renderCard() {
        return (
            <ImageBackground
                source={images.card}
                style={{
                    height: 200,
                    width: "100%",
                    marginTop: SIZES.radius,
                    borderRadius: SIZES.radius,
                    overflow: 'hidden'
                }}
            >
                {/* logo */}
                <Image
                    source={selectCard?.icon}
                    resizeMode='contain'
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        height: 40,
                        width: 80
                    }}
                />
                {/* Detail */}
                <View
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        right: 0,
                        paddingHorizontal: SIZES.radius
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >{cardName}</Text>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                flex: 1,
                                color: COLORS.white,
                                ...FONTS.h3
                            }}
                        >{cardNumber}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{cardExpiryDate}</Text>
                    </View>
                </View>

            </ImageBackground>
        )
    }
    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 2
                }}
            >
                {/* Card number */}
                <FormInput
                    label={"Số thẻ"}
                    keyboardType="number-pad"
                    setValue={cardNumber}
                    onChange={(setValue) => {
                        setCardNumber(setValue.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())
                        utils.validateInput(setValue, 19, setCardNumberErorr)
                    }}
                    maxlenght={19}
                    errorMsg={cardNumberErorr}
                    appendComponent={
                        <FormInputCheck
                            value={cardNumber}
                            error={cardNumberErorr}
                        />
                    }

                />
                {/* Card Name */}
                <FormInput
                    label={"Họ và tên"}
                    setValue={cardName}
                    containerStyles={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(setValue) => {
                        utils.validateInput(setValue, 1, setCardNameErorr)
                        setCardName(setValue)
                    }}
                    errorMsg={cardNameErorr}
                    appendComponent={
                        <FormInputCheck
                            value={cardName}
                            error={cardNameErorr}
                        />
                    }

                />
                {/* ExpiryDate, cvv */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius
                    }}
                >
                    <FormInput
                        label={"Ngày tạo"}
                        setValue={cardExpiryDate}
                        placeholder="MM/YY"
                        maxlenght={5}
                        containerStyles={{
                            flex: 1
                        }}
                        onChange={(setValue) => {
                            utils.validateInput(setValue, 5, setCardExpiryDateErorr)
                            setCardExpiryDate(setValue)
                        }}
                        errorMsg={cardExpiryDateErorr}
                        appendComponent={
                            <FormInputCheck
                                value={cardExpiryDate}
                                error={cardExpiryDateErorr}
                            />
                        }

                    />
                    <FormInput
                        label={"CVV"}
                        setValue={cvv}
                        maxlenght={3}
                        containerStyles={{
                            flex: 1,
                            marginLeft: SIZES.radius
                        }}
                        onChange={(setValue) => {
                            utils.validateInput(setValue, 3, setCvvErorr)
                            setCvv(setValue)
                        }}
                        errorMsg={cvvErorr}
                        appendComponent={
                            <FormInputCheck
                                value={cvv}
                                error={cvvErorr}
                            />
                        }

                    />
                </View>
            </View>

        )
    }
    function renderFooter() {
        return (
            <View
                style={{
                    paddingTop: SIZES.radius,
                    paddingBottom: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <TextButton
                    label={"Thêm"}
                    buttonContainerStyle={{
                        height: 60,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}
                    onPress={() => navigation.goBack()} //continue 2:13:41
                />
            </View>
        )
    }
    return (
        <View
            style={{
                backgroundColor: "#ffffff",
                flex: 1,
                paddingTop: 20,
            }}
        >
            {/* Header */}
            <HeaderTabs navigation={navigation} />
            {/* Card */}
            <KeyboardAwareScrollView
                keyboardDismissMode='on-drag'
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {renderCard()}
                {renderForm()}
            </KeyboardAwareScrollView>
            {/* Footer */}
            {renderFooter()}
        </View>
    )
}