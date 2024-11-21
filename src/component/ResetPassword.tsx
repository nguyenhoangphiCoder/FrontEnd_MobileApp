import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      // Gửi yêu cầu tạo token đặt lại mật khẩu
      const response = await axios.post(
        `${API_BASE_URL}/password_reset_tokens`,
        {
          user_id: 22, // Tùy chỉnh để lấy user_id từ email nếu cần
          token: generateRandomToken(), // Hàm tạo token ngẫu nhiên
          expired_at: new Date(new Date().getTime() + 3600000), // Thời gian hết hạn token (1 giờ)
        }
      );

      if (response.status === 201) {
        Alert.alert(
          "Success",
          "Password reset link has been sent to your email"
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to send password reset request");
    }
  };

  // Hàm tạo token ngẫu nhiên
  const generateRandomToken = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Send Reset Link" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default ForgotPasswordScreen;
