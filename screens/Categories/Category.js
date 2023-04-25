import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '../../components/home/HeaderTabs'
import TextIconButton from '../../components/TextIconButton'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import BottomTabs from '../../components/home/BottomTabs'
import CategoryAbout from './CategoryAbout'
import RestaurantDetail from '../Home/RestaurantDetail'
import MenuItems from '../../components/restaurantDetail/MenuItems'

import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from 'firebase/firestore/lite'

export default function Category({ navigation, route }) {
    const type = route.params.type
    const nameCategory = route.params.name
    const imgCategory = route.params.img
    const food = [];
    const [foods, setFood] = useState([]);
    useEffect(() => {
        // const = 
        const GetAllData = async () => {
            const slide_items = collection(db, 'AllProduct');
            const slide_itemsSnapshot = await getDocs(slide_items);
            const itemList = slide_itemsSnapshot.docs.map(doc => doc.data());
            // setAllFood(itemList);
            itemList.map(item1 => {
                if (item1.type == type) {
                    food.push(item1)
                }
            })
            setFood(food)
        }
        GetAllData();

    }, []);
    useEffect(() => {
        console.log('====================================');
        console.log(foods);
        console.log('====================================');
    }, [])
    return (
        <SafeAreaView
            style={{
                backgroundColor: "#ffffff",
                flex: 1,
                paddingTop: 30,
            }}
        >
            {/* <View
                style={{
                    flexDirection: 'row',
                    width: 100,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                }}
            >
                <TextIconButton
                    label={"Trở về"}
                    labelStyle={{
                        color: COLORS.darkGray2,
                        ...FONTS.h5
                    }}
                    icon={icons.back}
                    iconStyle={{
                        height: 10,
                        width: 10,
                        tintColor: COLORS.darkGray2
                    }}
                    iconPosition={"LEFT"}
                // onPress={() => navigation.goBack()}
                />
            </View> */}
            <View>
                <HeaderTabs navigation={navigation} />
            </View>
            {/* Body */}
            <View
                style={{
                    flex: 1
                }}
            >
                <CategoryAbout navigation={navigation} name={nameCategory} img={imgCategory} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MenuItems foods={foods} navigation={navigation} />
                </ScrollView>
            </View>
            <BottomTabs navigation={navigation} />
        </SafeAreaView>
    )
}