import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
        `http://192.168.1.3:3000/users/${id}`,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile")}
          style={styles.backButton}
        >
          <Image
            source={require("../images/vector-back-icon.jpg")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Account</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Your phone number"
          value={phone_number}
          onChangeText={setPhone}
          style={styles.input}
        />
        <TextInput
          placeholder="Your avatar"
          value={avatar}
          onChangeText={setAvatar}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3C0AB",
    marginTop: 30,
  },
  header: {
    backgroundColor: "#EDDCC6",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  backIcon: {
    height: 37,
    width: 37,
    borderRadius: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    width: 205,
    textAlign: "center",
  },
  form: {
    marginTop: 100,
    alignItems: "center",
  },
  input: {
    height: 45,
    borderRadius: 20,
    backgroundColor: "#EDDCC6",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    width: 350,
  },
  button: {
    backgroundColor: "#EDDCC6",
    marginTop: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 200,
  },
  buttonText: {
    color: "#230C02",
    fontSize: 15,
    fontWeight: "bold",
  },
});
