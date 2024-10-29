import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// Định nghĩa kiểu cho sản phẩm
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  size: string;
  note: string;
  price: number;
  image: any;
}

type RootDrawerParamList = {
  Home: undefined;
  Cart: {
    cartItems: CartItem[]; // Sử dụng kiểu đã định nghĩa
  };
};

interface CoffeeCategoriesProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
}

export default function CoffeeCategories({
  navigation,
}: CoffeeCategoriesProps) {
  const [quantity, setQuantity] = useState(1);
  // Chỉ định kiểu cho cartItems
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [size, setSize] = useState("M"); // State cho kích thước
  const [note, setNote] = useState(""); // State cho ghi chú
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = () => {
    const newItem: CartItem = {
      id: Date.now(), // ID duy nhất
      name: "Espresso",
      quantity: quantity,
      size: size,
      note: note,
      price: 50000,
      image: require("../images/ProductImage/Coffee/iconcoffeecategories.jpg"),
    };

    const updatedCartItems = [...cartItems, newItem]; // Cập nhật giỏ hàng
    setCartItems(updatedCartItems); // Cập nhật state

    // Điều hướng với đúng kiểu
    navigation.navigate("Cart", { cartItems: updatedCartItems });
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#EDDCC6", flex: 1, paddingTop: 20 }}
    >
      {/* Header */}
      <View style={{ backgroundColor: "#230C02", paddingBottom: 10 }}>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 5,
                marginRight: 10,
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
            onPress={() => navigation.navigate("Cart", { cartItems })}
          >
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: "#f9f9fc",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Image
                source={require("../images/cart2.jpg")}
                style={{ height: 28, width: 28 }}
              />
            </View>
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
            COFFEE
          </Text>
        </View>
      </View>

      {/* Product Details */}
      <ScrollView>
        <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
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
            <View
              style={{
                height: 300,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Image
                source={require("../images/ProductImage/Coffee/iconcoffeecategories.jpg")}
                style={{ width: 250, height: 250, borderRadius: 10 }}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: 5,
                }}
              >
                Espresso
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#888",
                  marginBottom: 10,
                }}
              >
                50.000 VND
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#777",
                  lineHeight: 20,
                  marginBottom: 15,
                }}
                numberOfLines={3}
              >
                Description: Hot milk coffee with a rich and intense flavor.
              </Text>
            </View>

            {/* Quantity Selector */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                Quantity:{" "}
              </Text>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor: "#230C02",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16 }}>{quantity}</Text>
              <TouchableOpacity
                onPress={increaseQuantity}
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor: "#230C02",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Size Selector */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>Size: </Text>
              {["S", "M", "L"].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setSize(s)}
                  style={{
                    height: 25,
                    width: 25,
                    backgroundColor: size === s ? "#230C02" : "#CCC",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 5,
                  }}
                >
                  <Text style={{ color: "#fff" }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 5 }}>
              Note:
            </Text>
            <TextInput
              placeholder="Your note"
              style={{
                height: 45,
                borderRadius: 10,
                borderColor: "#230C02",
                borderWidth: 1,
                paddingHorizontal: 10,
                marginBottom: 15,
              }}
            />
            <TouchableOpacity onPress={addToCart}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
