import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import axios, { AxiosError } from "axios";

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
    baseURL: "http://192.168.10.58:3000", // Địa chỉ API của bạn
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
      const axiosError = error as AxiosError<ErrorResponse>; // Xác định kiểu của lỗi
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Đăng ký không thành công";
      Alert.alert("Lỗi", errorMessage);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#EDDCC6", flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 55, marginLeft: 20 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "900" }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "900", color: "#230C02" }}>
          Create your account!
        </Text>
      </View>
      <View style={{ marginHorizontal: 50, marginTop: 80 }}>
        <TextInput
          placeholder="Your name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Your Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Your password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Your phone number"
          style={styles.input}
          value={phone_number}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity onPress={handleSignUp}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Create an account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderRadius: 20,
    borderColor: "#230C02",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#230C02",
    marginTop: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#EDDCC6",
    fontSize: 15,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#230C02",
    borderWidth: 2,
  },
  loginButtonText: {
    color: "#230C02",
    fontSize: 15,
    fontWeight: "bold",
  },
});
