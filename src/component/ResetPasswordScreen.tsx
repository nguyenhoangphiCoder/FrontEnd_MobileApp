import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API"; // Đảm bảo API_BASE_URL đã được khai báo đúng
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Kiểu định nghĩa cho route
type RootDrawerParamList = {
  Home: undefined;
  OrderHistory: undefined;
  ForgotPassword: undefined;
  ResetPassword: { userId: number };
};

type RootStackParamList = {
  Login: undefined;
};

const ResetPasswordScreen = () => {
  const [new_password, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRoute<RouteProp<RootDrawerParamList, "ResetPassword">>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userId } = route.params || {}; // Lấy userId từ params

  useEffect(() => {
    if (!userId) {
      Alert.alert("Lỗi", "Thông tin không hợp lệ.");
      navigation.goBack(); // Trở lại màn hình trước nếu không có userId
    }
  }, [userId, navigation]);

  const handleResetPassword = async () => {
    if (!new_password || !token) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ mật khẩu mới và token.");
      return;
    }

    setLoading(true);

    try {
      // Gọi API để thay đổi mật khẩu người dùng
      const response = await axios.put(
        `${API_BASE_URL}/password_reset_tokens`, // Cập nhật đường dẫn API cho đúng
        {
          token,
          new_password,
        }
      );

      if (response.status === 200) {
        Alert.alert("Thành công", "Mật khẩu của bạn đã được thay đổi.");
        navigation.navigate("Login"); // Điều hướng về màn hình Login
      } else {
        Alert.alert("Lỗi", "Không thể thay đổi mật khẩu. Vui lòng thử lại.");
      }
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
        backgroundColor: "#eee",
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

      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 16,
          borderRadius: 5,
          color: "black",
        }}
        placeholder="Token"
        value={token}
        onChangeText={setToken}
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
        value={new_password}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Button
        title="Change Password"
        onPress={handleResetPassword}
        disabled={loading}
        color="#230C02"
      />
    </View>
  );
};

export default ResetPasswordScreen;
