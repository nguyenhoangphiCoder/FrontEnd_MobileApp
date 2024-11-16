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
  ProductDetail: { id: number };
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

  return (
    <SafeAreaView
      style={{ backgroundColor: "#F0F0F0", flex: 1, paddingTop: 20 }}
    >
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
              source={require("../images/cart2.jpg")}
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
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetail", { id: item.id })
            }
            style={{
              marginVertical: 10,
              backgroundColor: "#fff",
              flexDirection: "row",
              padding: 15,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: item.image || "http://via.placeholder.com/250x250",
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginRight: 15,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 14, color: "#777" }}>
                {item.description}
              </Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#FF6347" }}>
              ${Math.floor(adjustedPrices[item.id])}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
