import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../views/Login";
import "react-native-gesture-handler";
import Home from "../views/Home";
import SignUp from "../views/signUp/SignUp";
import Coffee from "../views/CoffeeCaStegories/Coffee";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tea from "../views/teaCart/tea";
import Phindi from "../views/PhinDi/Phindi";
import MilkTea from "../views/MilkTEa/milktea";
import Freeze from "../views/FREEZE/FREEZE";
import Cart from "../views/Cart";
import Payment from "../views/payment";

const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Coffee" component={Coffee} />
      <Drawer.Screen name="Tea" component={Tea} />
      <Drawer.Screen name="Phindi" component={Phindi} />
      <Drawer.Screen name="MilkTea" component={MilkTea} />

      <Drawer.Screen name="Freeze" component={Freeze} />
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
        <Stack.Screen name="CartItem" component={Cart} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
