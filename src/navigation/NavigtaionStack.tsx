import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../views/Login/Login";
import SignUp from "../views/signUp/SignUp";
import React from "react";
import Home from "../views/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const tab = createBottomTabNavigator();
function BottomTab() {
  return (
    <tab.Navigator screenOptions={{ headerShown: false }}>
      <tab.Screen name="Home" component={Home} />
      <tab.Screen name="Login" component={Login} />
      <tab.Screen name="SignUp" component={SignUp} />
    </tab.Navigator>
  );
}
const stack = createStackNavigator();
const NavigationStack = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <stack.Screen name="TabBottom" component={BottomTab} />
      </stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationStack;
