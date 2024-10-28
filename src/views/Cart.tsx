import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextComponent,
  ScrollView,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerNavigationProp } from "@react-navigation/drawer";
type RootDrawerParamList = {
  // Thêm các màn hình khác nếu cần
  Home: undefined;
  Order: undefined;
  Coffee: undefined;
  Cart: undefined;
  Tea: undefined;
  Phindi: undefined;
  MilkTea: undefined;
  Freeze: undefined;
  Payment: undefined;
};
interface CartItemProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
}
export default function Cart({ navigation }: CartItemProps) {
  return (
    <SafeAreaView
      style={{ marginTop: 30, flex: 1, backgroundColor: "#230C02" }}
    >
      <View style={{ backgroundColor: "#230C02", height: 100 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              width: 100,
              height: 30,
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={{}}>
        <View
          style={{
            height: 140,

            backgroundColor: "#FFF",
            borderRadius: 20,
            width: 400,

            marginTop: 10,
            marginLeft: 8,
          }}
        >
          <View
            style={{
              height: 130,

              width: 300,

              flexDirection: "row",
            }}
          >
            <Image
              source={require("../images/Logo1.png")}
              style={{ width: 120, height: 120, margin: 10 }}
            />
            <View
              style={{
                marginLeft: 10,
                // alignItems: "center",
                justifyContent: "center",
                marginTop: -10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Lorem</Text>
              <Text>50.000vnd</Text>
              <Text style={{ fontSize: 20 }}>Size:L</Text>
              <Text>Note: </Text>
            </View>
            <View
              style={{
                // alignItems: "center",
                // justifyContent: "center",
                marginLeft: 35,
                marginTop: 100,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      backgroundColor: "#230C02",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: "#fff" }}> - </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 25,
                    width: 25,
                    backgroundColor: "#FFF",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>1</Text>
                </View>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      backgroundColor: "#230C02",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: "#FFF" }}>+</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 25,
                      width: 55,
                      backgroundColor: "#230C02",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 6,
                      marginLeft: 5,
                    }}
                  >
                    <Text style={{ color: "#FFF" }}>delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#FFF",
          height: 150,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 30,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ margin: 35, marginLeft: 40, marginTop: 40 }}>
          <Text style={{ fontSize: 25, fontWeight: "500" }}>Total</Text>
          <Text style={{ fontSize: 15 }}>150.000vnd</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Payment");
          }}
        >
          <View
            style={{
              height: 50,
              width: 200,
              backgroundColor: "#230C02",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              margin: 30,
              marginLeft: 40,
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>
              CHECK OUT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
