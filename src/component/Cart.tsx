import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";

interface CartProps {
  navigation: NavigationProp<any>;
}

export default function Cart({ navigation }: CartProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 35,
        backgroundColor: "#230C02",
      }}
    >
      {/* Header */}
      <View
        style={{
          height: 50,
          backgroundColor: "#EDDCC6",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            backgroundColor: "#230C02",
            height: 40,
            width: 60,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
            Back
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 80,
          }}
        >
          My Cart
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
              <Text style={{ fontSize: 14, color: "#888", marginTop: 5 }}>
                Note: No sugar
              </Text>
            </View>
          </View>

          {/* Giá sản phẩm */}
          <View
            style={{
              marginTop: 15,
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                paddingVertical: 10,
                paddingHorizontal: 25,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                50000 VND
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#EDDCC6",
          paddingVertical: 15,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "bold", marginHorizontal: 10 }}
        >
          Total:
        </Text>
        <Text
          style={{ fontSize: 18, fontWeight: "bold", marginHorizontal: 10 }}
        >
          450000 VND
        </Text>
        <TouchableOpacity
          style={{
            height: 55,
            width: 160,
            backgroundColor: "#230C02",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
            Check Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
