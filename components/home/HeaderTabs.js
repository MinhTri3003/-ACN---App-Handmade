import React, { useState } from "react";
import { Image } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES, images, icons } from "../../constants";

export default function HeaderTabs({ navigation }) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: 'center',
                height: 70,
                marginTop: SIZES.padding,
                marginBottom: SIZES.padding / 2
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >

                <TouchableOpacity
                    onPress={() => navigation.navigate("MainLayout")}
                >
                    <Image
                        source={images.logo}
                        style={{
                            height: 100,
                            width: 100,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

