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
import React, { useEffect, useState } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import axios from "axios";

type RootDrawerParamList = {
  Home: undefined;
  Order: undefined;
  CategoriesDetail: { category_id: number };
  Cart: undefined;
  TeaCategories: undefined;
  PhindiCategories: undefined;
  MilkTeaCategories: undefined;
  FreezeCategories: undefined;
  ProductDetail: { id: number };
};

interface HomeProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
}

interface Product {
  id: number;
  name: string;
  price: string;
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

export default function Home({ navigation }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Animated values
  const scrollX = new Animated.Value(0);

  const { width } = Dimensions.get("window");
  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await axios.get(
          "http://192.168.1.3:3000/products"
        );
        const productImagesResponse = await axios.get(
          "http://192.168.1.3:3000/product_images"
        );
        console.log(productImagesResponse);
        const categoriesResponse = await axios.get(
          "http://192.168.1.3:3000/categories"
        );
        console.log(`id danh muc : ${categoriesResponse}`);
        const productsWithImages = productsResponse.data.map(
          (product: Product) => {
            const image = productImagesResponse.data.find(
              (img: ProductImage) => img.product.id === product.id
            );
            return { ...product, image: image ? image.image_url : null };
          }
        );

        // Cập nhật danh sách danh mục với thuộc tính route
        const loadedCategories = categoriesResponse.data.map(
          (category: Category) => ({
            ...category,
            route: `${category.name
              .charAt(0)
              .toUpperCase()}${category.name.slice(1)}Categories`, // Tạo route dựa trên name
          })
        );

        setCategories(loadedCategories);
        console.log("Loaded categories:", loadedCategories);

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
  const promotionImages = [
    require("../images/Promotion1.jpg"),
    require("../images/Promotion2.jpg"),
    require("../images/Promotion4.jpg"),
  ];
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

        <View
          style={{
            height: 100,
            backgroundColor: "#230C02",
            paddingVertical: 10,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => {
                    console.log(
                      `Navigating to category with id: ${category.id}`
                    );
                    // Chuyển hướng và truyền category_id
                    navigation.navigate("CategoriesDetail", {
                      category_id: category.id,
                    });
                  }}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 75,
                    width: 80,
                    backgroundColor: "#EDDCC6",
                    borderRadius: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#230C02",
                      textAlign: "center",
                      fontSize: 15,
                    }}
                  >
                    {category.name} {/* Hiển thị tên danh mục từ dữ liệu */}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Promotion */}
        <View style={{ backgroundColor: "gray", height: 200 }}>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
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
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={image}
                  style={{ width: width - 30, height: 170, borderRadius: 10 }}
                />
              </View>
            ))}
          </Animated.ScrollView>
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
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  width: "90%",
                  height: 100,
                  margin: 10,
                  padding: 10,
                  flexDirection: "row",
                  borderWidth: 1,
                }}
                onPress={() => {
                  navigation.navigate("ProductDetail", {
                    id: product.id, // Truyền ID danh mục vào màn hình chi tiết sản phẩm
                  });
                }}
              >
                <Image
                  source={
                    product.image
                      ? { uri: product.image }
                      : require("../images/ProductImage/Coffee/iconcoffeecategories.jpg")
                  }
                  style={{ width: 80, height: 80, borderRadius: 10 }}
                />
                <View style={{ marginHorizontal: 20 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 150 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          marginTop: 5,
                        }}
                      >
                        {product.name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: 20,
                        marginTop: 5,
                        fontWeight: "bold",
                      }}
                    >
                      {product.price}$
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      marginTop: 5,
                    }}
                  >
                    {product.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
