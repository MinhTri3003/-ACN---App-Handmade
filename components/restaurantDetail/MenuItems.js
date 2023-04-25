import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
// import { useDispatch, useSelector } from "react-redux";
import { FONTS } from '../../constants'

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "400",
  },
});

export default function MenuItems({ restaurantName, foods, marginLeft, navigation }) {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {foods.map((food, index) => (
          <View key={index}>
            <TouchableOpacity
              style={
                styles.menuItemStyle
              }
              onPress={() => {
                navigation.navigate("ProductDetail", {
                  foodproduct: food
                })
              }}
            >
              <FoodInfo food={food} />
              <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
            </TouchableOpacity>
            <Divider
              width={0.5}
              orientation="vertical"
              style={{ marginHorizontal: 20 }}
            />
          </View>
        ))}
      </ScrollView>
      <>

      </>
    </>
  );
}

const FoodInfo = (props) => (
  <View style={{ width: "55%", justifyContent: "space-evenly" }}>
    <Text style={{
      ...styles.titleStyle,
      fontWeight: 'bold',
      ...FONTS.h2
    }}>{props.food.name}</Text>
    <Text
      style={{
        ...FONTS.h5
      }}
    >
      {props.food.text}</Text>
    <Text
      style={{
        ...FONTS.h3
      }}
    >
      Giá: {props.food.price}.000đ</Text>
  </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food.img_url }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft,
      }}
    />
  </View>
);
