import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API";

interface UpdateUserProfileProps {
  navigation: NavigationProp<any>;
}

export default function UpdateUserProfile({
  navigation,
}: UpdateUserProfileProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone_number, setPhone] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [id, setId] = useState<number>();

  useEffect(() => {
    const loadUserInfo = async () => {
      const userInfo = await AsyncStorage.getItem("user");
      if (userInfo) {
        const user = JSON.parse(userInfo);
        setId(user.id);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone_number);
        setAvatar(user.avatar_url);
        setAddress(user.address); // Cập nhật thêm địa chỉ vào state
        console.log("Loaded user address_id:", user.address_id);
      }
    };
    loadUserInfo();
  }, []);

  // Hàm cập nhật thông tin người dùng
  const updateUserProfile = async () => {
    const token = await AsyncStorage.getItem("userToken");

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/${id}`,
        { name, email, phone_number, avatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("User update response:", response.data);
      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully!");
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        navigation.navigate("UserProfile", { updatedUser: response.data });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Profile Update Error:", error.response.data);
        Alert.alert(
          "Error",
          error.response.data.message ||
            "Failed to update profile. Please try again."
        );
      } else {
        console.error("Profile Update Error:", error);
        Alert.alert(
          "Error",
          "An unexpected error occurred while updating profile. Please try again."
        );
      }
    }
  };

  // Hàm xử lý cập nhật hồ sơ và địa chỉ
  const handleUpdateProfile = async () => {
    await updateUserProfile(); // Cập nhật thông tin người dùng
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#eee", // Thay đổi màu nền cho nhẹ nhàng hơn
        marginTop: 30,
      }}
    >
      <View
        style={{
          backgroundColor: "#Fff", // Màu nền header
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#fff", // Màu viền dưới
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile")}
          style={{ padding: 10 }}
        >
          <Image
            source={require("../images/vector-back-icon.jpg")}
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#230C02", // Chỉnh lại màu chữ header
            marginLeft: 10,
            textAlign: "center",
            flex: 1,
          }}
        >
          Update Account
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
          paddingHorizontal: 30,
        }}
      >
        <TextInput
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          style={{
            height: 45,
            borderRadius: 10,
            backgroundColor: "#FFF",
            paddingHorizontal: 15,
            marginBottom: 15,
            width: "100%",
            fontSize: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        />
        <TextInput
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          style={{
            height: 45,
            borderRadius: 10,
            backgroundColor: "#FFFFFF",

            paddingHorizontal: 15,
            marginBottom: 15,
            width: "100%",
            fontSize: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        />

        <TextInput
          placeholder="Your phone number"
          value={phone_number}
          onChangeText={setPhone}
          style={{
            height: 45,
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 15,
            marginBottom: 15,
            width: "100%",
            fontSize: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        />
        <TextInput
          placeholder="Your avatar"
          value={avatar}
          onChangeText={setAvatar}
          style={{
            height: 45,
            borderRadius: 10,
            backgroundColor: "#FFFFFF",

            paddingHorizontal: 15,
            marginBottom: 15,
            width: "100%",
            fontSize: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        />

        <TouchableOpacity
          onPress={handleUpdateProfile}
          style={{
            backgroundColor: "#230C02", // Nút bấm màu đậm
            marginTop: 30,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#ffff", // Màu chữ của nút
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
