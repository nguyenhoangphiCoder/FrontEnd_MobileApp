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

interface LoginProps {
  navigation: NavigationProp<any>;
}

export default function Login({ navigation }: LoginProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../images/Logo1.png")} style={styles.logo} />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.brandText}>THE TECH COFFEE</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Your Email" style={styles.input} />
        </View>
        <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Your Password" style={styles.input} />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyDrawer");
          }}
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <View style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Create an account</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Your Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDDCC6",
    flex: 1,
  },
  logoContainer: {
    marginTop: 80,
    justifyContent: "center",
    backgroundColor: "#D3C0AB",
    alignItems: "center",
    width: 180,
    height: 177,
    marginLeft: 110,
    borderRadius: 15,
  },
  logo: {
    width: 170,
    height: 170,
  },
  welcomeContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#230C02",
  },
  brandText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#230C02",
  },
  formContainer: {
    marginHorizontal: 50,
    marginTop: 50,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#230C02",
  },
  passwordLabel: {
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 10,
    height: 45,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#230C02",
    marginTop: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  loginButtonText: {
    color: "#EDDCC6",
    fontSize: 15,
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#230C02",
    borderWidth: 2,
  },
  signupButtonText: {
    color: "#230C02",
    fontSize: 15,
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  forgotPasswordText: {
    color: "#230C02",
    fontSize: 15,
    fontWeight: "bold",
  },
});
