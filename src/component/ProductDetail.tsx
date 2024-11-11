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
          `http://192.168.1.3:3000/products/${id}`
        );

        // Lấy hình ảnh của sản phẩm
        const productImagesResponse = await axios.get(
          "http://192.168.1.3:3000/product_images"
        );
        const productSizeResponse = await axios.get(
          "http://192.168.1.3:3000/product_sizes"
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
        const updatedPrice = Number(size.price_adjustment) || 0;
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
                  <Text>{`${size.size} (+${size.price_adjustment} $)`}</Text>
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
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderTopColor: "#ccc",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                <TouchableOpacity
                  onPress={handleDecreaseQuantity}
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                >
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>-</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginHorizontal: 15,
                    marginVertical: 5,
                  }}
                >
                  {quantity}
                </Text>
                <TouchableOpacity
                  onPress={handleIncreaseQuantity}
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#EDDCC6",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  width: 200,
                  marginTop: 30,
                  borderRadius: 20,
                  borderColor: "black",
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Total: {finalPrice} $
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
