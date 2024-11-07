import React, { useState, useEffect } from "react";
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
import { Picker } from "@react-native-picker/picker";

// Định nghĩa kiểu cho sản phẩm và kích cỡ
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

  // Fetch data
  // In your useEffect hook where you find the category
  useEffect(() => {
    const fetchProductsAndSizes = async () => {
      try {
        setLoading(true);
        const [productsResponse, sizesResponse, productImagesResponse] =
          await Promise.all([
            axios.get(
              `http://192.168.1.5:3000/product_categories/category/${category_id}`
            ),
            axios.get("http://192.168.1.5:3000/product_sizes"),
            axios.get("http://192.168.1.5:3000/product_images"),
          ]);
        const categoriesResponse = await axios.get(
          "http://192.168.1.5:3000/categories"
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
              .toUpperCase()}${category.name.slice(1)}Categories`, // Tạo route dựa trên name
          })
        );

        setCategories(loadedCategories);
        setProducts(productsWithImages);
        setSizes(sizesResponse.data);

        // Lấy tên danh mục tương ứng với category_id
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

  // Cập nhật giá khi thay đổi kích cỡ
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
            <TextInput placeholder="Search" style={{ flex: 1, height: 40 }} />
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

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontStyle: "italic",
              fontWeight: "900",
              color: "#FFF",
            }}
          >
            {` ${categoryName}`}
          </Text>
        </View>
      </View>

      <TouchableOpacity>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#FFF",
                padding: 20,
                marginVertical: 5,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <Image
                source={{
                  uri: item.image || "http://via.placeholder.com/250x250",
                }}
                style={{
                  width: 250,
                  borderRadius: 10,
                  height: 300,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              />

              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 18, color: "#888", marginVertical: 5 }}>
                {adjustedPrices[item.id]} VND
              </Text>
              <Text style={{ fontSize: 18, color: "#888", marginVertical: 5 }}>
                {item.description}
              </Text>

              <Picker
                selectedValue={selectedSize}
                onValueChange={(itemValue) => setSelectedSize(itemValue)}
              >
                {sizes.map((size) => (
                  <Picker.Item
                    key={size.id}
                    label={size.size}
                    value={size.size}
                  />
                ))}
              </Picker>

              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#230C02",
                    paddingVertical: 12,
                    borderRadius: 15,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontWeight: "bold", fontSize: 16, color: "#FFF" }}
                  >
                    Add to Cart
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
