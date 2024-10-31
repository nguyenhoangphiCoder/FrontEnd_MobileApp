import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";

interface UserProfileProps {
  navigation: NavigationProp<any>;
}

export default function UserProfile({ navigation }: UserProfileProps) {
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
        <View
          style={{
            backgroundColor: "#FFEB3B",
            height: 150,
            width: 150,
            borderRadius: 75,
            borderWidth: 4,
            borderColor: "#230C02",
          }}
        ></View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#230C02" }}>
            Nguyen Hoang Phi
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
            Email: example@example.com
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
            Phone number: 123-456-7890
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
            Address: 123 Coffee St, Coffee City
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
