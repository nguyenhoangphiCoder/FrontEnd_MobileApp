import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

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

export default function Home({ navigation }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://192.168.1.5:3000/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      key={item.id}
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        margin: 10,
      }}
    >
      <Image source={{ uri: item.image }} style={{ width: 150, height: 150 }} />
      <Text style={{ color: "#230C02", fontSize: 13, fontWeight: "bold" }}>
        {item.name}
      </Text>
      <Text style={{ color: "#230C02", fontSize: 10, fontWeight: "bold" }}>
        {item.price}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

        <View style={{ height: 100, backgroundColor: "#230C02" }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                onPress={() => navigation.navigate("PhindiCategories")}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                {/* <Image
                  source={require("../images/ProductImage/Phindi/iconphindicategories.jpg")}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 20,
                    marginLeft: 20,
                  }}
                /> */}
                <Text
                  style={{ marginLeft: 16, fontWeight: "bold", color: "#FFF" }}
                >
                  PHIN ĐI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("FreezeCategories")}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Image
                  source={require("../images/ProductImage/Freeze/iconfreezecategories.jpg")}
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
                  FREEZE
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* danh sách sản phẩm */}
        <FlatList
          data={filteredProducts} // Sử dụng danh sách đã lọc
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20, marginLeft: 30 }} // Thêm khoảng cách cho FlatList
          numColumns={2} // Hiển thị 2 sản phẩm trên một hàng
        />
      </ScrollView>
    </SafeAreaView>
  );
}
