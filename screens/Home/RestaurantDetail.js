import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import About from "../../components/restaurantDetail/About";
import MenuItems from "../../components/restaurantDetail/MenuItems";
import ViewCart from "../../components/restaurantDetail/ViewCart";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from 'firebase/firestore/lite'

export default function RestaurantDetail({ route, navigation }) {
    const [foods, setFood] = useState([]);
    useEffect(() => {
        const GetData = async () => {
            const slide_items = collection(db, 'AllProduct');
            const slide_itemsSnapshot = await getDocs(slide_items);
            const itemList = slide_itemsSnapshot.docs.map(doc => doc.data());
            setFood(itemList);
        }
        GetData();
    }, []);
    return (
        <View>
            <MenuItems foods={foods} navigation={navigation} />
        </View>
    );
}
