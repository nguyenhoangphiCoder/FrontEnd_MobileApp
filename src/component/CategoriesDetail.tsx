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
              `http://192.168.1.34:3000/product_categories/category/${category_id}`
            ),
            axios.get("http://192.168.1.34:3000/product_sizes"),
            axios.get("http://192.168.1.343000/product_images"),
            axios.get("http://192.168.1.34:3000/products"),
          ]);
        const categoriesResponse = await axios.get(
          "http://192.168.1.34:3000/categories"
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
        setSizes(sizesResponse.data);

        const currentCategory = loadedCategories.find(
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
      style={{ backgroundColor: "#EDDCC6", flex: 1, paddingTop: 20 }}
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
            style={{ padding: 5, marginRight: 10 }}
          >
            <Image
              source={require("../images/vector-back-icon.jpg")}
              style={{ height: 37, width: 37, borderRadius: 5 }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#fff",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "#fff",
              paddingHorizontal: 10,
            }}
          >
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search"
              style={{ flex: 1, height: 40 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
            }}
          >
            <Image
              source={require("../images/cart2.jpg")}
              style={{ height: 40, width: 40, borderRadius: 5 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          <Text
            style={{
              fontSize: 30,
              fontStyle: "italic",
              fontWeight: "900",
              color: "#FFF",
            }}
          >
            {categoryName}
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProductDetail", { id: item.id });
            }}
            style={{
              marginVertical: 5,
              backgroundColor: "#FFF",
              flexDirection: "row",
              padding: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
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
              }}
            />
            <View
              style={{
                marginLeft: 15,
                flex: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: 150 }}>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    {item.name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "#000",
                    marginLeft: 50,
                  }}
                >
                  {adjustedPrices[item.id]} $
                </Text>
              </View>
              <Text style={{ fontSize: 16, color: "#888" }}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
