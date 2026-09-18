import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductContext } from "../context/ProductoContext";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
  const { products, deleteProduct } = useProductContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>INVENTARIO PRO</Text>
        <Text style={styles.title}>Tus productos</Text>
        <Text style={styles.text}>{products.length} productos en tu inventario</Text>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.65} onPress={() => navigation.navigate('Agregar')}>
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.addText}>Agregar producto</Text>
        </TouchableOpacity>

        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={<View style={styles.empty}><Ionicons name="cube-outline" size={44} color="#23785e" /><Text style={styles.text}>Agrega tu primer producto para comenzar.</Text></View>}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              
                {item.fotoBase64 ? (
                    <Image
                        source = {{uri: item.fotoBase64}}
                        style = {{width: '100%', height: 160, borderRadius: 14, marginBottom: 14}}
                    
                    />
                ):(
                    <View style={styles.placeholder}>
                        <Ionicons name="cube-outline" size={32} color="#23785e" />
                    </View>


                )} 



              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.price}>${item.precio.toFixed(2)}</Text>
              <Text style={styles.category}>{item.categoria}</Text>

              <TouchableOpacity style={styles.deleteButton} accessibilityLabel={`Eliminar ${item.nombre}`} activeOpacity={0.65} onPress={() => deleteProduct(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#b54a4a" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7f6",
  },

  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    color: '#18342b',
  },

  text: {
    fontSize: 14,
    color: '#697d74',
    marginBottom: 24,
  },

  buttonContainer: {
    marginTop: 10,
  },
  eyebrow: { color: '#23785e', fontWeight: '700', fontSize: 11, letterSpacing: 2, marginBottom: 10 },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#23785e', padding: 15, borderRadius: 16, marginBottom: 24 },
  addText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  card: { backgroundColor: '#fff', padding: 18, borderRadius: 20, marginBottom: 14, borderWidth: 1, borderColor: '#e5ece8' },
  placeholder: { backgroundColor: '#edf5f0', height: 100, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  name: { fontSize: 18, fontWeight: '600', color: '#18342b', marginBottom: 6 },
  price: { fontSize: 20, fontWeight: '700', color: '#23785e', marginBottom: 6 },
  category: { fontSize: 13, color: '#697d74' },
  deleteButton: { alignSelf: 'flex-end', padding: 12, backgroundColor: '#fff4f2', borderRadius: 12 },
  empty: { alignItems: 'center', gap: 16, paddingVertical: 60 },
});
