import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function ViewCart({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                position: "absolute",
                top: 680,
                zIndex: 999,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        backgroundColor: "black",
                        alignItems: "center",
                        padding: 13,
                        borderRadius: 30,
                        width: 300,
                        position: "relative",
                    }}
                >
                    <Text style={{ color: "white", fontSize: 20 }}>ViewCart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}