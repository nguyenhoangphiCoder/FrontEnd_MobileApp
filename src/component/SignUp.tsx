import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../ip_API";
import AntDesign from "@expo/vector-icons/AntDesign";

interface SignUpProps {
  navigation: NavigationProp<any>;
}

interface ErrorResponse {
  message: string;
}

export default function SignUp({ navigation }: SignUpProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const api = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const validateInputs = (): string | null => {
    if (!name.trim()) return "Tên không được để trống.";
    if (!email.trim()) return "Email không được để trống.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email không hợp lệ.";
    if (!password.trim()) return "Mật khẩu không được để trống.";
    if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
    if (!phone_number.trim()) return "Số điện thoại không được để trống.";
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone_number))
      return "Số điện thoại phải từ 10-11 chữ số.";
    return null;
  };

  const handleSignUp = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      Alert.alert("khong the tao tai khoan", errorMessage);
      return;
    }

    const userData = { name, email, password, phone_number };

    try {
      const response = await api.post("users/sign-up", userData);
      if (!response) {
        Alert.alert("Lỗi", "Không thể tạo tài khoản.");
      } else {
        Alert.alert("Đăng ký thành công", `Chào mừng ${response.data.name}!`);
        navigation.navigate("Login");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Đăng ký không thành công";
      Alert.alert("Lỗi", errorMessage);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eee" }}>
      <View style={{ flexDirection: "row", marginTop: 40, marginLeft: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 10 }}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#230C02" }}>
          Create your account!
        </Text>
      </View>

      <View style={{ marginHorizontal: 30, marginTop: 50 }}>
        <TextInput
          placeholder="Your name"
          style={{
            height: 50,
            borderRadius: 20,
            paddingLeft: 15,
            fontSize: 16,
            marginBottom: 20,
            backgroundColor: "#FFF",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Your Email"
          style={{
            height: 50,
            borderRadius: 20,
            paddingLeft: 15,
            fontSize: 16,
            marginBottom: 20,
            backgroundColor: "#FFF",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Your password"
          secureTextEntry
          style={{
            height: 50,
            borderRadius: 20,
            paddingLeft: 15,
            fontSize: 16,
            marginBottom: 20,
            backgroundColor: "#FFF",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Your phone number"
          style={{
            height: 50,
            borderRadius: 20,
            paddingLeft: 15,
            fontSize: 16,
            marginBottom: 20,
            backgroundColor: "#FFF",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}
          value={phone_number}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={handleSignUp}>
          <View
            style={{
              backgroundColor: "#230C02",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Create an account
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderColor: "#230C02",
              backgroundColor: "#FFF",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text
              style={{ color: "#230C02", fontSize: 16, fontWeight: "bold" }}
            >
              Already have an account? Log in
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
