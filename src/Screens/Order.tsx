import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";

interface OrderProps {
  navigation: NavigationProp<any>;
}

export default function Order({ navigation }: OrderProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");

  const handleConfirmOrder = () => {
    // Thực hiện xác nhận đơn hàng ở đây, ví dụ gọi API hoặc lưu vào cơ sở dữ liệu.
    // Sau khi xử lý thành công, bạn có thể hiển thị thông báo
    Alert.alert("Order Confirmed", "Your order has been successfully placed!");
    // Điều hướng về màn hình chính hoặc trang khác sau khi xác nhận
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 35,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <View
        style={{
          height: 50,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{
            padding: 5,
            marginRight: 10,
          }}
        >
          <Image
            source={require("../images/vector-back-icon.jpg")}
            style={{ height: 37, width: 37, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
          }}
        >
          Order
        </Text>
      </View>

      {/* Cart Items */}
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}
      >
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#EDDCC6",
            borderRadius: 25,
            width: "90%",
            padding: 20,
            marginVertical: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          {/* Hình ảnh và thông tin sản phẩm */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../images/Logo1.png")}
              style={{ height: 100, width: 100, marginRight: 20 }}
            />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}
              >
                Coffee
              </Text>
              <Text style={{ fontSize: 16, color: "#444" }}>Size: Large</Text>
              <Text style={{ fontSize: 16, color: "#444" }}>Quantity: x2</Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  50000 VND
                </Text>
              </View>
            </View>
          </View>

          {/* Giá sản phẩm */}
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          backgroundColor: "#EDDCC6",
          paddingVertical: 15,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ paddingBottom: 10 }}>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Total:</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>
              450000 VND
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Name:</Text>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              nguyen hoang phi
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Phone:</Text>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>0945327617</Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Address:</Text>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              ninh kieu can tho
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Payment Method:
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setSelectedPaymentMethod("COD")}
                style={{
                  height: 30,
                  width: 60,
                  backgroundColor:
                    selectedPaymentMethod === "COD" ? "#230C02" : "#fff",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: selectedPaymentMethod === "COD" ? "#fff" : "#000",
                  }}
                >
                  COD
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedPaymentMethod("VISA")}
                style={{
                  height: 30,
                  width: 60,
                  backgroundColor:
                    selectedPaymentMethod === "VISA" ? "#230C02" : "#fff",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: selectedPaymentMethod === "VISA" ? "#fff" : "#000",
                  }}
                >
                  VISA
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleConfirmOrder}
          style={{
            height: 55,
            backgroundColor: "#230C02",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            width: "80%",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
