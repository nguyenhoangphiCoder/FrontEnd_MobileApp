import React, { useState, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import axios from "axios";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { API_BASE_URL } from "../../ip_API";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
  id: number;
  name: string;
  quantity: number;
  size: string;
  note: string;
  price: number;
  image: string | null;
  description: string;
}

interface Size {
  id: number;
  size: string;
  price_adjustment: string;
}

interface ProductImage {
  product: { id: number };
  image_url: string;
}

type RootDrawerParamList = {
  Home: undefined;
  Product: {
    Product: Product[];
  };
  CategoryProducts: { category_id: number; name: string };
  ProductDetail: { id: number; user_id: number };
};

interface CategoryProductsScreenProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
  route: any;
}

interface Category {
  id: number;
  name: string;
  route: keyof RootDrawerParamList;
}

export default function CategoryProductsScreen({
  navigation,
  route,
}: CategoryProductsScreenProps) {
  const { category_id } = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [adjustedPrices, setAdjustedPrices] = useState<{
    [key: number]: number;
  }>({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProductsAndSizes = async () => {
      try {
        setLoading(true);
        const [productsResponse, sizesResponse, productImagesResponse] =
          await Promise.all([
            axios.get(
              `${API_BASE_URL}/product_categories/category/${category_id}`
            ),
            axios.get(`${API_BASE_URL}/product_sizes`),
            axios.get(`${API_BASE_URL}/product_images`),
            axios.get(`${API_BASE_URL}/products`),
          ]);
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

        setCategories(categoriesResponse.data);
        setProducts(productsWithImages);
        setSizes(sizesResponse.data);

        const currentCategory = categoriesResponse.data.find(
          (category: Category) => category.id === category_id
        );
        if (currentCategory) {
          setCategoryName(currentCategory.name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndSizes();
  }, [category_id]);

  useEffect(() => {
    const newPrices: { [key: number]: number } = {};

    products.forEach((product) => {
      const sizeAdjustment = selectedSize
        ? sizes.find((size) => size.size === selectedSize)?.price_adjustment
        : null;
      const adjustedPrice = sizeAdjustment
        ? product.price + parseFloat(sizeAdjustment)
        : product.price;
      newPrices[product.id] = adjustedPrice;
    });

    setAdjustedPrices(newPrices);
  }, [selectedSize, products, sizes]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Lấy user_id từ AsyncStorage
  const getUserId = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    return user_id;
  };

  // Hàm điều hướng và truyền user_id
  const handleNavigation = async (productId: number) => {
    const user_id_string = await getUserId(); // Lấy user_id từ AsyncStorage

    // Chuyển user_id thành kiểu number
    const user_id = user_id_string ? parseInt(user_id_string) : 0;

    // Điều hướng và truyền productId cùng với user_id
    navigation.navigate("ProductDetail", { id: productId, user_id });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1, paddingTop: 30 }}>
      <View style={{ backgroundColor: "#230C02", paddingBottom: 10 }}>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{ padding: 10 }}
          >
            <Image
              source={require("../images/vector-back-icon.jpg")}
              style={{ height: 30, width: 30, borderRadius: 5 }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 20,
              paddingHorizontal: 10,
            }}
          >
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search products..."
              style={{ flex: 1, height: 40, fontSize: 16 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          >
            <Image
              source={require("../images/cart.jpg")}
              style={{ height: 30, width: 30, borderRadius: 5 }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            color: "#fff",
            paddingTop: 10,
          }}
        >
          {categoryName}
        </Text>
      </View>

      <FlatList
        style={{ padding: 20 }}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigation(item.id)} // Gọi handleNavigation
            style={{
              flexDirection: "row",
              backgroundColor: "#f9f9f9",
              borderRadius: 15,
              width: "100%",
              padding: 15,
              marginVertical: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Image
              source={{
                uri: item.image || "http://via.placeholder.com/250x250",
              }}
              style={{
                height: 80,
                width: 80,
                marginRight: 15,
                borderRadius: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 16, color: "#333" }}>
                {item.description}
              </Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
              ${Math.floor(adjustedPrices[item.id])}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
