import React, { useCallback, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

interface Order {
  id: number;
  created_at: string;
  price: number;
  payment_method: PaymentMethod | null;
  user: User;
  franchise: Franchise | null;
  order_items: OrderItem[];
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
  OrderHistory: {
    totalPrice: number;
    user_id: number;
    orderId: number;
    products: {
      product_id: number;
      product_name: string;
      product_image: string;
      size: string;
      quantity: number;
      price: number;
    }[];
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
  const { user_id, orderId, products, totalPrice } = route.params;

  const fetchOrderHistory = async () => {
    try {
      if (!user_id) {
        setError("Không có user_id.");
        setLoading(false);
        return;
      }

      setLoading(true);
      console.log("Fetching orders for user_id:", user_id);

      // Gọi API với user_id và API path mới
      const response = await axios.get(
        `${API_BASE_URL}/orders/user/${user_id}/orders`
      );
      const ordersData: Order[] = response.data;
      console.log("Orders data received:", ordersData);

      if (!ordersData || ordersData.length === 0) {
        setError("Không có đơn hàng nào.");
        setLoading(false);
        return;
      }

      // Lấy chi tiết các sản phẩm cho mỗi đơn hàng
      const enrichedOrders = await Promise.all(
        ordersData.map(async (order) => {
          const orderItemsResponse = await axios.get(
            `${API_BASE_URL}/order_items/order/${order.id}`
          );
          const orderItems = orderItemsResponse.data;

          // Lấy tên sản phẩm cho từng đơn hàng
          const enrichedItems = await Promise.all(
            orderItems.map(async (item) => {
              // Kiểm tra xem product_id có hợp lệ không trước khi gọi API
              if (!item.product_id) {
                console.error("Không tìm thấy product_id cho item:", item);
                return { ...item, name: "Không có tên sản phẩm" }; // Trả về tên mặc định nếu không có product_id
              }

              try {
                const productResponse = await axios.get(
                  `${API_BASE_URL}/products/${item.product_id}`
                );
                const product = productResponse.data;

                // Kiểm tra nếu sản phẩm không có tên hoặc không tồn tại
                if (!product || !product.name) {
                  console.error(
                    "Không tìm thấy sản phẩm với product_id:",
                    item.product_id
                  );
                  return { ...item, name: "Không có tên sản phẩm" };
                }

                return { ...item, name: product.name };
              } catch (error) {
                console.error("Error fetching product:", error);
                return { ...item, name: "Lỗi khi tải sản phẩm" };
              }
            })
          );

          return { ...order, order_items: enrichedItems };
        })
      );

      setOrders(enrichedOrders);
    } catch (error) {
      console.error("Error fetching order history:", error);
      setError("Không thể tải lịch sử đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      fetchOrderHistory();
    }, [user_id])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#230C02" />
      </View>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7", padding: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
        Lịch sử đơn hàng
      </Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Order }) => (
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
                Mã đơn hàng: {item.id}
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
              Tổng tiền: {totalPrice} $
            </Text>

            {item.franchise && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Chi nhánh:</Text>
                <Text>Tên: {item.franchise.name}</Text>
                <Text>Địa chỉ: {item.franchise.address}</Text>
              </View>
            )}

            {item.payment_method && (
              <View
                style={{
                  marginTop: 15,
                  backgroundColor: "#f1f1f1",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  Phương thức thanh toán
                </Text>

                <Text>Payment Method: {item.payment_method.provider_name}</Text>
                <Text>TK: {item.payment_method.account_number}</Text>
                <Text>Hạn sử dụng: {item.payment_method.expiry_date}</Text>
              </View>
            )}

            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Các sản phẩm
            </Text>
            <FlatList
              data={item.order_items}
              keyExtractor={(orderItem, index) => index.toString()}
              horizontal={true}
              renderItem={({ item }: { item: OrderItem }) => (
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
                    {item.name || "Không có tên sản phẩm"}
                  </Text>
                  <Text>Số lượng: {item.quantity}</Text>
                  <Text>Giá: {item.price} $</Text>
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
