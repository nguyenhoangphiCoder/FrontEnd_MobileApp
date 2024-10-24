import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
interface LoginProps {
  navigation: NavigationProp<any>;
}
export default function Login({ navigation }: LoginProps) {
  return (
    <SafeAreaView style={{ backgroundColor: "#EDDCC6", flex: 1 }}>
      <View
        style={{
          marginTop: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../images/Logo.png")}
          style={{ width: 170, height: 170 }}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#230C02" }}>
          Welcome Back!
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "900", color: "#230C02" }}>
          THE TECH COFFEE
        </Text>
      </View>
      <View style={{ marginHorizontal: 50, marginTop: 50 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#230C02" }}>
          Email
        </Text>
        <View
          style={{
            marginTop: 10,
            height: 45,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Your Email"
            style={{
              height: 40,
              borderBottomColor: "gray", // Chỉ gạch chân phía dưới
              borderBottomWidth: 1, // Độ dày của gạch chân

              padding: 10,
              marginBottom: 10,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#230C02",
            marginTop: 20,
          }}
        >
          Password
        </Text>
        <View
          style={{
            marginTop: 10,
            height: 45,
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Your Password"
            style={{
              height: 40,
              borderBottomColor: "gray", // Chỉ gạch chân phía dưới
              borderBottomWidth: 1, // Độ dày của gạch chân
              padding: 10,
              marginBottom: 10,
            }}
          />
        </View>

        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#230C02",
              marginTop: 30,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#EDDCC6",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <View
            style={{
              marginTop: 30,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "#230C02",
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                color: "#230C02",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Create an account
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: "#230C02",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Forgot Your Password
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
