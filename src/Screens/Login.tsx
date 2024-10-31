import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import api from "../api";
import axios from "axios";

interface LoginProps {
  navigation: NavigationProp<any>;
}

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const api = axios.create({
    baseURL: "http://192.168.1.5:3000",
    // Thay URL này bằng URL thực tế của backend của bạn
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    const trimmedEmail = email.trim(); // Loại bỏ khoảng trắng
    const trimmedPassword = password.trim();

    console.log("Email:", trimmedEmail); // Log email đã trim
    console.log("Password:", trimmedPassword); // Log password đã trim

    try {
      const response = await api.post("users/sign-in", {
        email: trimmedEmail, // Sử dụng email đã trim
        password: trimmedPassword, // Sử dụng password đã trim
      });

      console.log("Response:", response.data); // Log response
      if (response.status === 200) {
        console.log("Điều hướng đến MyDrawer");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "MyDrawer" }], // Chuyển đến MyDrawer
          })
        );
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "Email hoặc mật khẩu không chính xác.";
        Alert.alert("Lỗi", errorMessage);
      } else {
        Alert.alert("Lỗi", "Không thể đăng nhập. Vui lòng thử lại.");
      }
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#EDDCC6", flex: 1 }}>
      <View
        style={{
          marginTop: 80,
          justifyContent: "center",
          backgroundColor: "#D3C0AB",
          alignItems: "center",
          width: 180,
          height: 177,
          marginLeft: 110,
          borderRadius: 15,
        }}
      >
        <Image
          source={require("../images/Logo1.png")}
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
        <View style={{ marginTop: 10, height: 45, borderRadius: 5 }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Your Email"
            style={{
              height: 40,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          />
        </View>
        <Text
          style={[
            { fontSize: 15, fontWeight: "bold", color: "#230C02" },
            { marginTop: 20 },
          ]}
        >
          Password
        </Text>
        <View style={{ marginTop: 10, height: 45, borderRadius: 5 }}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Your Password"
            style={{
              height: 40,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          />
        </View>

        <TouchableOpacity onPress={handleLogin}>
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
              style={{ color: "#EDDCC6", fontSize: 15, fontWeight: "bold" }}
            >
              Login
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
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
              style={{ color: "#230C02", fontSize: 15, fontWeight: "bold" }}
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
        <Text style={{ color: "#230C02", fontSize: 15, fontWeight: "bold" }}>
          Forgot Your Password
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
