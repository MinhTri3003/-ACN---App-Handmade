import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../constants'
import HeaderTabs from '../../components/home/HeaderTabs'
import BottomTabs from '../../components/home/BottomTabs'
import TextButton from '../../components/TextButton'
import StepperInput from './StepperInput'
import TextIconButton from '../../components/TextIconButton'
import { database, auth, db } from '../../firebase/firebase-config'
import { collection, addDoc, doc, setDoc, getDocs, getDoc } from 'firebase/firestore/lite'
import { Alert } from 'react-native'

function renderDetails({ img_url_product, name_product, text_product }) {
    return (
        <View
            style={{
                paddingHorizontal: SIZES.padding
            }}
        >
            <View
                style={{
                    height: 200,
                    borderRadius: 15,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: SIZES.base,
                        paddingHorizontal: SIZES.radius
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <Image
                            source={icons.calories}
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                        <Text
                            style={{
                                color: COLORS.darkGray2,
                                ...FONTS.body4
                            }}
                        >
                            hello world
                        </Text>
                    </View>
                    <Image
                        source={icons.love}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                </View>
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={{ uri: img_url_product }}
                        resizeMode='contain'
                        style={{
                            height: 150,
                            width: 200,
                            borderRadius: 15,
                        }}
                    />
                </View>
            </View>
            {/* TEXXT */}
            <View
                style={{
                    marginTop: SIZES.padding / 4,
                }}
            >
                <Text
                    style={{ ...FONTS.h1 }}
                >
                    {name_product}
                </Text>
                <Text
                    style={{
                        marginTop: SIZES.base,
                        color: COLORS.darkGray,
                        textAlign: 'justify',
                        ...FONTS.body3
                    }}
                >
                    {text_product}
                </Text>
                {/* Start */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.padding,
                    }}
                >

                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: SIZES.base,
                            paddingHorizontal: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary,
                        }}
                    >
                        <Image
                            source={icons.star}
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                        <Text
                            style={{
                                marginLeft: SIZES.base,
                                color: COLORS.white
                            }}
                        >
                            4.5
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}



function renderFooter({ navigation, item_food, price_product }) {
    const [qty, setQty] = useState(0);

    const listcolors = ["Đen", "Trắng", "Đỏ", "Vàng"];
    const [selectcolor, setSelectColor] = useState("");
    const AddtoCart = async () => {
        try {
            const currentUser_items = collection(db, 'Cart/' + auth.currentUser.uid + '/CurrentUser');
            const currentUser_CurrentUser = collection(db, 'Cart/' + auth.currentUser.uid + '/CurrentUser');
            const currentUser_itemsSnapshot = await getDocs(currentUser_items);
            const currentUser_List = currentUser_itemsSnapshot.docs.map(doc => doc.data());
            console.log('====================================');
            console.log(currentUser_List);
            console.log('====================================');
            if (currentUser_CurrentUser == null) {
                //     console.log("currentUser_List1");
                // }
                currentUser_List.map((item) => {
                    console.log('====================================');
                    console.log(item.name);
                    console.log('====================================');
                    // let sum_price = 
                    while (Boolean(item_food.name == item.name)) {
                        console.log(Boolean(item_food.name == item.name))
                        console.log((qty + item.qty));
                        setDoc(doc(db, "Cart/" + auth.currentUser.uid + "/CurrentUser", item_food.name), {
                            img_url: item_food.img_url,
                            name: item_food.name,
                            price: item_food.price,
                            qty: qty + item.qty,
                        });
                        break
                    }
                    if (item_food.name != item.name) {
                        console.log(Boolean(item_food.name == item.name))
                        setDoc(doc(db, "Cart/" + auth.currentUser.uid + "/CurrentUser", item_food.name), {
                            img_url: item_food.img_url,
                            name: item_food.name,
                            color: selectcolor,
                            price: item_food.price,
                            qty: qty,
                        });
                    }
                })
            }
            else {
                setDoc(doc(db, "Cart/" + auth.currentUser.uid + "/CurrentUser", item_food.name), {
                    img_url: item_food.img_url,
                    name: item_food.name,
                    color: selectcolor,
                    price: item_food.price,
                    qty: qty,
                });
            }
            Alert.alert('Thông báo', "ĐÃ THÊM VÀO GIỎ HÀNG")
            console.log("Document written with ID: ", auth.currentUser.uid);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <>

            {/* Color */}
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.padding,
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text style={{ ...FONTS.h3 }}>Màu: </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginLeft: SIZES.padding
                    }}
                >
                    {listcolors.map((items, index) => {
                        return (
                            <TextButton
                                key={`Color-${index}`}
                                buttonContainerStyle={{
                                    width: 50,
                                    height: 50,
                                    margin: SIZES.base,
                                    borderWidth: 1,
                                    borderRadius: SIZES.radius,
                                    borderColor: selectcolor == items ? COLORS.primary : COLORS.gray2,
                                    color: COLORS.black,
                                    backgroundColor: selectcolor == items ? COLORS.primary : null
                                }}
                                label={items}
                                labelStyle={{
                                    color: selectcolor == items ? COLORS.white : COLORS.darkGray,
                                    ...FONTS.body3
                                }}
                                onPress={() => {
                                    setSelectColor(items)
                                }}
                            />
                        )
                    })}
                </View>

            </View>
            <Text
                style={{
                    ...FONTS.h3,
                    marginTop: 20,
                    paddingHorizontal: SIZES.padding
                }}
            >Giá: {price_product}.000đ</Text>
            <View
                style={{
                    flexDirection: 'row',
                    height: 120,
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.radius
                }}
            >
                <StepperInput
                    value={qty}
                    onAdd={() => setQty(qty + 1)}
                    onMinus={() => {
                        if (qty > 0) {
                            setQty(qty - 1)
                        }
                    }}
                />
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 60,
                        marginLeft: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: qty > 0 ? COLORS.primary : COLORS.transparentPrimary
                    }}
                    onPress={() => auth.currentUser ? AddtoCart() : navigation.navigate("SignIn")}
                    label={"Bỏ vào giỏ hàng"}
                />
            </View></>
    )
}

export default function ProductDetail({ navigation, route }) {
    const [foodItem, setFoodItem] = useState(route.params.foodproduct)
    useEffect(() => {
        console.log('====================================');
        console.log(foodItem.img_url);
        console.log('====================================');
    })
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingTop: 20
            }}
        >
            {/* Header */}
            <HeaderTabs />

            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    width: "100%",
                    paddingTop: 5
                }}
            >
                <ScrollView>
                    {/* Body */}
                    {renderDetails({
                        img_url_product: foodItem.img_url,
                        name_product: foodItem.name,
                        text_product: foodItem.text,
                    })}
                    {renderFooter(

                        {
                            navigation: { navigation },
                            item_food: foodItem,
                            price_product: foodItem.price
                        }
                    )}
                </ScrollView>
            </View>
            {/* Footer */}

            <BottomTabs navigation={navigation} />
        </View>
    )
}