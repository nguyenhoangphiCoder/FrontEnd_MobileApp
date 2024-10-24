import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
interface SignUpProps {
  navigation: NavigationProp<any>;
}
export default function SignUp({ navigation }: SignUpProps) {
  return (
    <SafeAreaView style={{ backgroundColor: "#EDDCC6", flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            marginTop: 55,
            marginLeft: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Image
          source={require("../../images/Logo.png")}
          style={{
            width: 40,
            height: 40,
            marginHorizontal: 270,
            marginTop: 50,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "900", color: "#230C02" }}>
          Create your account!
        </Text>
      </View>
      <View style={{ marginHorizontal: 50, marginTop: 80 }}>
        <View
          style={{
            height: 45,
            borderRadius: 20,
            borderColor: "#230C02",
            borderWidth: 1,
          }}
        >
          <TextInput
            placeholder="Your name"
            style={{
              height: 40,
              padding: 10,
              marginBottom: 10,
            }}
          />
        </View>
        <View
          style={{
            height: 45,
            borderRadius: 20,
            borderColor: "#230C02",
            borderWidth: 1,
            marginTop: 15,
          }}
        >
          <TextInput
            placeholder="Your Email"
            style={{
              height: 40,
              padding: 10,
              marginBottom: 10,
            }}
          />
        </View>
        <View
          style={{
            height: 45,
            borderRadius: 20,
            borderColor: "#230C02",
            borderWidth: 1,
            marginTop: 15,
          }}
        >
          <TextInput
            placeholder="Your password"
            style={{
              height: 40,
              padding: 10,
              marginBottom: 10,
            }}
          />
        </View>
        <View
          style={{
            height: 45,
            borderRadius: 20,
            borderColor: "#230C02",
            borderWidth: 1,
            marginTop: 15,
          }}
        >
          <TextInput
            placeholder="Your phone number"
            style={{
              height: 40,
              padding: 10,
              marginBottom: 10,
            }}
          />
        </View>

        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#230C02",
              marginTop: 30,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#EDDCC6",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Create an account
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              marginTop: 30,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "#230C02",
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                color: "#230C02",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
