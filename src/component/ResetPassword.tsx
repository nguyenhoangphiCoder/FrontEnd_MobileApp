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
import { API_BASE_URL } from "../../ip_API"; // Đảm bảo đã cấu hình đúng API_BASE_URL
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootDrawerParamList = {
  Home: undefined;
  OrderHistory: undefined;
  ForgotPassword: undefined;
  ResetPassword: { userId: number };
};

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigation =
    useNavigation<StackNavigationProp<RootDrawerParamList, "ForgotPassword">>();

  // Hàm xử lý yêu cầu tạo token đặt lại mật khẩu
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email.");
      return;
    }

    setLoading(true);

    try {
      // Lấy thông tin người dùng từ email
      const userResponse = await axios.get(
        `${API_BASE_URL}/users/email/${email}` // API lấy userId theo email
      );
      console.log(userResponse);

      // Kiểm tra nếu user không tồn tại hoặc không có id
      if (!userResponse.data || !userResponse.data.id) {
        Alert.alert("Lỗi", "Email không tồn tại.");
        return;
      }

      const userId = Number(userResponse.data.id); // Chuyển đổi sang number nếu cần

      // Kiểm tra nếu userId không phải là số hợp lệ
      if (isNaN(userId)) {
        Alert.alert("Lỗi", "ID người dùng không hợp lệ.");
        return;
      }

      console.log("UserId:", userId); // Kiểm tra userId

      // Gửi yêu cầu tạo token đặt lại mật khẩu
      const response = await axios.post(
        `${API_BASE_URL}/password_reset_tokens/send`,
        { email }
      );

      // Kiểm tra phản hồi từ API
      if (response.data) {
        Alert.alert("Thành công", "Token đặt lại mật khẩu đã được gửi!");
        navigation.navigate("ResetPassword", { userId });
      } else {
        Alert.alert("Lỗi", "Không thể tạo token đặt lại mật khẩu.");
      }
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
        placeholder="What is your email?"
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
    </View>
  );
};

export default ForgotPasswordScreen;
