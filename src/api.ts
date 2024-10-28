// src/api.ts
import axios from "axios";

const API_URL = "http://192.168.1.221:3000"; // Thay URL này nếu cần

export const createOrder = async (data: {
  user_id: number;
  payment_method_id: number;
  franchise_id: number;
}) => {
  try {
    const response = await axios.post(`${API_URL}/orders/cart`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
