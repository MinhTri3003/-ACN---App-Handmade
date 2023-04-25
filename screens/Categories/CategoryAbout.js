import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import RestaurantDetail from '../Home/RestaurantDetail';
import { Divider } from 'react-native-elements';
import { COLORS } from '../../constants';

export default function CategoryAbout({ navigation, name, img }) {
    const RestaurantName = () => (
        <Text
            style={{
                fontSize: 29,
                fontWeight: "600",
                marginTop: 10,
                color: COLORS.orange,
                marginHorizontal: 15,
            }}
        >
            {name}
        </Text>
    );
    const RestaurantImage = () => (
        <Image source={{ uri: img }} style={{ width: "100%", height: 180 }} />
    );
    return (
        <View>
            <RestaurantImage />
            <RestaurantName />
            <Divider width={0.5} style={{ marginVertical: 10 }} />

        </View>
    )
}



