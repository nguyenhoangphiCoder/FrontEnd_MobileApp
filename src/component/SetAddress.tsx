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
import AntDesign from "@expo/vector-icons/AntDesign";
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eee", marginTop: 30 }}>
      <View
        style={{
          backgroundColor: "#eee",
          height: 50,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
          <AntDesign
            name="arrowleft"
            size={30}
            color="black"
            paddingLeft={10}
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
            backgroundColor: "#fff",

            padding: 10,
            marginBottom: 15,
            width: 350,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 100,
          }}
          value={address_line}
          onChangeText={setAddressLine}
        />

        <TextInput
          placeholder="Your city"
          style={{
            height: 45,
            borderRadius: 20,
            backgroundColor: "#fff",

            padding: 10,
            marginBottom: 15,
            width: 350,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 100,
          }}
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          placeholder="Your country"
          style={{
            height: 45,
            borderRadius: 20,
            backgroundColor: "#fff",

            padding: 10,
            marginBottom: 15,
            width: 350,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 100,
          }}
          value={country}
          onChangeText={setCountry}
        />
        <TouchableOpacity onPress={updateAddress}>
          <View
            style={{
              backgroundColor: "#230C02",
              marginTop: 30,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              width: 200,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
              Update Address
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
