import { Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Image, TextInput, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductContext } from "../context/ProductoContext";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


export default function AddProductsScreen({navigation}:any) {
  const { addProduct } = useProductContext();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [fotoBase64, setFotoBase64] = useState<string | undefined>();
  const [latitud, setLatitud] = useState<number | undefined>();
  const [longitud, setLongitud] = useState<number | undefined>();
  const [mostrarEscaner, setMostrarEscaner] = useState(false);
  const [permisoCamara, solicitarPermisoCamara] = useCameraPermissions();

  const tomarFoto = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') return Alert.alert("error" , "Se necesita permiso para usar la cámara");

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!resultado.canceled && resultado.assets[0].base64) {
      // (resultado.assets[0].base64) es la imagen en base64 
      //le agregamos el prefijo "data:image/jpeg;base64," para que sea reconocida como una imagen
      //(`data:image/jpeg;base64,${resultado.assets[0].base64}`)
      setFotoBase64(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
      Alert.alert('Exito', 'Foto capturada')
    }

  };

  const obtenerUbicacion = async() => {
      const {status} = await Location.requestForegroundPermissionsAsync();
  

    if(status !== 'granted') return Alert.alert('error', 'Permiso denegado')
    
    const ubicacion = await Location.getCurrentPositionAsync({});
    setLatitud(ubicacion.coords.latitude)
    setLongitud(ubicacion.coords.longitude)
    Alert.alert('Exito', 'Ubicación capturada')

}

  const guardarProducto = async () => {
      const guardado = await addProduct({
        nombre: nombre,
        precio: Number(precio),
        categoria: categoria,
        fotoBase64: fotoBase64,
        codigoBarras: codigoBarras || null,
        latitud:latitud,
        longitud:longitud,
      });

      if (guardado) navigation.goBack();
      setNombre("");
      setPrecio("");
      setCategoria("");
      setCodigoBarras("");
      setFotoBase64(undefined);
    };

  const abrirEscaner = async () => {
    if (!permisoCamara?.granted) {
      const permiso = await solicitarPermisoCamara();
      if (!permiso.granted) {
        Alert.alert("error", "Se necesita permiso para usar la cámara");
        return;
      }
    }

    setMostrarEscaner(true);
  };

  const codigoEscaneado = ({ data }: { data: string }) => {
    setCodigoBarras(data);
    setMostrarEscaner(false);
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

        <Text style={styles.label}>Código de barras</Text>
        <TextInput
          placeholder="Código QR o de barras"
          value={codigoBarras}
          onChangeText={setCodigoBarras}
          style={styles.input}
          placeholderTextColor="#8a9a92"
        />

        <TouchableOpacity onPress={abrirEscaner} style={styles.camera} activeOpacity={0.65}>
          <Ionicons name="barcode-outline" size={28} color="#23785e" />
          <Text style={styles.cameraText}>Escanear código</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={tomarFoto} style={styles.camera} activeOpacity={0.65}>
          <Ionicons name="camera-outline" size={28} color="#23785e" />
          <Text style={styles.cameraText}>Tomar foto del producto</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={obtenerUbicacion} style={styles.camera} activeOpacity={0.65}>
          <Ionicons name="map" size={28} color="#23785e" />
          <Text style={styles.cameraText}>Tomar la ubicación</Text>
        </TouchableOpacity>

        <Modal visible={mostrarEscaner} animationType="slide" onRequestClose={() => setMostrarEscaner(false)}>
          <CameraView
            style={styles.scanner}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr", "ean13", "ean8", "code128", "code39", "upc_a", "upc_e"] }}
            onBarcodeScanned={codigoEscaneado}
          >
            <TouchableOpacity onPress={() => setMostrarEscaner(false)} style={styles.closeScanner}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </CameraView>
        </Modal>


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

        {latitud && (
          <Text>
            GPS: {latitud.toFixed(4)}, {longitud?.toFixed(4)}
          </Text>
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
  scanner: { flex: 1 },
  closeScanner: { alignSelf: 'flex-end', margin: 48, padding: 8 },
  save: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 18, borderRadius: 16, backgroundColor: '#23785e' },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
