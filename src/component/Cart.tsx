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
        // Lấy thông tin giỏ hàng của người dùng
        const cartResponse = await axios.get(
          `http://192.168.1.34:3000/carts?user_id=${user_id}`
        );
        const cartId = cartResponse.data[0]?.id;
        if (cartId) {
          // Lấy các cart items của giỏ hàng
          const cartItemsResponse = await axios.get(
            `http://192.168.1.34:3000/cart_items?cart_id=${cartId}`
          );
          const items = cartItemsResponse.data;

          // Lấy thông tin sản phẩm và hình ảnh cho từng item
          const cartItemsWithProducts = await Promise.all(
            items.map(async (item: any) => {
              const productResponse = await axios.get(
                `http://192.168.1.34:3000/products/${item.product_id}`
              );

              // Lấy thông tin hình ảnh cho sản phẩm
              const productImagesResponse = await axios.get(
                `http://192.168.1.34:3000/product_images?product_id=${item.product_id}`
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

          // Tính tổng giá trị giỏ hàng
          const total = cartItemsWithProducts.reduce(
            (acc: number, item: any) => {
              // Kiểm tra nếu giá và số lượng hợp lệ trước khi tính toán
              if (item.adjusted_price && item.quantity) {
                return acc + Number(item.adjusted_price);
              }
              return acc; // Nếu không hợp lệ, không tính vào tổng
            },
            0
          );

          // Cập nhật giá trị tổng cho state
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
      await axios.delete(`http://192.168.1.34:3000/cart_items/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );

      // Cập nhật tổng giá trị sau khi xóa sản phẩm
      setTotalPrice((prevTotal) => prevTotal - (price || 0));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20 }}>
      <View
        style={{
          height: 50,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 5, marginRight: 10 }}
        >
          <Image
            source={require("../images/vector-back-icon.jpg")}
            style={{ height: 37, width: 37, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 80 }}>
          My Cart
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {cartItems.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#fff" }}>
            Your cart is empty.
          </Text>
        ) : (
          cartItems.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                backgroundColor: "#EDDCC6",
                borderRadius: 25,
                width: "90%",
                padding: 20,
                marginVertical: 15,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Image
                source={{
                  uri:
                    item.product.image || "http://via.placeholder.com/100x100",
                }}
                style={{ height: 100, width: 100, marginRight: 20 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.product.name}
                </Text>
                <Text style={{ fontSize: 15 }}>size: {item.size}</Text>
                <Text style={{ fontSize: 16 }}>Quantity: x{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveItem(item.id, item.adjusted_price)}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#230C02",
                    paddingVertical: 5,
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
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
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
          backgroundColor: "#EDDCC6",
          paddingVertical: 15,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 10,
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
            height: 55,
            width: 160,
            backgroundColor: "#230C02",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 90,
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
