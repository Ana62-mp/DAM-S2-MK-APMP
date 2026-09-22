import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Suspense } from "react";

import { SQLiteProvider } from "expo-sqlite";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initDatabase } from "./src/database/db";

import ListaScreen from "./src/screens/ListaScreen";
import FormularioScreen from "./src/screens/FormularioScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Suspense
      fallback={
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#7c3aed"
          />

          <Text style={styles.loadingText}>
            Preparando tu aplicación...
          </Text>
        </View>
      }
    >
      <SQLiteProvider
        databaseName="cazador.db"
        onInit={initDatabase}
        useSuspense={true}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#7c3aed",
              },

              headerTintColor: "#ffffff",

              headerTitleStyle: {
                fontWeight: "700",
                fontSize: 20,
              },

              headerShadowVisible: false,

              contentStyle: {
                backgroundColor: "#f7f5fb",
              },
            }}
          >
            <Stack.Screen
              name="Lista"
              component={ListaScreen}
              options={{
                title: "Mis registros",
              }}
            />

            <Stack.Screen
              name="Formulario"
              component={FormularioScreen}
              options={({ route }: any) => ({
                title: route.params?.id
                  ? "Editar registro"
                  : "Nuevo registro",
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f5fb",
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#5b5267",
    fontWeight: "500",
  },
});