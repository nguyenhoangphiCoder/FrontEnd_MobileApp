import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserProfileProps {
  navigation: NavigationProp<any>;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  avatar_url: string;
}

interface Address {
  address_id: number;
  address_line: string;
  city: string;
  country: string;
}

export default function UserProfile({ navigation }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const handleLogout = async () => {
    try {
      const response = await fetch("http://192.168.1.5:3000/users/sign-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Thêm Authorization nếu cần thiết
        },
        credentials: "include", // Nếu bạn sử dụng cookie
      });

      if (response.ok) {
        // Xóa thông tin người dùng từ AsyncStorage
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("addresses");
        // Chuyển hướng về màn hình đăng nhập hoặc màn hình chính
        navigation.navigate("Login");
      } else {
        console.error("Error logging out:", response.status);
        // Xử lý thông báo lỗi ở đây nếu cần
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        const addressesData = await AsyncStorage.getItem("addresses");

        if (userData) {
          const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);
        }

        if (addressesData) {
          const parsedAddresses: Address[] = JSON.parse(addressesData);
          setAddresses(parsedAddresses);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EDDCC6", marginTop: 30 }}
    >
      <View
        style={{
          backgroundColor: "#EDDCC6",
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ padding: 5, marginRight: 10 }}
        >
          <Image
            source={require("../images/vector-back-icon.jpg")}
            style={{ height: 37, width: 37, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#230C02" }}>
            Account
          </Text>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Image
          source={{
            uri: user?.avatar_url || "https://example.com/default-avatar.jpg",
          }}
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            borderWidth: 4,
            borderColor: "#230C02",
            backgroundColor: "#FFEB3B",
          }}
          onError={() => {
            console.log("Error loading image, using default avatar.");
          }}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#230C02" }}>
            {user ? user.name : "Loading..."}
          </Text>
          <TouchableOpacity
            style={{
              marginLeft: 15,
              height: 35,
              width: 90,
              backgroundColor: "#D3C0AB",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("UpdateUserProfile")}
          >
            <Text style={{ fontWeight: "bold", color: "#230C02" }}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#D3C0AB",
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          paddingVertical: 20,
          marginTop: 40,
          paddingHorizontal: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <View
          style={{
            backgroundColor: "#EDDCC6",
            justifyContent: "center",
            marginVertical: 10,
            height: 60,
            borderRadius: 20,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#230C02" }}>
            Email: {user ? user.email : "Loading..."}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#EDDCC6",
            justifyContent: "center",
            marginVertical: 10,
            height: 60,
            borderRadius: 20,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#230C02" }}>
            Phone number: {user ? user.phone_number : "Loading..."}
          </Text>
        </View>

        {/* Hiển thị địa chỉ */}
        <View
          style={{
            backgroundColor: "#EDDCC6",
            justifyContent: "center",
            marginVertical: 10,
            height: 60,
            borderRadius: 20,
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{ fontSize: 15, fontWeight: "bold", color: "#230C02" }}
            numberOfLines={3}
          >
            Address:{" "}
            {addresses.length > 0
              ? addresses
                  .map(
                    (address) =>
                      `${address.address_line}, ${address.city}, ${address.country}`
                  )
                  .join(", ")
              : "No addresses found."}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#230C02",
            alignItems: "center",
            marginVertical: 10,
            height: 60,
            borderRadius: 20,
            justifyContent: "center",
          }}
          onPress={handleLogout}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
