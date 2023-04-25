import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomTabs from '../../components/home/BottomTabs'
import HeaderTabs from '../../components/home/HeaderTabs'
import { SwipeListView } from 'react-native-swipe-list-view'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import StepperInput from '../Product/StepperInput'
import IconButton from '../../components/IconButton'
import { Divider } from 'react-native-elements'
import TextButton from '../../components/TextButton'
import { auth, db } from '../../firebase/firebase-config'
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore/lite'

export default function CartTab({ navigation }) {
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
        // console.log(currentUser_List);
        currentUser_List.map((item, indx) => {
            key = indx
            sum_total = sum_total + (item.price * item.qty)
            settotal_price(sum_total)
            setTotal(sum_total + shippingFee)
        })
    }
    useEffect(() => {
        GetData();
    }, []);
    const QTYHandler = async (list, status) => {
        if (status == "plus") {
            await setDoc(doc(db, "Cart/" + auth.currentUser.uid + "/CurrentUser", list.name), {
                img_url: list.img_url,
                name: list.name,
                price: list.price,
                qty: list.qty + 1,
            });
        }
        else if (status == "minus") {
            await setDoc(doc(db, "Cart/" + auth.currentUser.uid + "/CurrentUser", list.name), {
                img_url: list.img_url,
                name: list.name,
                price: list.price,
                qty: list.qty - 1,
            });
        }
        else if (status == "delete") {

            await deleteDoc(doc(db, "Cart/" + auth.currentUser.uid + "/CurrentUser", list.name));
        }

        GetData();
    }

    function renderCartList() {
        return (
            <SwipeListView
                data={mycartlist}
                // keyExtractor={item => `${item.id}`}
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding * 2,
                }}
                disableRightSwipe={true}
                rightOpenValue={-75}
                renderItem={(data, idx) =>
                    <View
                        style={{
                            height: 110,
                            backgroundColor: COLORS.lightGray2,
                            ...styles.cartItemContainer
                        }}
                        key={idx}
                    >
                        <View
                            style={{
                                width: 90,
                                height: 90,
                                marginLeft: -10
                            }}
                        >
                            <Image
                                source={{ uri: data.item.img_url }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: 'absolute',
                                    top: 10,
                                    borderRadius: SIZES.radius,
                                }}
                            />

                        </View>

                        <View
                            style={{
                                flex: 1,
                                marginLeft: SIZES.padding
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3
                                }}
                            > {data.item.name}</Text>
                            <Text
                                style={{ color: COLORS.gray2, ...FONTS.h4 }}
                            > {data.item.price}.000đ</Text>
                            <Text
                                style={{ color: COLORS.primary, ...FONTS.h4 }}
                            > {data.item.price * data.item.qty}.000đ</Text>
                        </View>
                        <StepperInput
                            containerStyle={{
                                height: 50,
                                width: 100,
                                backgroundColor: COLORS.white
                            }}
                            value={data.item.qty}
                            onAdd={() => {
                                QTYHandler(data.item, "plus")
                            }}
                            onMinus={async () => {
                                QTYHandler(data.item, "minus")
                            }}
                        />

                    </View>
                }

                renderHiddenItem={(data, ind) => (
                    <IconButton
                        containerStyle={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: COLORS.primary,
                            ...styles.cartItemContainer
                        }}
                        key={ind}
                        icon={icons.delete_icon}
                        iconStyle={{
                            marginRight: 10

                        }}
                        onPress={() => {
                            QTYHandler(data.item, "delete")
                        }}
                    />
                )}
            />
        )
    }
    return (
        <View style={{
            backgroundColor: "#ffffff",
            flex: 1,
            paddingTop: 20,
        }}>
            <HeaderTabs navigation={navigation} />

            {renderCartList()}
            <FooterTotal
                subTotal={total_price}
                shippingFee={shippingFee}
                total={total}
                navigation={navigation}
            />

            <BottomTabs navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius
    }
})
const FooterTotal = ({ subTotal, shippingFee, total, onPress, navigation }) => {
    return (
        <View>
            <Divider width={0.5} style={{ marginVertical: 10 }} />
            <View
                style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: COLORS.white,
                    marginLeft: SIZES.padding / 2,
                    marginRight: SIZES.padding / 2
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
                        flexDirection: 'row'
                    }}
                >
                    <Text style={{ flex: 1, ...FONTS.body3 }}>Tiền ship</Text>
                    <Text style={{ ...FONTS.h3 }}>{shippingFee}.000đ</Text>
                </View>
                <Divider width={0.5} color={COLORS.lightOrange} style={{ marginVertical: 10 }} />
                <View
                    style={{
                        flexDirection: 'row'
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
                    onPress={() => {
                        total > 0 ? navigation.navigate("Mypayment") :
                            Alert.alert('Thông báo', "Vui lòng thêm sản phẩm vào giỏ hàng");
                    }}
                />
            </View>

        </View>
    )
}