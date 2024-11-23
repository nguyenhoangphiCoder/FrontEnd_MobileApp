import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Crypto from "expo-crypto"; // Sử dụng expo-crypto

type RootDrawerParamList = {
  Home: undefined;
  OrderHistory: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string; userId: number };
};

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<StackNavigationProp<RootDrawerParamList, "ForgotPassword">>();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email.");
      return;
    }

    setLoading(true);

    try {
      // Gửi yêu cầu đến API để tìm người dùng theo email
      const userResponse = await axios.get(
        `${API_BASE_URL}/users/email/${email}`
      );

      console.log(userResponse);

      // Kiểm tra xem người dùng có tồn tại không
      if (!userResponse.data || !userResponse.data.id) {
        Alert.alert("Lỗi", "Email không tồn tại.");
        return;
      }

      // Lấy id người dùng từ phản hồi
      const userId = Number(userResponse.data.id); // Chuyển đổi sang number nếu cần

      // Kiểm tra nếu userId không phải là số hợp lệ
      if (isNaN(userId)) {
        Alert.alert("Lỗi", "ID người dùng không hợp lệ.");
        return;
      }

      // Sử dụng expo-crypto để tạo token
      const token = await Crypto.getRandomBytesAsync(6).then((bytes) =>
        bytes.map((byte) => byte.toString(6).padStart(2, "0")).join("")
      );

      // Gửi yêu cầu tạo token đặt lại mật khẩu vào API
      const response = await axios.post(
        `${API_BASE_URL}/password_reset_tokens`,
        {
          user_id: userId, // Gửi userId dưới dạng số
          token: token,
          expired_at: new Date(
            new Date().getTime() + 15 * 60 * 1000
          ).toISOString(), // Tạo thời gian hết hạn token
        }
      );

      // Thông báo thành công
      Alert.alert("Thành công", "Token đặt lại mật khẩu đã được gửi!");
      navigation.navigate("ResetPassword", { token, userId: userId }); // Điều hướng đến màn hình đặt lại mật khẩu
      setEmail(""); // Xóa trường nhập email
    } catch (error) {
      console.error("Error: ", error);
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Lỗi",
          error.response?.data?.message || "Không thể yêu cầu đặt lại mật khẩu."
        );
      } else {
        Alert.alert("Lỗi", "Đã có sự cố xảy ra.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#230C02",
        }}
      >
        Forgot Password
      </Text>
      <TextInput
        style={{
          width: "100%",
          height: 50,
          borderColor: "#ddd",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
          marginBottom: 20,
          backgroundColor: "#fff",
          fontSize: 16,
        }}
        placeholder="What Your Email ?"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity
        onPress={handleForgotPassword}
        disabled={loading}
        style={{
          width: "100%",
          height: 50,
          backgroundColor: loading ? "#b0bec5" : "#230C02",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Send Request
          </Text>
        )}
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#230C02" />}
    </View>
  );
};

export default ForgotPasswordScreen;
