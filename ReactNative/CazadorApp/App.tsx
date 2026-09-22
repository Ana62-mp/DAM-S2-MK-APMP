import { useEffect, useState } from "react";
import { ActivityIndicator, View , Text} from "react-native";
import { SQLiteProvider } from "expo-sqlite";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initDatabase } from "./src/database/db";
import ListaScreen from "./src/screens/ListaScreen";
import FormularioScreen from "./src/screens/FormularioScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function iniciar() {
      await initDatabase();
      setCargando(false);
    }

    iniciar();
  }, []);

  if (cargando) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Cargando base de datos...</Text>
      </View>
    );
  }

  return (
    <SQLiteProvider databaseName="cazador.db">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Lista"
            component={ListaScreen}
          />

          <Stack.Screen
            name="Formulario"
            component={FormularioScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}