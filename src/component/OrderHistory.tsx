import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

interface Order {
  id: number;
  created_at: string;
  total_price: number;
  payment_method: PaymentMethod;
  order_items: OrderItem[];
}

interface PaymentMethod {
  method_type: string;
  provider_name: string;
  account_number: string;
  expiry_date: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size: string;
}

type RootDrawerParamList = {
  OrderHistory: {
    user_id: number;
    orderId: number;
  };
};

type OrderHistoryProps = {
  navigation: StackNavigationProp<RootDrawerParamList, "OrderHistory">;
  route: RouteProp<RootDrawerParamList, "OrderHistory">;
};

export default function OrderHistory({ route }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user_id } = route.params;

  // Hàm gọi API để lấy danh sách đơn hàng
  const fetchOrderHistory = async () => {
    try {
      const orderResponse = await axios.get(`${API_BASE_URL}/orders`, {
        params: { user_id }, // Giả sử bạn có thể lọc theo user_id
      });
      const orders = orderResponse.data;

      // Gọi API order_items để lấy thông tin chi tiết cho từng đơn hàng
      const ordersWithItems = await Promise.all(
        orders.map(async (order: Order) => {
          const orderItemsResponse = await axios.get(
            `${API_BASE_URL}/order_items?order_id=${order.id}`
          );
          return { ...order, order_items: orderItemsResponse.data };
        })
      );

      setOrders(ordersWithItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order history:", error);
      setError("Không thể tải lịch sử đơn hàng. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [user_id]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#230C02"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f7f7f7",
        paddingHorizontal: 15,
        marginTop: 30,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 15,
              marginBottom: 15,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
                Order ID: {item.id}
              </Text>
              <Text style={{ color: "#777", fontSize: 14 }}>
                {item.created_at}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#230C02",
                marginVertical: 10,
              }}
            >
              Total: {item.total_price} $
            </Text>

            <View
              style={{
                marginTop: 15,
                backgroundColor: "#f1f1f1",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Payment Method
              </Text>
              <Text>Type: {item.payment_method.method_type}</Text>
              <Text>Provider: {item.payment_method.provider_name}</Text>
              <Text>Account: {item.payment_method.account_number}</Text>
              <Text>Expiry: {item.payment_method.expiry_date}</Text>
            </View>

            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Order Items
            </Text>
            <FlatList
              data={item.order_items}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginRight: 15,
                    paddingLeft: 10,
                    borderLeftWidth: 4,
                    borderLeftColor: "#230C02",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Price: {item.price} $</Text>
                  <Text>Size: {item.size}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
