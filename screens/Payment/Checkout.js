import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HeaderTabs from '../../components/home/HeaderTabs'
import CardItem from './CardItem'
import FormInput from '../../components/FormInput'
import { Divider } from 'react-native-elements'
import TextButton from '../../components/TextButton'
import { auth, db } from '../../firebase/firebase-config'
import { collection, doc, setDoc, getDocs, deleteDoc, addDoc } from 'firebase/firestore/lite'

export default function Checkout({ navigation, route }) {

    const [selectCard, setSelectCard] = useState(null)

    const [mycartlist, setCartList] = useState([])
    const [total_price, settotal_price] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [total, setTotal] = useState(0)
    let sum_total = 0
    let key = 0
    const GetData = async () => {
        const currentUser_items = collection(db, 'Cart/' + auth.currentUser.uid + '/CurrentUser');
        const currentUser_itemsSnapshot = await getDocs(currentUser_items);
        const currentUser_List = currentUser_itemsSnapshot.docs.map(doc => doc.data());
        setCartList(currentUser_List);
        console.log(currentUser_List);
        currentUser_List.map((item, indx) => {
            key = indx
            sum_total = sum_total + (item.price * item.qty)
            settotal_price(sum_total)
            setTotal(sum_total + shippingFee)
        })
    }
    useEffect(() => {
        GetData()
    }, [])

    const FooterTotal = ({ subTotal, shippingFee, total, onPress }) => {
        return (
            <View
                style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: COLORS.lightGray2,
                }}
            >
                {/* <Divider width={0.5} style={{ marginVertical: 10 }} /> */}
                <View
                    style={{
                        marginTop: SIZES.padding / 2,
                        marginLeft: SIZES.padding / 2,
                        marginRight: SIZES.padding / 2,
                        height: 150
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Text style={{ flex: 1, ...FONTS.body3 }}>Tổng sản phẩm</Text>
                        <Text style={{ ...FONTS.h3 }}>{subTotal}.000đ</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: SIZES.padding,
                            marginTop: SIZES.radius,
                        }}
                    >
                        <Text style={{ flex: 1, ...FONTS.body3 }}>Tiền ship</Text>
                        <Text style={{ ...FONTS.h3 }}>{shippingFee}.000đ</Text>
                    </View>
                    <Divider width={0.5} color={COLORS.lightOrange} style={{ marginVertical: 10 }} />
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.padding
                        }}
                    >
                        <Text style={{ flex: 1, ...FONTS.body3 }}>TỔNG</Text>
                        <Text style={{ ...FONTS.h3 }}>{total}.000đ</Text>
                    </View>
                </View>
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <TextButton
                        label={"Thanh Toán"}
                        disabel={false}
                        buttonContainerStyle={{
                            height: 40,
                            width: 300,
                            alignItems: 'center',
                            marginTop: SIZES.padding,
                            marginBottom: SIZES.padding,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                        onPress={onPress}
                    />
                </View>

            </View>
        )
    }

    useEffect(() => {
        let { selectCard } = route.params
        setSelectCard(selectCard)
        // console.log(selectCard);
    })

    function renderMyCard() {
        return (
            <View>
                {selectCard && dummyData.myCards.map((item, indx) => {
                    return (
                        <CardItem
                            key={`MyCard-${item.id}`}
                            item={item}
                            isSelected={`${selectCard?.key}-${selectCard?.id}` == `MyCard-${item.id}`}
                            onPress={() => setSelectCard({ ...item, key: "MyCard" })}
                        />
                    )
                })}
            </View>
        )
    }
    function renderDeliveryAddr() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text style={{ ...FONTS.h3 }}>Địa chỉ </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.radius,
                        paddingVertical: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        borderWidth: 2,
                        borderRadius: SIZES.radius,
                        borderColor: COLORS.lightGray2,
                        backgroundColor: COLORS.white
                    }}
                >
                    <Image
                        source={icons.location1}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                    <Text
                        style={{
                            marginLeft: SIZES.radius,
                            width: "80%",
                            ...FONTS.body4
                        }}
                    >470 Trần Đại Nghĩa, Ngũ Hành Sơn , Đà Nẵng</Text>
                </View>
            </View>
        )
    }
    function renderCoupon() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding

                }}
            >
                <Text style={{ ...FONTS.h3 }}>Voucher của bạn</Text>
                <FormInput
                    containerStyles={{
                        marginTop: 0,
                        paddingLeft: SIZES.padding,
                        paddingRight: 0,
                        borderWidth: 2,
                        borderColor: COLORS.lightGray2,
                        backgroundColor: COLORS.white,
                        overflow: 'hidden'
                    }}
                    placeholder={"Nhập mã Voucher"}
                    appendComponent={
                        <View
                            style={{
                                width: 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.primary
                            }}
                        >
                            <Image
                                source={icons.discount}
                                style={{
                                    height: 40,
                                    width: 40
                                }}
                            />
                        </View>
                    }

                />
            </View>
        )
    }

    const AddtoCart = async (item_food) => {
        try {
            await addDoc(collection(db, "Cart/" + auth.currentUser.uid + "/OrderUser"), {
                item: item_food
            });
            item_food.map((item) => {

                deleteDoc(doc(db, "Cart/" + auth.currentUser.uid + "/CurrentUser", item.name));
            })
            console.log("Document written with ID: ", auth.currentUser.uid);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <View
            style={{
                marginTop: SIZES.padding * 2,
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            <HeaderTabs />
            {/* Check out */}
            <KeyboardAwareScrollView
                keyboardDismissMode='on-drag'
                extraScrollHeight={-200}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 20
                }}
            >
                {renderMyCard()}

                {renderDeliveryAddr()}

                {/* {renderCoupon()} */}
            </KeyboardAwareScrollView>
            <FooterTotal
                subTotal={total_price}
                shippingFee={shippingFee}
                total={total}
                onPress={() => {
                    AddtoCart(mycartlist)
                    navigation.navigate("Success")
                }
                }
            />
        </View>
    )
}
