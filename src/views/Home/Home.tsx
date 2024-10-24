import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";

interface HomeProps {
  navigation: NavigationProp<any>;
}
export default function Home({ navigation }: HomeProps) {
  return (
    <SafeAreaView
      style={{ backgroundColor: "#230C02", flex: 1, marginTop: 30 }}
    >
      <View
        style={{ backgroundColor: "#230C02", height: 60, flexDirection: "row" }}
      >
        <TouchableOpacity>
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: "#fff",
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 13,
              marginHorizontal: 10,
            }}
          >
            <Image
              source={require("../../images/accountIcon.png")}
              style={{ height: 25, width: 25 }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 1,
            width: 275,
            marginLeft: 40,
            marginTop: 15,
            marginBottom: 10,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
            placeholder="Search"
            style={{
              height: 30,
              paddingHorizontal: 15,
            }}
          />
        </View>
      </View>
      <ScrollView>
        {/* coffee card */}
        <View
          style={{
            backgroundColor: "#EDDCC6",
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#230C02",
              height: 150,
              width: 300,
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  marginTop: 50,
                  marginLeft: 25,
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                THE TECH COFFEE
              </Text>
              <Text
                style={{
                  color: "#fff",
                  marginTop: 5,
                  marginLeft: 10,
                  fontSize: 10,
                  fontStyle: "italic",
                }}
              >
                "Powered by Code, Fueled by Coffee."
              </Text>
            </View>
            <Image
              source={require("../../images/Logo.png")}
              style={{
                width: 120,
                height: 120,
                marginTop: 40,
                marginLeft: 25,
              }}
            />
          </View>
        </View>
        {/* categories */}
        <View
          style={{
            height: 100,
            backgroundColor: "#230C02",
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 60,
                    width: 60,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/Coffee/iconcoffeecategories.jpg")}
                    style={{ height: 40, width: 40 }}
                  />
                </View>
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  COFFEE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 60,
                    width: 60,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/milk tea/milkteacategories.jpg")}
                    style={{ height: 40, width: 40 }}
                  />
                </View>
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  MILK TEA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 60,
                    width: 60,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/phindi/phindicategories.jpg")}
                    style={{ height: 40, width: 40 }}
                  />
                </View>
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  PHINDI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 60,
                    width: 60,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/Tea/iconteacategories.jpg")}
                    style={{ height: 40, width: 40 }}
                  />
                </View>
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  TEA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 60,
                    width: 60,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/Tea/iconteacategories.jpg")}
                    style={{ height: 40, width: 40 }}
                  />
                </View>
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  FREZZE
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {/* Promotion */}
        <View
          style={{
            backgroundColor: "gray",
            height: 200,
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 5,
                }}
              >
                <Image
                  source={require("../../images/Promotion1.jpg")}
                  style={{ width: 380, height: 170 }}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 5,
                }}
              >
                <Image
                  source={require("../../images/Promotion2.jpg")}
                  style={{ width: 380, height: 170 }}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 5,
                }}
              >
                <Image
                  source={require("../../images/Promotion4.jpg")}
                  style={{ width: 380, height: 170 }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ backgroundColor: "#230C02" }}>
          <View>
            <Text
              style={{
                fontSize: 15,
                marginTop: 20,

                color: "#fff",
                marginLeft: 20,
              }}
            >
              Best Seller!!!
            </Text>
          </View>
          <View
            style={{ marginTop: 10, marginLeft: 30, flexDirection: "column" }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    width: 150,
                    height: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/Coffee/iconcoffeecategories.jpg")}
                    style={{ width: 80, height: 80 }}
                  />
                  <Text
                    style={{
                      color: "#230C02",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Espresso
                  </Text>

                  <Text style={{ color: "#230C02", fontSize: 15 }}>
                    50.000vnd
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    width: 150,
                    height: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/phindi/phindicategories.jpg")}
                    style={{ width: 80, height: 80 }}
                  />
                  <Text
                    style={{
                      color: "#230C02",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Phindi
                  </Text>

                  <Text style={{ color: "#230C02", fontSize: 15 }}>
                    50.000vnd
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    width: 150,
                    height: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/Coffee/iconcoffeecategories.jpg")}
                    style={{ width: 80, height: 80 }}
                  />
                  <Text
                    style={{
                      color: "#230C02",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Espresso
                  </Text>

                  <Text style={{ color: "#230C02", fontSize: 15 }}>
                    50.000vnd
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    width: 150,
                    height: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/phindi/phindicategories.jpg")}
                    style={{ width: 80, height: 80 }}
                  />
                  <Text
                    style={{
                      color: "#230C02",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Phindi
                  </Text>

                  <Text style={{ color: "#230C02", fontSize: 15 }}>
                    50.000vnd
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    width: 150,
                    height: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/Coffee/iconcoffeecategories.jpg")}
                    style={{ width: 80, height: 80 }}
                  />
                  <Text
                    style={{
                      color: "#230C02",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Espresso
                  </Text>

                  <Text style={{ color: "#230C02", fontSize: 15 }}>
                    50.000vnd
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#FFF",
                    width: 150,
                    height: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <Image
                    source={require("../../images/ProductImage/phindi/phindicategories.jpg")}
                    style={{ width: 80, height: 80 }}
                  />
                  <Text
                    style={{
                      color: "#230C02",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Phindi
                  </Text>

                  <Text style={{ color: "#230C02", fontSize: 15 }}>
                    50.000vnd
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
