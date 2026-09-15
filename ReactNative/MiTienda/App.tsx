import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./src/screens/DetailScreen";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import DrawerNavigator from "./src/navigators/DrawerNavigator";
import { ProductProvider } from "./src/context/ProductContext";
import AddProductScreen from "./src/screens/AddProductScreen";

export type RootStackParamList = {
  MainDrawer: undefined;
  Detail: undefined;
  AddProduct: { id?: string | undefined };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainDrawer">
          <Stack.Screen
            name="MainDrawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ title: "Detalles" }}
          />

          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={({ route }) => ({
              title: route.params?.id ? "Editar Produucto" : "Nuevo Producto",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
