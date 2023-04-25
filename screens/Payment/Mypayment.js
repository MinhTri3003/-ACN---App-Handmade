import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import HeaderTabs from '../../components/home/HeaderTabs'
import TextButton from '../../components/TextButton'
import IconButton from '../../components/IconButton'
import CardItem from './CardItem'
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../constants'
import { useState } from 'react'

export default function Mypayment({ navigation }) {
    const [selectCard, setSelectCard] = useState(null)
    function renderMypayment() {
        return (
            <View>
                {dummyData.myCards.map((item, indx) => {
                    return (
                        <CardItem
                            key={`MyCard-${item.id}`}
                            item={item}
                            isSelected={`${selectCard?.key}-${selectCard?.id}` == `MyCard-${item.id}`}
                            onPress={() => setSelectCard({ ...item, key: "MyCard" })}
                        />
                    )
                })

                }
            </View>
        )
    }
    function renderAddNewCard() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text style={{ ...FONTS.h4 }}>Thêm phương thức thanh toán mới</Text>
                {dummyData.allCards.map((item, indx) => {
                    return (
                        <CardItem
                            key={`NewCard-${item.id}`}
                            item={item}
                            isSelected={`${selectCard?.key}-${selectCard?.id}` == `NewCard-${item.id}`}
                            onPress={() => setSelectCard({ ...item, key: "NewCard" })}
                        />
                    )
                })}
            </View>
        )
    }
    function renderFooter() {
        return (
            <View
                style={{
                    paddingTop: SIZES.radius,
                    paddingBottom: SIZES.radius,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <TextButton
                    disabel={selectCard == null}
                    buttonContainerStyle={{
                        height: 60,
                        borderRadius: SIZES.padding,
                        backgroundColor: selectCard == null ? COLORS.gray : COLORS.primary
                    }}
                    label={selectCard?.key == "NewCard" ? "Thêm phương thức mới" : "Đặt hàng"}
                    onPress={() => { selectCard?.key == "NewCard" ? navigation.navigate("AddCard", { selectCard: selectCard }) : navigation.navigate("Checkout", { selectCard: selectCard }) }}
                />
            </View>
        )
    }
    return (
        <SafeAreaView
            style={{
                backgroundColor: "#ffffff",
                flex: 1,
                paddingTop: 20,
            }}
        >
            {/* Header */}
            <HeaderTabs navigation={navigation} />
            {/* Card */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.radius
                }}
            >
                {renderMypayment()}
                {/* Add new Card */}
                {renderAddNewCard()}
            </ScrollView>
            {/* Footer */}
            {renderFooter()}

        </SafeAreaView>
    )
}