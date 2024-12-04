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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../ip_API";

type RootDrawerParamList = {
  Home: undefined;
  SignUp: undefined;
  MyDrawer: { user: any };
  ForgotPassword: undefined;
};

interface LoginProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
}

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState<string>("Phi1@gmail.com");
  const [password, setPassword] = useState<string>("223322");

  const api = axios.create({
    baseURL: `${API_BASE_URL}`, // Địa chỉ API của bạn
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

    try {
      const response = await api.post("/users/sign-in", data);
      console.log(response);

      if (response.data) {
        console.log("Đăng nhập thành công");
        const userData = response.data.user; // Chỉ lấy thông tin người dùng

        // Kiểm tra và lưu thông tin người dùng
        if (userData) {
          await AsyncStorage.setItem("user", JSON.stringify(userData));

          // Lưu user_id nếu có
          if (userData.id) {
            await AsyncStorage.setItem("user_id", userData.id.toString());
            console.log("User ID đã được lưu:", userData.id);
          }

          // Kiểm tra và lưu địa chỉ
          if (userData.addresses && userData.addresses.length > 0) {
            console.log("Addresses:", userData.addresses);
            await AsyncStorage.setItem(
              "addresses",
              JSON.stringify(userData.addresses)
            ); // Lưu địa chỉ
          }

          // Điều hướng tới màn hình MyDrawer và truyền dữ liệu người dùng
          navigation.navigate("MyDrawer", { user: userData });
          console.log(userData);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
          Alert.alert(
            "Lỗi",
            "Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng."
          );
        } else if (error.response) {
          const errorMessage =
            error.response.data.message ||
            "Email hoặc mật khẩu không chính xác.";
          Alert.alert("Lỗi", errorMessage);
        }
      } else {
        Alert.alert("Lỗi", "Không thể đăng nhập. Vui lòng thử lại.");
      }
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff1", flex: 1 }}>
      <Image
        source={require("../images/logo1.jpg")}
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
            borderRadius: 10,
            borderColor: "#230C02",

            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
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
            borderRadius: 10,
            borderColor: "#230C02",
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text style={{ color: "#230C02", fontSize: 15, fontWeight: "bold" }}>
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Text style={{ color: "#230C02", fontSize: 15, fontWeight: "bold" }}>
          Forgot Your Password?
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
