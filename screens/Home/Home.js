import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import RestaurantDetail from './RestaurantDetail'
import Categories from '../../components/home/Categories'
import Carousel from "../../components/home/carousel/Carousel";
import { ScrollView } from 'react-native'
import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from 'firebase/firestore/lite'





function renderSearch() {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 40,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginVertical: SIZES.base * 2,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2
            }}
        >
            <Image
                source={icons.search}
                style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.black
                }}
            />
            <TextInput
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    ...FONTS.body3
                }}
                placeholder="Tìm kiếm...."
            />
            <TouchableOpacity

            >
                <Image
                    source={icons.filter}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default function Home({ navigation }) {
    const [slide, setSlide] = useState([]);
    useEffect(() => {
        const GetData = async () => {
            const slide_items = collection(db, 'Slide');
            const slide_itemsSnapshot = await getDocs(slide_items);
            const itemList = slide_itemsSnapshot.docs.map(doc => doc.data());
            setSlide(itemList);
        }
        GetData();
    }, []);

    return (
        <View
            style={{
                paddingTop: 20,
                flex: 1,
            }}
        >
            {renderSearch()}
            <Categories navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Carousel data={slide} />
                {/* <Carousel data={slide} /> */}
                <RestaurantDetail navigation={navigation} />
            </ScrollView>

        </View>
    )
}