import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";

export default function FlashScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    // Chuyển sang màn hình Login sau 3 giây
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000); // Thời gian chuyển màn hình

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff1",
      }}
    >
      <Image
        source={require("../images/logo1.jpg")}
        style={{
          width: "100%",
          height: "50%",
          position: "absolute",
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          bottom: 230,
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center", // Căn giữa văn bản
          position: "absolute", // Đặt text ở giữa màn hình
          fontStyle: "italic",
        }}
      >
        Welcome to THE TECH COFFEE
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center", // Căn giữa văn bản
          position: "absolute", // Đặt text ở giữa màn hình
          bottom: 200, // Cách đáy màn hình 50px
          fontStyle: "italic",
        }}
      >
        "Powered by Code, Fueled by Coffee."
      </Text>
    </View>
  );
}
