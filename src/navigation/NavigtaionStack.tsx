import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";

import Login from "../views/Login/Login";
import "react-native-gesture-handler";
import Home from "../views/Home/Home";
import Order from "../Component/Order";
import SignUp from "../views/signUp/SignUp";
import Coffee from "../views/CoffeeCaStegories/Coffee";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CartItem from "../Component/CartItem";

const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Coffee" component={Coffee} />
      <Drawer.Screen name="Order" component={Order} />
    </Drawer.Navigator>
  );
};
const Stack = createStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Cart" component={CartItem} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
