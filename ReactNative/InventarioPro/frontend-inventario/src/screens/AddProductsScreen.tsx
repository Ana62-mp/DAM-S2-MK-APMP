import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductContext } from "../context/ProductoContext";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function AddProductsScreen() {
  const { addProduct } = useProductContext();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fotoBase64, setFotoBase64] = useState<string | undefined>();

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();

    if (!permiso.granted) {
      alert("Se necesita permiso para usar la cámara");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!resultado.canceled && resultado.assets[0].base64) {
      setFotoBase64(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
    }

  };

  const guardarProducto = async () => {
      const guardado = await addProduct({
        nombre: nombre,
        precio: Number(precio),
        categoria: categoria,
        fotoBase64: fotoBase64,
      });

      if (!guardado) return;
      setNombre("");
      setPrecio("");
      setCategoria("");
      setFotoBase64(undefined);
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>CREA TU INVENTARIO</Text>
        <Text style={styles.title}>Nuevo Producto</Text>
        <Text style={styles.text}>Los detalles que necesitas, en un solo lugar.</Text>
        <Text style={styles.label}>Nombre</Text>

        <TextInput
          placeholder="Nombre del Producto"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
          placeholderTextColor="#8a9a92"
        />

        <Text style={styles.label}>Precio</Text>
        <TextInput
          placeholder="Precio del Producto"
          style={styles.input}
          placeholderTextColor="#8a9a92"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Categoría</Text>
        <TextInput
          placeholder="Categoría del Producto"
          value={categoria}
          onChangeText={setCategoria}
          style={styles.input}
          placeholderTextColor="#8a9a92"
        />

        <TouchableOpacity onPress={tomarFoto} style={styles.camera} activeOpacity={0.65}>
          <Ionicons name="camera-outline" size={28} color="#23785e" />
          <Text style={styles.cameraText}>Tomar foto del producto</Text>
        </TouchableOpacity>


        {fotoBase64 && (
          <Image
            source={{ uri: fotoBase64 }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 18,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />
        )}

        <TouchableOpacity onPress={guardarProducto} style={styles.save} activeOpacity={0.65}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />

          <Text style={styles.saveText}>Guardar producto</Text>
        </TouchableOpacity>

      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7f6",
  },

  container: {
    flexGrow: 1,
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
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: '#23785e', marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: '#18342b', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfe8e2', borderRadius: 14, padding: 16, color: '#18342b', fontSize: 16, marginBottom: 20 },
  camera: { alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24, borderRadius: 18, borderWidth: 1, borderStyle: 'dashed', borderColor: '#9fbcad', backgroundColor: '#edf5f0', marginBottom: 24 },
  cameraText: { color: '#23785e', fontWeight: '600', fontSize: 14 },
  save: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 18, borderRadius: 16, backgroundColor: '#23785e' },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
