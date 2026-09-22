import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useSQLiteContext } from "expo-sqlite";

import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

export default function FormularioScreen({ route, navigation }: any) {
  const db = useSQLiteContext();

  // Parámetros recibidos cuando editamos
  const idEdicion = route.params?.id;
  const tituloEdicion = route.params?.tituloActual || "";
  const califEdicion = route.params?.calificacionActual?.toString() || "";
  const comenEdicion = route.params?.comentariosActuales || "";
  const fotoEdicion = route.params?.fotoActual || "";

  // Estados
  const [titulo, setTitulo] = useState(tituloEdicion);
  const [calificacion, setCalificacion] = useState(califEdicion);
  const [comentarios, setComentarios] = useState(comenEdicion);
  const [fotoBase64, setFotoBase64] = useState(fotoEdicion);

  async function seleccionarFoto() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!resultado.canceled) {
      setFotoBase64(resultado.assets[0].base64 || "");
    }
  }

  async function guardar() {
    // Validación sencilla
    if (titulo.trim() === "") {
      Alert.alert("Campo obligatorio", "Ingresa un título.");

      return;
    }

    if (calificacion.trim() === "") {
      Alert.alert("Campo obligatorio", "Ingresa una calificación.");

      return;
    }

    const numeroCalificacion = Number(calificacion);

    if (
      isNaN(numeroCalificacion) ||
      numeroCalificacion < 0 ||
      numeroCalificacion > 10
    ) {
      Alert.alert(
        "Calificación inválida",
        "Ingresa una calificación entre 0 y 10.",
      );

      return;
    }

    const fecha = new Date().toLocaleDateString();

    if (idEdicion !== undefined && idEdicion !== null) {
      await db.runAsync(
        `
        UPDATE registros
        SET titulo = ?,
            calificacion = ?,
            comentarios = ?,
            fotoBase64 = ?,
            fecha = ?
        WHERE id = ?
        `,

        titulo,
        numeroCalificacion,
        comentarios,
        fotoBase64,
        fecha,
        idEdicion,
      );
    } else {
      await db.runAsync(
        `
        INSERT INTO registros
        (
          titulo,
          calificacion,
          comentarios,
          fotoBase64,
          fecha
        )
        VALUES (?, ?, ?, ?, ?)
        `,

        titulo,
        numeroCalificacion,
        comentarios,
        fotoBase64,
        fecha,
      );
    }

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerIcon}>
            <Ionicons
              name={idEdicion ? "create-outline" : "add-outline"}
              size={28}
              color="#7c3aed"
            />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              {idEdicion ? "Editar registro" : "Nuevo registro"}
            </Text>

            <Text style={styles.subtitle}>Completa la información</Text>
          </View>
        </View>

        <View style={styles.formCard}>
          {/* TÍTULO */}

          <Text style={styles.label}>Título</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="text-outline"
              size={20}
              color="#8b7c94"
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Ej. Mi película favorita"
              placeholderTextColor="#aaa2af"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          {/* CALIFICACIÓN */}

          <Text style={styles.label}>Calificación</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="star-outline"
              size={20}
              color="#f59e0b"
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="0 - 10"
              placeholderTextColor="#aaa2af"
              value={calificacion}
              onChangeText={setCalificacion}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          {/* COMENTARIOS */}

          <Text style={styles.label}>Comentarios</Text>

          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color="#8b7c94"
              style={styles.textAreaIcon}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="¿Qué opinas?"
              placeholderTextColor="#aaa2af"
              value={comentarios}
              onChangeText={setComentarios}
            />
          </View>

          {/* FOTO */}

          <Text style={styles.label}>Imagen</Text>

          {fotoBase64 !== "" ? (
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${fotoBase64}`,
                }}
                style={styles.previewImage}
              />

              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={seleccionarFoto}
              >
                <Ionicons name="camera-outline" size={20} color="#ffffff" />

                <Text style={styles.changePhotoText}>Cambiar foto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.photoPlaceholder}
              onPress={seleccionarFoto}
              activeOpacity={0.7}
            >
              <View style={styles.photoIcon}>
                <Ionicons name="camera-outline" size={34} color="#7c3aed" />
              </View>

              <Text style={styles.photoTitle}>Agregar una imagen</Text>

              <Text style={styles.photoSubtitle}>
                Selecciona una foto de tu galería
              </Text>
            </TouchableOpacity>
          )}

          {/* GUARDAR */}

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={guardar}
          >
            <Ionicons name="save-outline" size={21} color="#ffffff" />

            <Text style={styles.saveButtonText}>
              {idEdicion ? "Guardar cambios" : "Guardar registro"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f5fb",
  },

  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  // ENCABEZADO

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 8,
    marginBottom: 24,
  },

  headerIcon: {
    width: 56,
    height: 56,

    borderRadius: 18,

    backgroundColor: "#ede9fe",

    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    marginLeft: 14,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#2d2335",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 14,
    color: "#85788e",
  },

  // TARJETA DEL FORMULARIO

  formCard: {
    backgroundColor: "#ffffff",

    borderRadius: 24,

    padding: 20,

    shadowColor: "#000000",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.07,

    shadowRadius: 12,

    elevation: 3,
  },

  // LABEL

  label: {
    fontSize: 14,
    fontWeight: "700",

    color: "#55475f",

    marginBottom: 8,
    marginTop: 14,
  },

  // INPUT

  inputContainer: {
    minHeight: 56,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#f8f7fa",

    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#ebe7ef",

    paddingHorizontal: 14,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,

    fontSize: 16,

    color: "#302638",

    paddingVertical: 14,
  },

  // COMENTARIOS

  textAreaContainer: {
    minHeight: 120,

    alignItems: "flex-start",
  },

  textAreaIcon: {
    marginTop: 17,
    marginRight: 10,
  },

  textArea: {
    minHeight: 110,

    textAlignVertical: "top",

    paddingTop: 15,
  },

  // FOTO

  photoPlaceholder: {
    height: 180,

    borderRadius: 20,

    borderWidth: 2,

    borderStyle: "dashed",

    borderColor: "#d8cdf9",

    backgroundColor: "#faf9ff",

    justifyContent: "center",
    alignItems: "center",
  },

  photoIcon: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: "#ede9fe",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,
  },

  photoTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "#4c3a56",
  },

  photoSubtitle: {
    fontSize: 13,

    color: "#95889e",

    marginTop: 4,
  },

  imageContainer: {
    position: "relative",
  },

  previewImage: {
    width: "100%",
    height: 220,

    borderRadius: 20,

    resizeMode: "cover",
  },

  changePhotoButton: {
    position: "absolute",

    bottom: 12,
    right: 12,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "rgba(70, 48, 85, 0.88)",

    paddingHorizontal: 14,
    paddingVertical: 9,

    borderRadius: 14,
  },

  changePhotoText: {
    color: "#ffffff",

    fontWeight: "600",

    marginLeft: 6,

    fontSize: 13,
  },

  // BOTÓN GUARDAR

  saveButton: {
    height: 58,

    flexDirection: "row",

    backgroundColor: "#7c3aed",

    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 28,

    shadowColor: "#7c3aed",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.28,

    shadowRadius: 8,

    elevation: 5,
  },

  saveButtonText: {
    color: "#ffffff",

    fontSize: 16,

    fontWeight: "700",

    marginLeft: 8,
  },
});
