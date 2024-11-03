import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import axios from "axios";

type RootDrawerParamList = {
  Home: undefined;
  Order: undefined;
  CoffeeCategories: undefined;
  Cart: undefined;
  TeaCategories: undefined;
  PhindiCategories: undefined;
  MilkteaCategories: undefined;
  FreezeCategories: undefined;
};

interface HomeProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string | null; // Chỉ định rằng image có thể là null
}
interface ProductImage {
  product: { id: number };
  image_url: string;
}

export default function Home({ navigation }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await axios.get(
          "http://192.168.1.5:3000/products"
        );
        const productImagesResponse = await axios.get(
          "http://192.168.1.5:3000/product_images"
        );

        const productsWithImages = productsResponse.data.map(
          (product: Product) => {
            const image = productImagesResponse.data.find(
              (img: ProductImage) => img.product.id === product.id
            );
            return { ...product, image: image ? image.image_url : null };
          }
        );

        setProducts(productsWithImages);
      } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <SafeAreaView
      style={{ backgroundColor: "#230C02", flex: 1, marginTop: 30 }}
    >
      <View
        style={{ backgroundColor: "#230C02", height: 60, flexDirection: "row" }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View
            style={{
              backgroundColor: "#fff",
              marginTop: 17,
              borderRadius: 5,
              marginLeft: 10,
            }}
          >
            <Image
              source={require("../images/mobile.png")}
              style={{ height: 30, width: 30 }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 1,
            width: 290,
            marginLeft: 10,
            marginTop: 15,
            marginBottom: 10,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
            placeholder="Search"
            style={{ height: 30, paddingHorizontal: 15, width: 290 }}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 35,
            width: 35,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 15,
            marginHorizontal: 15,
          }}
          onPress={() => navigation.navigate("Cart")}
        >
          <Image
            source={require("../images/cart2.jpg")}
            style={{ height: 35, width: 35, borderRadius: 5 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
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
            <View style={{ flexDirection: "column" }}>
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
              source={require("../images/Logo1.png")}
              style={{
                width: 135,
                height: 130,
                marginTop: 30,
                marginLeft: 20,
                borderRadius: 20,
                backgroundColor: "#D3C0AB",
              }}
            />
          </View>
        </View>
        {/* Categories */}
        <View style={{ height: 100, backgroundColor: "#230C02" }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("CoffeeCategories")}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Image
                  source={require("../images/ProductImage/Coffee/iconcoffeecategories.jpg")}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 20,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  COFFEE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("MilkteaCategories")}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Image
                  source={require("../images/ProductImage/milk tea/milkteacategories.jpg")}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 20,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  MILK TEA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("PhindiCategories")}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Image
                  source={require("../images/ProductImage/phindi/phindicategories.jpg")}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 20,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  PHINDI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("TeaCategories")}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Image
                  source={require("../images/ProductImage/Tea/iconteacategories.jpg")}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 20,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  TEA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("FreezeCategories")}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 60,
                    width: 60,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={require("../images/ProductImage/Freeze/FREEZE.png")}
                    style={{ height: 60, width: 60 }}
                  />
                </View>
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  FREEZE
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {/* Promotion */}
        <View style={{ backgroundColor: "gray", height: 200 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                  source={require("../images/Promotion1.jpg")}
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
                  source={require("../images/Promotion2.jpg")}
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
                  source={require("../images/Promotion4.jpg")}
                  style={{ width: 380, height: 170 }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ backgroundColor: "#230C02", marginBottom: 20 }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                marginTop: 20,
                color: "#fff",
                marginLeft: 20,
                fontWeight: "bold",
              }}
            >
              All
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={{
                  backgroundColor: "#EDDCC6",
                  height: 200,
                  width: 150,
                  borderRadius: 10,
                  marginLeft: 20,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                {product.image ? (
                  <Image
                    source={{ uri: product.image }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 120,
                      height: 90,
                      borderRadius: 10,
                      backgroundColor: "#D3C0AB",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>No Image</Text>
                  </View>
                )}
                <Text
                  style={{ marginTop: 5, fontSize: 16, fontWeight: "bold" }}
                >
                  {product.name}
                </Text>
                <Text style={{ color: "#ED9A36", fontSize: 14 }}>
                  ₫ {product.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
