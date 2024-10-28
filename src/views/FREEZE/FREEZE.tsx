import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
type RootDrawerParamList = {
  Home: undefined;
  Order: undefined;
  Coffee: undefined;
  Cart: undefined;
};
interface CoffeeCategoriesProps {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
}
export default function Freeze({ navigation }: CoffeeCategoriesProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={styles.menuButton}>
              <Image
                source={require("../../images/mobile.png")}
                style={styles.menuIcon}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <TextInput placeholder="Search" style={styles.searchInput} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <View style={styles.cartButton}>
              <Image
                source={require("../../images/cart2.jpg")}
                style={styles.cartIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>PHINDI</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.productList}>
          <View style={styles.productItem}>
            <Image
              source={require("../../images/ProductImage/Freeze/FREEZE.png")}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                Espresso
              </Text>
              <Text style={styles.productPrice} numberOfLines={2}>
                50.000vnd
              </Text>
              <Text style={styles.productDescription} numberOfLines={3}>
                description hot milk coffee
              </Text>
              <TouchableOpacity>
                <View style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Add to cart</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.productItem}>
            <Image
              source={require("../../images/ProductImage/Freeze/FREEZE.png")}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                Espresso
              </Text>
              <Text style={styles.productPrice} numberOfLines={2}>
                50.000vnd
              </Text>
              <Text style={styles.productDescription} numberOfLines={3}>
                description hot milk coffee
              </Text>
              <TouchableOpacity>
                <View style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Add to cart</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#EDDCC6",
    flex: 1,
    marginTop: 30,
  },
  headerContainer: {
    backgroundColor: "#230C02",
  },
  header: {
    height: 60,
    flexDirection: "row",
  },
  menuButton: {
    backgroundColor: "#fff",
    marginTop: 17,
    borderRadius: 5,
    marginLeft: 10,
  },
  menuIcon: {
    height: 30,
    width: 30,
  },
  searchBox: {
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    width: 290,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 30,
    paddingHorizontal: 15,
    width: 290,
  },
  cartButton: {
    height: 35,
    width: 35,
    backgroundColor: "#f9f9fc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    marginHorizontal: 10,
  },
  cartIcon: {
    height: 28,
    width: 28,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#230C02",
  },
  title: {
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "900",
    color: "#FFF",
  },
  productList: {
    flexDirection: "column",
  },
  productItem: {
    backgroundColor: "#FFF",
    height: 130,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    margin: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  productInfo: {
    flexDirection: "column",
    marginLeft: 20,
    padding: 10,
    backgroundColor: "#FFF",
    width: 300,
    justifyContent: "center",
  },
  productName: {
    flexWrap: "wrap",
    fontSize: 15,
    fontWeight: "bold",
  },
  productPrice: {
    flexWrap: "wrap",
    fontSize: 15,
    fontWeight: "bold",
  },
  productDescription: {
    flexWrap: "wrap",
    fontSize: 15,
  },
  addToCartButton: {
    backgroundColor: "#230C02",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 15,
  },
  addToCartText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#FFF",
  },
});
