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
    baseURL: `${API_BASE_URL}`, // Địa chỉ API của bạn
    headers: {
      "Content-Type": "application/json",
    },
  });
  const handleSignUp = async () => {
    const userData = { name, email, password, phone_number };

    try {
      const response = await api.post("users/sign-up", userData);
      Alert.alert("Đăng ký thành công", `Chào mừng ${response.data.name}!`);
      navigation.navigate("Login");
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
          <Text style={{ fontSize: 18, color: "#230C02", fontWeight: "bold" }}>
            Back
          </Text>
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
