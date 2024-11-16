import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API";

interface SetAddressProps {
  navigation: NavigationProp<any>;
}

interface Address {
  address_id: number;
  address_line: string;
  city: string;
  country: string;
  is_default: boolean;
}

export default function SetAddress({ navigation }: SetAddressProps) {
  const [address_id, setAddressId] = useState<number | undefined>(undefined);
  const [address_line, setAddressLine] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    const loadUserInfo = async () => {
      const userInfo = await AsyncStorage.getItem("addresses");
      if (userInfo) {
        const addresses: Address[] = JSON.parse(userInfo);
        const defaultAddress =
          addresses.find((address) => address.is_default) || addresses[0];
        if (defaultAddress) {
          setAddressId(defaultAddress.address_id);
          setAddressLine(defaultAddress.address_line || "");
          setCountry(defaultAddress.country || "");
          setCity(defaultAddress.city || "");
        } else {
          console.log("No default address found.");
        }
      } else {
        console.log("No addresses found in AsyncStorage.");
      }
    };
    loadUserInfo();
  }, []);

  const updateAddress = async () => {
    const token = await AsyncStorage.getItem("addresses");
    console.log(token);
    if (!token) {
      Alert.alert("Error", "User token is not available.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/addresses/${address_id}`,
        { address_line, country, city },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.status === 200) {
        Alert.alert("Success", "Address updated successfully!");
        const updatedAddresses = await AsyncStorage.getItem("addresses");
        const parsedAddresses: Address[] = updatedAddresses
          ? JSON.parse(updatedAddresses)
          : [];

        const updatedAddressIndex = parsedAddresses.findIndex(
          (address) => address.address_id === address_id
        );

        if (updatedAddressIndex !== -1) {
          parsedAddresses[updatedAddressIndex] = response.data;
        }

        await AsyncStorage.setItem(
          "addresses",
          JSON.stringify(parsedAddresses)
        );
        navigation.navigate("UserProfile", {
          updatedAddress: response.data,
        });
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || "Failed to update address."
          : "An unexpected error occurred.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#D3C0AB", marginTop: 30 }}
    >
      <View
        style={{
          backgroundColor: "#EDDCC6",
          height: 50,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
          <Image
            source={require("../images/vector-back-icon.jpg")}
            style={{ height: 37, width: 37, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 80 }}>
          Update Address
        </Text>
      </View>
      <View style={{ marginTop: 100, alignItems: "center" }}>
        <TextInput
          placeholder="Your address line"
          style={{
            height: 45,
            borderRadius: 20,
            backgroundColor: "#EDDCC6",
            borderWidth: 1,
            padding: 10,
            marginBottom: 15,
            width: 350,
          }}
          value={address_line}
          onChangeText={setAddressLine}
        />

        <TextInput
          placeholder="Your city"
          style={{
            height: 45,
            borderRadius: 20,
            backgroundColor: "#EDDCC6",
            borderWidth: 1,
            padding: 10,
            marginBottom: 15,
            width: 350,
          }}
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          placeholder="Your country"
          style={{
            height: 45,
            borderRadius: 20,
            backgroundColor: "#EDDCC6",
            borderWidth: 1,
            padding: 10,
            marginBottom: 15,
            width: 350,
          }}
          value={country}
          onChangeText={setCountry}
        />
        <TouchableOpacity onPress={updateAddress}>
          <View
            style={{
              backgroundColor: "#EDDCC6",
              marginTop: 30,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              width: 200,
            }}
          >
            <Text
              style={{ color: "#230C02", fontSize: 15, fontWeight: "bold" }}
            >
              Update Address
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
