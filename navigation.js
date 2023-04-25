import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { createStore, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import thunk from "redux-thunk"
import rootReducer from "./components/home/store/rootReducer";

// const store = configureStore();
import {
  Home,
  RestaurantDetail,
  OnBoarding,
  SignIn,
  SignUp,
  ForgotPassword,
  Otp,
  MainLayout,
  CartTab,
  MyCard,
  User,
  ProductDetail,
  Category,
  PurchaseHistory,
  Mypayment,
  AddCard,
  Checkout,
  Success
} from './screens'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    // <ReduxProvider>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainLayout"
          screenOptions={screenOptions}
        >
          {/* <Stack.Screen
            name="Home"
            component={Home}
          /> */}
          <Stack.Screen
            name="MainLayout"
            component={MainLayout}
          />
          <Stack.Screen
            name="MyCard"
            component={MyCard}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
          />
          <Stack.Screen
            name="CartTab"
            component={CartTab}
          />
          <Stack.Screen
            name="Category"
            component={Category}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            name="RestaurantDetail"
            component={RestaurantDetail}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            name="User"
            component={User}
          />
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
          />
          <Stack.Screen
            name="OTP"
            component={Otp}
          />

          <Stack.Screen
            name="PurchaseHistory"
            component={PurchaseHistory}
          />
          <Stack.Screen
            name="Mypayment"
            component={Mypayment}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCard}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
          />
          <Stack.Screen
            name="Success"
            component={Success}
          />
          {/* <Stack.Screen name="OrderCompleted" component={OrderCompleted} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
