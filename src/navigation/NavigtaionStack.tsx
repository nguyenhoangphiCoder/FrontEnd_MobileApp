import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../Screens/Login";
import Home from "../Screens/Home";
import SignUp from "../component/SignUp";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CoffeeCategories from "../component/CoffeeCategories";
import TeaCategories from "../component/TeaCategories";
import PhindiCategories from "../component/PhindiCategories";
import MilkTeaCategories from "../component/MilkteaCategories";
import FreezeCategories from "../component/FreezeCategories";
import UserProfile from "../Screens/UserProfile";
import UpdateUserProfile from "../component/UpdateUserprofile";
import Cart from "../component/Cart";
import Order from "../Screens/Order";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  console.log("MyDrawer được gọi");
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Order" component={Order} />
      <Drawer.Screen name="UserProfile" component={UserProfile} />
    </Drawer.Navigator>
  );
};

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="CoffeeCategories" component={CoffeeCategories} />
        <Stack.Screen name="TeaCategories" component={TeaCategories} />
        <Stack.Screen name="MilkteaCategories" component={MilkTeaCategories} />
        <Stack.Screen name="PhindiCategories" component={PhindiCategories} />
        <Stack.Screen name="FreezeCategories" component={FreezeCategories} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="UpdateUserProfile" component={UpdateUserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
