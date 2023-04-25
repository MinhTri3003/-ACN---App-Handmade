import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS, SIZES } from "../../constants";
import { auth, db } from '../../firebase/firebase-config'

export default function BottomTabs({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: 60,
        alignItems: 'center',
        borderTopStartRadius: SIZES.radius * 2,
        borderTopEndRadius: SIZES.radius * 2,
        backgroundColor: COLORS.lightOrange2,
        justifyContent: "space-between",
      }}
    >
      <Icon icon="home" text="Trang chủ" onPress={() => navigation.navigate("MainLayout")} />
      <Icon icon="shopping-bag" text="Giỏ hàng" onPress={() => auth.currentUser ? navigation.navigate("CartTab") : navigation.navigate("OnBoarding")} />
      <Icon icon="receipt" text="Lịch sử" onPress={() => navigation.navigate("PurchaseHistory")} />
      <Icon icon="user" text="Trang cá nhân" onPress={() => navigation.navigate("User")} />
    </View>
  );
}

const Icon = ({ icon, text, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <View>
      <FontAwesome5
        name={icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
);
