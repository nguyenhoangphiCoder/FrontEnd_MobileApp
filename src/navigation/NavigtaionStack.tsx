import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../Screens/Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Screens/Home";
import Order from "../Screens/Order";
import UserProfile from "../Screens/UserProfile";
import SignUp from "../component/SignUp";
import CoffeeCategories from "../component/CoffeeCategories";
import TeaCategories from "../component/TeaCategories";
import PhindiCategories from "../component/PhindiCategories";
import MilkTeaCategories from "../component/MilkteaCategories";
import FreezeCategories from "../component/FreezeCategories";

import Cart from "../component/Cart";
import UpdateUserProfile from "../component/UpdateUserprofile";
import SetAddress from "../component/SetAddress";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
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
  // binh thuong khong chia nhu vay, phai chia thanh 2 router va dung store de chuyen huong giua login va khong login
  // go lai email di em
  //Phi@gmail.com

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CoffeeCategories" component={CoffeeCategories} />
        <Stack.Screen name="TeaCategories" component={TeaCategories} />
        <Stack.Screen name="MilkteaCategories" component={MilkTeaCategories} />
        <Stack.Screen name="PhindiCategories" component={PhindiCategories} />
        <Stack.Screen name="FreezeCategories" component={FreezeCategories} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="UpdateUserProfile" component={UpdateUserProfile} />
        <Stack.Screen name="SetAddress" component={SetAddress} />

        <Stack.Screen name="MyDrawer" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
