import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProducts } from "../context/ProductContext";
import React from "react";

export default function HomeScreen({ navigation }: any) {
  const { products, deleteProduct } = useProducts();

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("AddProduct")}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View>
              <View>
                <Text>{item.name}</Text>
                <Text>${item.price.toFixed(2)}</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AddProduct", { id: item.id })
                  }
                >
                  <Ionicons name="pencil" size={24} color="#FF9800" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Detail", { id: item.id })
                  }
                >
                  <Ionicons name="eye" size={24} color="#00a2ff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteProduct(item.id)}
                >
                  <Ionicons name="trash" size={24} color="#00a2ff" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
