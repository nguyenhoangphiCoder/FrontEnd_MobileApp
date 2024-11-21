import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../ip_API";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";

interface Order {
  id: number;
  created_at: string;
  price: number;
  payment_method: PaymentMethod | null;
  user: User;
  franchise: Franchise | null;
  order_items: OrderItem[];
  totalPrice?: number;
}

interface PaymentMethod {
  method_type: string;
  provider_name: string;
  account_number: string;
  expiry_date: string;
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
}

interface Franchise {
  name: string;
  address: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size: string;
  product_id: number;
}

type RootDrawerParamList = {
  Home: undefined;
  OrderHistory: undefined;
};

type OrderHistoryProps = {
  navigation: StackNavigationProp<RootDrawerParamList, "OrderHistory">;
};

export default function OrderHistory({ navigation }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = await AsyncStorage.getItem("user_id");
      if (!userId) {
        setError("Không tìm thấy thông tin người dùng.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/orders/user/${userId}/orders`
      );
      const ordersData: Order[] = response.data;

      if (!ordersData || ordersData.length === 0) {
        setError("Không có đơn hàng nào.");
        setLoading(false);
        return;
      }

      const enrichedOrders = await Promise.all(
        ordersData.map(async (order) => {
          const orderItemsResponse = await axios.get(
            `${API_BASE_URL}/order_items/order/${order.id}`
          );
          const orderItems = orderItemsResponse.data;

          const enrichedItems = await Promise.all(
            orderItems.map(async (item: any) => {
              try {
                const productResponse = await axios.get(
                  `${API_BASE_URL}/products/${item.product_id}`
                );
                const product = productResponse.data;

                return {
                  ...item,
                  name: product.name || "Không có tên sản phẩm",
                  price: item.price,
                };
              } catch (error) {
                return {
                  ...item,
                  name: "Lỗi khi tải sản phẩm",
                  price: item.price,
                };
              }
            })
          );

          const totalPrice = enrichedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return { ...order, order_items: enrichedItems, totalPrice };
        })
      );

      setOrders(enrichedOrders);
    } catch (error) {
      setError("Order History is empty");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrderHistory();
    }, [])
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#230C02" />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#EEE",
        marginTop: 35,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 20,
          backgroundColor: "#230C02",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#fff",
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../images/vector-back-icon.jpg")}
            style={{ height: 37, width: 37, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#fff",
            flex: 1,
            textAlign: "center",
          }}
        >
          Order History
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Order }) => (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Order Code: {item.id}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#777",
                }}
              >
                {item.created_at}
              </Text>
            </View>
            <View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",

                    marginVertical: 10,
                  }}
                >
                  Total: {item.totalPrice} $
                </Text>

                {item.payment_method && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      Payment Method
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#555",
                      }}
                    >
                      Method : {item.payment_method.provider_name}
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <Text></Text>
              </View>
            </View>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              Products
            </Text>
            <FlatList
              data={item.order_items}
              keyExtractor={(orderItem, index) => index.toString()}
              horizontal
              renderItem={({ item }: { item: OrderItem }) => (
                <View
                  style={{
                    marginRight: 10,
                    backgroundColor: "#eee",
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#555",
                    }}
                  >
                    Quantity: {item.quantity}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#555",
                    }}
                  >
                    {`Price: ${Math.floor(item.price)} $`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#555",
                    }}
                  >
                    Size: {item.size}
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
