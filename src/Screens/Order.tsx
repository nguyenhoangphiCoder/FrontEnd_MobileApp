import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../../ip_API";
import { StackNavigationProp } from "@react-navigation/stack";
import AntDesign from "@expo/vector-icons/AntDesign";
interface CartItem {
  id: number;
  product: {
    id: number;
    image: string;
    name: string;
  };
  size: string;
  quantity: number;
  adjusted_price: string | number;
}

type RootDrawerParamList = {
  Home: undefined;
  Order: {
    cartItems: CartItem[];
    user_id: number;
    totalPrice: number;
    shippingAddress: string;
    cart_id: number;
  };
  Cart: {
    user_id: number;
  };
  OrderHistory: {
    totalPrice: number;
    user_id: number;
    orderId: number;
    product: {
      product_id: number;
      product_name: string;
      product_image: string;
      size: string;
      quantity: number;
      price: number;
    }[];
  };
  VisaQRCode: undefined;
};

interface PaymentMethod {
  payment_method_id: number;
  provider_name: string;
}

type OrderProps = {
  navigation: StackNavigationProp<RootDrawerParamList, "Order">;
  route: RouteProp<RootDrawerParamList, "Order">;
};

export default function Order({ navigation, route }: OrderProps) {
  const { cartItems, user_id, totalPrice, shippingAddress, cart_id } =
    route.params;

  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
    number | null
  >(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${user_id}`);
        setUserName(response.data.name);
        setUserPhone(response.data.phone_number);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Unable to load user data.");
      }
    };

    if (user_id) {
      fetchUserData();
    }
  }, [user_id]);

  // Fetch user address
  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/addresses?user_id=${user_id}`
        );
        const address = response.data[0]; // Assuming the address array is returned
        if (address) {
          setUserAddress(
            `${address.address_line}, ${address.city}, ${address.state}, ${address.country}`
          );
        } else {
          setUserAddress("No address available");
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
        Alert.alert("Error", "Unable to load address.");
      }
    };

    if (user_id) {
      fetchUserAddress();
    }
  }, [user_id]);

  // Update cart items prices if they are in string format
  const updatedCartItems = cartItems.map((item) => ({
    ...item,
    adjusted_price:
      typeof item.adjusted_price === "string"
        ? parseFloat(item.adjusted_price)
        : item.adjusted_price,
  }));

  // Fetch payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/payment_methods`);
        setPaymentMethods(response.data); // Assuming API returns the list of payment methods
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentMethods();
  }, []);

  // Handle selection of payment method
  const handleSelectPaymentMethod = (paymentMethodId: number) => {
    setSelectedPaymentMethodId(paymentMethodId);
    // Kiểm tra nếu là Visa
    const selectedMethod = paymentMethods.find(
      (method) => method.payment_method_id === paymentMethodId
    );

    if (selectedMethod?.provider_name.toLowerCase() === "visa") {
      navigation.navigate("VisaQRCode");
    }
  };

  // Confirm order and create order items
  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      // Ensure a payment method is selected
      if (!selectedPaymentMethodId) {
        Alert.alert("Error", "Please select a payment method.");
        return;
      }

      // Create an order
      const orderResponse = await axios.post(`${API_BASE_URL}/orders`, {
        user_id,
        cart_id,
        payment_method_id: selectedPaymentMethodId, // Use the ID instead of provider name
      });
      const orderId = orderResponse.data.id;

      // Add order items
      for (const item of updatedCartItems) {
        const { product, quantity, size, adjusted_price } = item;
        await axios.post(`${API_BASE_URL}/order_items`, {
          order_id: orderId,
          product_id: product.id,
          size: size,
          quantity: quantity,
          price: adjusted_price,
        });
      }
      // Gửi email hóa đơn
      await axios.post(`${API_BASE_URL}/orders/send-invoice`, {
        email: userEmail, // Email người dùng
      });
      navigation.navigate("Home");
      navigation.navigate("OrderHistory", {
        totalPrice,
        user_id,
        orderId,
        product: updatedCartItems.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          product_image: item.product.image,
          size: item.size,
          quantity: item.quantity,
          price: item.adjusted_price,
        })),
      });
      Alert.alert("Success", "You have success confirm ");
    } catch (error) {
      console.error("Error confirming order:", error);
      Alert.alert("Error", "Failed to place the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", marginTop: 35 }}>
      {/* Header */}
      <View
        style={{
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          backgroundColor: "#F8F8F8",
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ padding: 5 }}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
          }}
        >
          Order
        </Text>
      </View>

      {/* Cart Items */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {cartItems.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              backgroundColor: "#f9f9f9",
              borderRadius: 15,
              width: "100%",
              padding: 15,
              marginVertical: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Image
              source={{
                uri: item.product.image || "http://via.placeholder.com/100x100",
              }}
              style={{
                height: 80,
                width: 80,
                marginRight: 15,
                borderRadius: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
                {item.product.name}
              </Text>
              <Text style={{ color: "#777" }}>Size: {item.size}</Text>
              <Text style={{ color: "#777" }}>Quantity: x{item.quantity}</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
              {`${Math.floor(+item.adjusted_price)} $`}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Payment Method */}
      <View style={{ padding: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Payment Method:
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#230C02" />
        ) : (
          <FlatList
            data={paymentMethods}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 12,
                  backgroundColor:
                    selectedPaymentMethodId === item.payment_method_id
                      ? "#E8E8E8"
                      : "#fff",
                  borderRadius: 10,
                  marginVertical: 5,
                  borderWidth:
                    selectedPaymentMethodId === item.payment_method_id ? 1 : 3,
                  borderColor: "#ddd",
                  alignItems: "center",
                }}
                onPress={() =>
                  handleSelectPaymentMethod(item.payment_method_id)
                }
              >
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      selectedPaymentMethodId === item.payment_method_id
                        ? "#230C02"
                        : "black",
                  }}
                >
                  {item.provider_name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.payment_method_id.toString()}
          />
        )}
      </View>

      {/* Shipping Address */}
      <View style={{ padding: 20, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Name : {userName || "Loading address..."}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Phone_number : {userPhone || "Loading address..."}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Email : {userEmail || "Loading address..."}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Address : {userAddress || "Loading address..."}
        </Text>
      </View>

      {/* Total Price */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Total: {totalPrice} $
        </Text>

        <TouchableOpacity
          onPress={handleConfirmOrder}
          style={{
            backgroundColor: "#230C02",
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
