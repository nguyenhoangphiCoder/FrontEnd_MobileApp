import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Kiểu định nghĩa cho route
type RootDrawerParamList = {
  Home: undefined;
  OrderHistory: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string; userId: string }; // Đảm bảo có userId và token
  Login: undefined;
};
type RootStackParamList = {
  Login: undefined;
};

const ResetPasswordScreen = () => {
  const [password, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRoute<RouteProp<RootDrawerParamList, "ResetPassword">>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { token } = route.params || {}; // Lấy token từ params

  useEffect(() => {
    if (!token) {
      Alert.alert("Lỗi", "Thông tin không hợp lệ.");
      navigation.goBack(); // Trở lại màn hình trước nếu không có token
    }
  }, [token, navigation]);

  const handleResetPassword = async () => {
    if (!password) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới.");
      return;
    }

    setLoading(true);

    try {
      // Gọi API để thay đổi mật khẩu người dùng
      await axios.put(`${API_BASE_URL}/password_reset_tokens`, {
        token: token, // Gửi token
        new_password: password, // Gửi mật khẩu mới
      });

      Alert.alert("Thành công", "Mật khẩu của bạn đã được thay đổi.");

      // Chuyển hướng về màn hình đăng nhập sau khi thành công
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể thay đổi mật khẩu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#eee", // Đổi màu nền
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Reset Password
      </Text>
      {/* Nếu muốn không hiển thị token, có thể loại bỏ phần này */}
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 16,
          borderRadius: 5,
        }}
        placeholder="token:"
        value={token}
        editable={false} // Không cho chỉnh sửa token
      />
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 16,
          borderRadius: 5,
          color: "black",
        }}
        placeholder="New Password"
        value={password}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button
        title="Change Password"
        onPress={handleResetPassword}
        disabled={loading}
        color="#230C02" // Đổi màu nút
      />
    </View>
  );
};

export default ResetPasswordScreen;
