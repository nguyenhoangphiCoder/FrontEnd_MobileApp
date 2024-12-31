import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
type RootDrawerParamList = {
  Home: undefined;
  OrderHistory: undefined;
  ForgotPassword: undefined;
  ResetPassword: { userId: number };
};
interface VisaQRCodeDrop {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
  route: any;
}

export default function VisaQRCode({ navigation }: VisaQRCodeDrop) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Scan to Pay</Text>
      <View style={styles.qrContainer}>
        <Image
          source={require("../images/QR.png")}
          style={{ height: 150, width: 150 }}
        ></Image>
      </View>
      <Text style={styles.info}>Sacombank</Text>
      <Text style={styles.info}>NGUYEN HOANG PHI</Text>
      <Text style={styles.info}>0701 2027 1022</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#230C02",
          height: 50,
          width: 150,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
          Success
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  qrContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  info: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
});
