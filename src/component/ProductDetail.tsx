import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { DrawerNavigationProp } from "@react-navigation/drawer";

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

interface ProductImage {
  product: { id: number };
  image_url: string;
}

interface Size {
  id: number;
  size: string;
  price_adjustment: number;
}

type RootDrawerParamList = {
  Home: undefined;
  Product: {
    Product: Product[];
  };
  CategoryProducts: { category_id: number; name: string };
  Cart: {
    user_id: number;
    finalPrice?: number;
    size: string;
    adjustment_price_: number;
  };
};

interface ProductDetailProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
  route: any;
}

export default function ProductDetail({
  navigation,
  route,
}: ProductDetailProps) {
  const { id } = route.params; // Nhận productId từ tham số truyền vào
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1); // Thêm state để lưu trữ số lượng sản phẩm

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        // Lấy thông tin sản phẩm từ API
        const productResponse = await axios.get(
          `http://192.168.1.34:3000/products/${id}`
        );

        // Lấy hình ảnh của sản phẩm
        const productImagesResponse = await axios.get(
          "http://192.168.1.34:3000/product_images"
        );
        const productSizeResponse = await axios.get(
          "http://192.168.1.34:3000/product_sizes"
        );

        // Lấy tất cả các kích cỡ
        setSizes(productSizeResponse.data);

        // Tìm hình ảnh tương ứng với sản phẩm
        const productImage = productImagesResponse.data.find(
          (img: ProductImage) => img.product.id === productResponse.data.id
        );

        // Gán hình ảnh cho sản phẩm
        const productWithImage = {
          ...productResponse.data,
          image: productImage ? productImage.image_url : null,
        };

        setProduct(productWithImage);

        // Đặt mặc định size M nếu chưa chọn size
        const defaultSize = productSizeResponse.data.find(
          (size: Size) => size.size === "M"
        );
        setSelectedSize(defaultSize || null);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleSizeChange = (size: Size) => {
    setSelectedSize(size);

    // Cập nhật giá sau khi thay đổi kích cỡ
    setProduct((prevProduct) => {
      if (prevProduct) {
        const updatedPrice = Number(size.price_adjustment) || prevProduct.price;
        return { ...prevProduct, price: updatedPrice };
      }
      return prevProduct;
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleAddToCart = async () => {
    try {
      const fetchCartData = async (userId: number) => {
        if (!product) {
          alert("Product not found");
          return;
        }
        let cartId;
        const cartResponse = await axios.get(
          `http://192.168.1.34:3000/carts?user_id=${userId}`
        );

        if (cartResponse.data.length > 0) {
          cartId = cartResponse.data[0].id;
        } else {
          const newCartResponse = await axios.post(
            "http://192.168.1.34:3000/carts",
            { user_id: userId }
          );
          cartId = newCartResponse.data.id;
        }

        // Thêm sản phẩm vào cart_items
        await axios.post("http://192.168.1.34:3000/cart_items", {
          product_id: product.id,
          quantity: quantity,
          cart_id: cartId,
          size: selectedSize?.size || "M", // Mặc định size là M
          adjusted_price: finalPrice, // Sử dụng finalPrice đã tính toán
        });

        // Chuyển đến màn hình giỏ hàng
        navigation.navigate("Cart", {
          user_id: userId,
          size: selectedSize?.size || "M", // Mặc định size là M
          adjustment_price_: finalPrice || 0, // Đảm bảo finalPrice có giá trị hợp lệ
          finalPrice, // Thêm finalPrice vào tham số
        });
      };

      // Chỉ cần gọi hàm fetchCartData với userId thực tế
      fetchCartData(1); // Ví dụ: userId là 1
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  // Tính toán giá sau khi điều chỉnh dựa trên size đã chọn và số lượng
  const finalPrice = selectedSize
    ? (Number(selectedSize.price_adjustment) || 0) * quantity
    : Number(product.price) * quantity;

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, paddingTop: 20 }}>
      <View style={{ paddingBottom: 10 }}>
        <View
          style={{
            height: 60,
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
        </View>
      </View>

      <View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: product.image || "http://via.placeholder.com/250x250",
            }}
            style={{ width: "70%", height: 300 }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 20,
              marginHorizontal: 20,
            }}
          >
            {product.name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#888",
              marginVertical: 10,
              marginHorizontal: 20,
            }}
            numberOfLines={3}
          >
            {product.description}
          </Text>

          <View style={{ marginTop: 100, marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Size</Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size.id}
                  onPress={() => handleSizeChange(size)}
                  style={{
                    backgroundColor:
                      selectedSize?.id === size.id ? "#EDDCC6" : "#fff",
                    borderWidth: 1,
                    padding: 10,
                    marginHorizontal: 5,
                    borderRadius: 5,
                    borderColor: "#ccc",
                  }}
                >
                  <Text>{`${size.size} (+${Math.floor(
                    size.price_adjustment
                  )} $)`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 60,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                borderTopWidth: 1,
                borderColor: "#ccc",
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {finalPrice} $
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                <TouchableOpacity
                  onPress={handleDecreaseQuantity}
                  style={{
                    backgroundColor: "#230C02",
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 15,
                  }}
                >
                  <Text style={{ fontSize: 24, color: "#fff" }}>-</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {quantity}
                </Text>

                <TouchableOpacity
                  onPress={handleIncreaseQuantity}
                  style={{
                    backgroundColor: "#230C02",
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <Text style={{ fontSize: 24, color: "#fff" }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleAddToCart}
              style={{
                backgroundColor: "#230C02",
                width: "80%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
