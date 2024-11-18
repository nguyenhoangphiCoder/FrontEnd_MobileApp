import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootDrawerParamList = {
  Home: undefined;
  Order: undefined;
  CategoriesDetail: { category_id: number };
  Cart: { cart: any; user_id: number };
  TeaCategories: undefined;
  PhindiCategories: undefined;
  MilkTeaCategories: undefined;
  FreezeCategories: undefined;
  ProductDetail: { id: number; user_id: number };
};

interface HomeProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
  route: any;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  description: string;
}

interface ProductImage {
  product: { id: number };
  image_url: string;
}

interface Category {
  id: number;
  name: string;
  route: keyof RootDrawerParamList;
}

export default function Home({ navigation, route }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null); // Dùng để lưu trữ user_id

  // console.log(`route.params :`, route.params);
  const scrollX = new Animated.Value(0);
  const { width } = Dimensions.get("window");

  const fetchCartData = async (user_id: number) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/carts?user_id=${user_id}`
      );
      console.log(`response`, response);
      setCart(response.data);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        console.log("Stored user_id:", storedUserId);
        if (storedUserId) {
          setUserId(Number(storedUserId)); // Chuyển đổi giá trị sang số
        }
      } catch (error) {
        console.error("Lỗi khi lấy user_id từ AsyncStorage:", error);
      }
    };
    async function fetchData() {
      try {
        const productsResponse = await axios.get(`${API_BASE_URL}/products`);
        const productImagesResponse = await axios.get(
          `${API_BASE_URL}/product_images`
        );
        const categoriesResponse = await axios.get(
          `${API_BASE_URL}/categories`
        );

        const productsWithImages = productsResponse.data.map(
          (product: Product) => {
            const image = productImagesResponse.data.find(
              (img: ProductImage) => img.product.id === product.id
            );
            return { ...product, image: image ? image.image_url : null };
          }
        );

        const loadedCategories = categoriesResponse.data.map(
          (category: Category) => ({
            ...category,
            route: `${category.name
              .charAt(0)
              .toUpperCase()}${category.name.slice(1)}Categories`,
          })
        );

        setCategories(loadedCategories);
        setProducts(productsWithImages);
        fetchCartData(14);
        fetchUserId(); // Ví dụ: user_id = 14
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

  const promotionImages = [
    require("../images/Promotion1.jpg"),
    require("../images/Promotion2.jpg"),
    require("../images/Promotion4.jpg"),
  ];
  const handleGoToCart = () => {
    if (userId !== null) {
      console.log("Navigating to cart with user_id:", userId);
      navigation.navigate("Cart", { cart, user_id: userId });
    } else {
      console.log("user_id không tồn tại!");
    }
  };
  const handleGoToProductDetail = (product: Product) => {
    if (userId !== null) {
      console.log("Navigating to cart with user_id:", userId);
      navigation.navigate("ProductDetail", { id: product.id, user_id: userId });
    } else {
      console.log("user_id không tồn tại!");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1, marginTop: 20 }}>
      <View
        style={{
          backgroundColor: "#fff",
          height: 70,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ marginLeft: 10 }}
        >
          <Image
            source={require("../images/mobile.png")}
            style={{ height: 35, width: 35, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 15,
            width: 280,
            height: 40,

            borderRadius: 10,
          }}
        >
          <TextInput
            placeholder="Search"
            style={{
              backgroundColor: "#fff",
              borderRadius: 15,
              paddingHorizontal: 10,
              height: 40,
              fontSize: 15,
              borderWidth: 2,
            }}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity onPress={handleGoToCart} style={{ marginRight: 10 }}>
          <Image
            source={require("../images/cart.png")}
            style={{ height: 40, width: 40, borderRadius: 5, marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Banner */}
        <View
          style={{
            backgroundColor: "#EEE",
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
                justifyContent: "center",
                marginLeft: 25,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
                THE TECH COFFEE
              </Text>
              <Text
                style={{ color: "#fff", fontSize: 12, fontStyle: "italic" }}
              >
                "Powered by Code, Fueled by Coffee."
              </Text>
            </View>
            <Image
              source={require("../images/logo1.jpg")}
              style={{
                width: 100,
                height: 100,
                marginTop: 50,
                borderRadius: 20,
                marginHorizontal: 20,
              }}
            />
          </View>
        </View>

        {/* Categories */}
        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() =>
                  navigation.navigate("CategoriesDetail", {
                    category_id: category.id,
                  })
                }
                style={{
                  width: 150,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  marginLeft: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    color: "#230C02",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Promotions */}
        <View style={{ backgroundColor: "#eee", height: 200 }}>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          >
            {promotionImages.map((image, index) => (
              <View
                key={index}
                style={{
                  width,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={image}
                  style={{ width: width - 20, height: 170, borderRadius: 10 }}
                />
              </View>
            ))}
          </Animated.ScrollView>
        </View>

        {/* Products */}
        <View style={{ backgroundColor: "#eee", marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#230C02",
              marginHorizontal: 15,
              marginBottom: 10,
            }}
          >
            All Products
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => handleGoToProductDetail(product)} // Pass category here
                style={{
                  marginRight: 20,
                  width: 150,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 5,
                  left: 15,
                }}
              >
                <Image
                  source={{
                    uri: product.image || "http://via.placeholder.com/250x250",
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
                <Text
                  style={{
                    color: "#230C02",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 14,
                    marginBottom: 5,
                  }}
                >
                  {product.name}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {product.price.toLocaleString()} $
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
