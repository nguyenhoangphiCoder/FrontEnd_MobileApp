import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { API_BASE_URL } from "../../ip_API";

interface CartItem {
  id: number;
  quantity: number;
  adjusted_price: number;
  size: string;
  product: {
    name: string;
    image: string | null;
    id: number;
  };
}

type RootDrawerParamList = {
  Home: undefined;
  CategoryProducts: { category_id: number; name: string };
  Cart: {
    user_id: number;
    finalPrice?: number;
    size: string;
    price_adjustment: number;
  };
};

interface CartProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
  route: any;
}

export default function Cart({ navigation, route }: CartProps) {
  const { user_id } = route.params;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartResponse = await axios.get(
          `${API_BASE_URL}/carts?user_id=${user_id}`
        );
        const cartId = cartResponse.data[0]?.id;
        if (cartId) {
          const cartItemsResponse = await axios.get(
            `${API_BASE_URL}/cart_items?cart_id=${cartId}`
          );
          const items = cartItemsResponse.data;

          const cartItemsWithProducts = await Promise.all(
            items.map(async (item: any) => {
              const productResponse = await axios.get(
                `${API_BASE_URL}/products/${item.product_id}`
              );
              const productImagesResponse = await axios.get(
                `${API_BASE_URL}/product_images?product_id=${item.product_id}`
              );

              const imageUrl = productImagesResponse.data[0]?.image_url || null;

              return {
                ...item,
                product: {
                  ...productResponse.data,
                  image: imageUrl,
                },
              };
            })
          );

          setCartItems(cartItemsWithProducts);

          const total = cartItemsWithProducts.reduce(
            (acc: number, item: any) => {
              if (item.adjusted_price && item.quantity) {
                return acc + Number(item.adjusted_price);
              }
              return acc;
            },
            0
          );

          setTotalPrice(total);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user_id]);

  const handleRemoveItem = async (itemId: number, price: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart_items/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );

      setTotalPrice((prevTotal) => prevTotal - (price || 0));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20 }}>
      <View
        style={{
          height: 60,
          backgroundColor: "#230C02",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 10 }}
        >
          <Image
            source={require("../images/vector-back-icon.jpg")}
            style={{ height: 30, width: 30, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
          My Cart
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
      >
        {cartItems.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#230C02", fontSize: 18 }}>
            Your cart is empty.
          </Text>
        ) : (
          cartItems.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                backgroundColor: "#F4F1E1",
                borderRadius: 15,
                width: "90%",
                padding: 15,
                marginVertical: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 3,
              }}
            >
              <Image
                source={{
                  uri:
                    item.product.image || "http://via.placeholder.com/100x100",
                }}
                style={{
                  height: 80,
                  width: 80,
                  marginRight: 15,
                  borderRadius: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.product.name}
                </Text>
                <Text style={{ fontSize: 14 }}>Size: {item.size}</Text>
                <Text style={{ fontSize: 14 }}>Quantity: x{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveItem(item.id, item.adjusted_price)}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#230C02",
                    paddingVertical: 8,
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 14 }}>Remove</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{ justifyContent: "center", alignItems: "flex-end" }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#230C02" }}
                >
                  {`${Math.floor(+item.adjusted_price)} $`}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F4F1E1",
          paddingVertical: 15,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "bold", marginHorizontal: 10 }}
        >
          Total:
        </Text>
        <Text
          style={{ fontSize: 18, fontWeight: "bold", marginHorizontal: 10 }}
        >
          {totalPrice} $
        </Text>
        <TouchableOpacity
          style={{
            height: 50,
            width: 160,
            backgroundColor: "#230C02",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 50,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
            Check Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
