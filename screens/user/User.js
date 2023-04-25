import {
    View,
    Text,
    SafeAreaView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomTabs from '../../components/home/BottomTabs'
import Info from './Info'

export default function User({ navigation }) {
    return (
        <SafeAreaView style={{
            backgroundColor: "#ffffff",
            flex: 1,
        }}>
            <Info navigation={navigation} />

            {/* Footer */}

            < BottomTabs navigation={navigation} />
        </SafeAreaView>
    )
}