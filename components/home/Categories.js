import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from 'firebase/firestore/lite'
import { SwipeListView } from 'react-native-swipe-list-view'

export default function Categories({ navigation }) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const GetData = async () => {
            const items = collection(db, 'Item_Categories');
            const itemsSnapshot = await getDocs(items);
            const itemList = itemsSnapshot.docs.map(doc => doc.data());
            setItems(itemList);
        }
        GetData();
    }, []);

    return (
        <View
            style={{
                backgroundColor: "#fff",
                paddingLeft: 10,
            }}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((item, index) => (
                    <View key={index}

                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Category", {
                                name: item.text,
                                type: item.type,
                                img: item.image
                            })}
                            style={{
                                alignItems: "center",
                                marginRight: 30
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: "contain",
                                }}
                            />
                            <Text style={{ fontSize: 13, fontWeight: "900" }}>{item.text}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
