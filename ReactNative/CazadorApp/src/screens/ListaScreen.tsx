import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { Ionicons } from "@expo/vector-icons";

export default function ListaScreen({ navigation }: any) {
  const db = useSQLiteContext();

  const [registros, setRegistros] = useState<any[]>([]);

  async function cargarRegistros() {
    const resultado = await db.getAllAsync("SELECT * FROM registros");
    setRegistros(resultado);
  }

  useEffect(() => {
    const unsuscribe = navigation.addListener("focus", () => {
      cargarRegistros;
    });

    return unsuscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={registros}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.titulo}</Text>
              <Text>Calificación: {item.calificacion}</Text>
              <Text>{item.comentarios}</Text>
              <Text>{item.fecha}</Text>
            </View>
          )}
        />

        <TouchableOpacity onPress={()=> navigation.navigate('Formulario')} >
          <Ionicons name="add-circle" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },

  text: {
    fontSize: 16,
    marginBottom: 24,
  },

  buttonContainer: {
    marginTop: 10,
  },
});
