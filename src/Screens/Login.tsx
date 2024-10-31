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
import axios from "axios";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type RootDrawerParamList = {
  Home: undefined;
  SignUp: undefined;
  MyDrawer: undefined;
};

interface LoginProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
}

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const api = axios.create({
    baseURL: "http://192.168.1.5:3000", // Địa chỉ API của bạn
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const data = {
      email: trimmedEmail,
      password: trimmedPassword,
    };

    console.log(data);

    try {
      const response = await api.post("users/sign-in", data);

      // console.log(response.data);
      // cho nay server tra ra khong dung chuan RESful API

      if (response.data) {
        // khong chay vao day
        console.log("123445");
        console.log("Đăng nhập thành công");
        navigation.navigate("MyDrawer"); // Điều hướng đến MyDrawer
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
      <Image
        source={require("../images/Logo1.png")}
        style={{
          marginTop: 80,
          width: 180,
          height: 177,
          marginLeft: 110,
          borderRadius: 15,
        }}
      />
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
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#230C02",
            marginTop: 30,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#EDDCC6", fontSize: 15, fontWeight: "bold" }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
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
          <Text style={{ color: "#230C02", fontSize: 15, fontWeight: "bold" }}>
            Create an account
          </Text>
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
