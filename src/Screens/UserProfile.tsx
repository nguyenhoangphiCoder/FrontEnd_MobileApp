import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../ip_API";
import AntDesign from "@expo/vector-icons/AntDesign";
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
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/users/sign-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("addresses");
        navigation.navigate("Login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Logout failed.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setErrorMessage("Logout failed due to an error.");
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
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    const unsubscribe = navigation.addListener("focus", fetchUser);

    return unsubscribe;
  }, [navigation]);

  const fetchAvatar = async (id: number) => {
    try {
      console.log("Fetching avatar for user with ID:", id);
      const response = await fetch(`${API_BASE_URL}/users/${id}/avatar`);
      if (response.ok) {
        const data = await response.json();
        console.log("Avatar data:", data); // Kiểm tra dữ liệu avatar nhận được
        setUser((prevUser) => ({
          ...prevUser!,
          avatar_url: data.avatar_url,
        }));
      } else {
        throw new Error(`Failed to fetch avatar: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
      setErrorMessage("Failed to load avatar. Please check your network.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAvatar(user.id);
    }
  }, [user?.id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eee", marginTop: 30 }}>
      <View
        style={{
          backgroundColor: "#fff",
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
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, marginRight: 35 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#230C02",
              textAlign: "center",
            }}
          >
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
            uri: user?.avatar_url || "http://via.placeholder.com/100x100",
          }}
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
          }}
          onError={() => {
            console.log("Error loading avatar, using default avatar");
            setUser((prevUser) => ({
              ...prevUser!,
              avatar_url: `no avatar`, // default avatar URL
            }));
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
              backgroundColor: "#fff",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 5,
            }}
            onPress={() => navigation.navigate("UpdateUserProfile")}
          >
            <Text style={{ fontWeight: "bold", color: "#230C02" }}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#eee",
          paddingVertical: 20,
          marginTop: 40,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            marginVertical: 10,
            height: 60,
            borderRadius: 20,
            paddingHorizontal: 15,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#230C02" }}>
            Email: {user ? user.email : "Loading..."}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            marginVertical: 10,
            height: 60,
            borderRadius: 20,
            paddingHorizontal: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#230C02" }}>
            Phone number: {user ? user.phone_number : "Loading..."}
          </Text>
        </View>

        {/* Hiển thị địa chỉ */}
        <View
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            marginVertical: 10,
            height: 60,
            borderRadius: 20,
            paddingHorizontal: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
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
          onPress={() => {
            navigation.navigate("SetAddress");
          }}
          style={{
            backgroundColor: "#230C02",
            alignItems: "center",
            marginVertical: 10,
            height: 60,
            borderRadius: 20,
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Update address
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#230C02",
            alignItems: "center",
            marginVertical: 10,
            height: 60,
            borderRadius: 20,
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
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
