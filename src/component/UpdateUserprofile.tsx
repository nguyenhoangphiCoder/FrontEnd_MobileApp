import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";

interface UpdateUserProfileProps {
  navigation: NavigationProp<any>;
}
export default function UpdateUserProfile({
  navigation,
}: UpdateUserProfileProps) {
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserProfile");
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
          style={{
            alignItems: "center",
            justifyContent: "center",

            width: 205,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Update Account
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 100, alignItems: "center" }}>
        <TextInput placeholder="Your name" style={styles.input} />
        <TextInput placeholder="Your Email" style={styles.input} />
        <TextInput placeholder="your address" style={styles.input} />
        <TextInput placeholder="Your phone number" style={styles.input} />
        <TextInput placeholder="your avatar" style={styles.input} />

        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 45,
    borderRadius: 20,
    backgroundColor: "#EDDCC6",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    width: 350,
  },
  button: {
    backgroundColor: "#EDDCC6",
    marginTop: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 200,
  },
  buttonText: {
    color: "#230C02",
    fontSize: 15,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#230C02",
    borderWidth: 2,
  },
  loginButtonText: {
    color: "#230C02",
    fontSize: 15,
    fontWeight: "bold",
  },
});
