import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createOrder } from "../api";

type RootDrawerParamList = {
  Home: undefined;
  Order: undefined;
  Coffee: undefined;
  Cart: undefined;
  Tea: undefined;
  Phindi: undefined;
  MilkTea: undefined;
  Freeze: undefined;
};

interface PaymentProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
}

export default function Payment({ navigation }: PaymentProps) {
  // Hàm xử lý tạo đơn hàng
  const handleCheckout = async () => {
    try {
      // Dữ liệu mẫu cho đơn hàng, bạn có thể thay thế bằng giá trị động
      const orderData = {
        user_id: 4,
        payment_method_id: 4,
        franchise_id: 3,
      };
      const response = await createOrder(orderData);
      Alert.alert("Order Created", "Đơn hàng đã được tạo thành công!");
      navigation.navigate("Home"); // Điều hướng về trang Home sau khi tạo đơn hàng
    } catch (error) {
      Alert.alert("Error", "Có lỗi xảy ra khi tạo đơn hàng.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút quay lại */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Giỏ hàng</Text>
        </View>
      </View>

      {/* Thông tin sản phẩm trong giỏ hàng */}
      <ScrollView style={styles.productContainer}>
        {/* Card sản phẩm trong giỏ */}
        <View style={styles.productCard}>
          <Image
            source={require("../images/Logo1.png")}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Cà phê đặc biệt</Text>
            <Text style={styles.productPrice}>Giá: 50.000 VNĐ</Text>
            <Text style={styles.productDetail}>Size: L</Text>
            <Text style={styles.productDetail}>Số lượng: 2</Text>
            <Text style={styles.productDetail}>Ghi chú: Không đường</Text>
          </View>
        </View>
      </ScrollView>

      {/* Thông tin thanh toán và nút CHECK OUT */}
      <View style={styles.paymentContainer}>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentLabel}>Người nhận: Nguyễn Văn A</Text>
          <Text style={styles.paymentLabel}>Số điện thoại: 0123456789</Text>
          <Text style={styles.paymentLabel}>
            Địa chỉ giao hàng: 123 Đường ABC, TP.HCM
          </Text>
          <Text style={styles.paymentLabel}>
            Phương thức thanh toán: Tiền mặt
          </Text>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalPrice}>150.000 VNĐ</Text>
        </View>
        <TouchableOpacity onPress={handleCheckout}>
          <View style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>BUY</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// StyleSheet cho các thành phần giao diện
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#230C02",
  },
  header: {
    height: 100,
    paddingHorizontal: 15,
    flexDirection: "row",
    marginTop: 30,
  },
  backButton: {
    backgroundColor: "#FFF",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerTitleContainer: {
    marginLeft: 50,
    marginTop: 30,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  productContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productInfo: {
    justifyContent: "center",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  productPrice: {
    color: "#333",
    fontSize: 14,
  },
  productDetail: {
    color: "#666",
    fontSize: 13,
  },
  paymentContainer: {
    backgroundColor: "#FFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 20,
    alignItems: "center",
  },
  paymentInfo: {
    width: "100%",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: 300,
  },
  paymentLabel: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#230C02",
  },
  checkoutButton: {
    height: 50,
    width: 150,
    backgroundColor: "#230C02",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
  },
});
