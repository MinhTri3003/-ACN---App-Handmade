import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import HeaderTabs from '../../components/home/HeaderTabs'
import { COLORS, SIZES } from '../../constants'
import BottomTabs from '../../components/home/BottomTabs'

export default function PurchaseHistory({ navigation }) {
    return (
        <SafeAreaView
            style={{
                backgroundColor: "#ffffff",
                flex: 1,
                paddingTop: 20,
            }}
        >
            <HeaderTabs navigation={navigation} />
            <View
                style={{
                    paddingTop: 20 * 2,
                    flex: 1,
                }}
            >
                <Text>Chưa hoàn thành</Text>
            </View>
            <BottomTabs navigation={navigation} />
        </SafeAreaView>
    )
}