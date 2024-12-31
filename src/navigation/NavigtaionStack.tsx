import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../Screens/Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Screens/Home";
import UserProfile from "../Screens/UserProfile";
import SignUp from "../component/SignUp";
import CoffeeCategories from "../component/CategoriesDetail";
import Cart from "../component/Cart";
import UpdateUserProfile from "../component/UpdateUserprofile";
import SetAddress from "../component/SetAddress";
import CategoryProductsScreen from "../component/CategoriesDetail";
import ProductDetail from "../component/ProductDetail";
import Order from "../Screens/Order";
import OrderHistory from "../component/OrderHistory";
import ForgotPasswordScreen from "../component/ResetPassword";
import FlashScreen from "../Screens/ScreenFlashView";
import ResetPasswordScreen from "../component/ResetPasswordScreen";
import VisaQRCode from "../component/VisaQRCode";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="OrderHistory" component={OrderHistory} />
      <Drawer.Screen name="UserProfile" component={UserProfile} />
    </Drawer.Navigator>
  );
};

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Flash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="CategoriesDetail"
          component={CategoryProductsScreen}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="UpdateUserProfile" component={UpdateUserProfile} />
        <Stack.Screen name="SetAddress" component={SetAddress} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="Flash" component={FlashScreen} />
        <Stack.Screen name="VisaQRCode" component={VisaQRCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
