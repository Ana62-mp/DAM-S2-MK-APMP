import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { Ionicons } from "@expo/vector-icons";

export default function ListaScreen({ navigation }: any) {
  const db = useSQLiteContext();

  const [registros, setRegistros] = useState<any[]>([]);

  async function cargarRegistros() {
    const resultado = await db.getAllAsync(
      "SELECT * FROM registros ORDER BY id DESC"
    );

    setRegistros(resultado);
  }

  async function eliminarRegistro(id:number) {
    Alert.alert('Eliminar registro', '¿Estás segurx de que deseas eliminar este registro?',
      [
        {
          text:'Cancelar',
          style: 'cancel',
        },
        {
          text:'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await db.runAsync('DELETE FROM registros WHERE id = ?', id);
            cargarRegistros();
          }
        }
      
      
      ]
    )
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      cargarRegistros();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["left", "right", "bottom"]}
    >
      <View style={styles.container}>

        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Mi colección
            </Text>

            <Text style={styles.subtitle}>
              Guarda y califica tus registros favoritos
            </Text>
          </View>

          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {registros.length}
            </Text>
          </View>
        </View>


        {/* Lista */}
        <FlatList
          data={registros}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}

          contentContainerStyle={[
            styles.listContent,
            registros.length === 0 && {
              flex: 1,
            },
          ]}

          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="folder-open-outline"
                  size={48}
                  color="#7c3aed"
                />
              </View>

              <Text style={styles.emptyTitle}>
                Todavía no hay registros
              </Text>

              <Text style={styles.emptyText}>
                Presiona el botón + para agregar tu primer registro.
              </Text>
            </View>
          }

          renderItem={({ item }) => (
            <View style={styles.card}>

              {/* Imagen */}
              {item.fotoBase64 ? (
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${item.fotoBase64}`,
                  }}
                  style={styles.cardImage}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons
                    name="image-outline"
                    size={32}
                    color="#a78bfa"
                  />
                </View>
              )}


              {/* Información */}
              <View style={styles.cardInfo}>

                <Text
                  style={styles.cardTitle}
                  numberOfLines={1}
                >
                  {item.titulo}
                </Text>


                {/* Calificación */}
                <View style={styles.ratingContainer}>
                  <Ionicons
                    name="star"
                    size={16}
                    color="#f59e0b"
                  />

                  <Text style={styles.ratingText}>
                    {item.calificacion}
                  </Text>
                </View>


                <Text
                  style={styles.comments}
                  numberOfLines={2}
                >
                  {item.comentarios || "Sin comentarios"}
                </Text>


                <View style={styles.dateContainer}>
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color="#8b8295"
                  />

                  <Text style={styles.dateText}>
                    {item.fecha}
                  </Text>
                </View>

              </View>


              {/* Editar */}
              <TouchableOpacity
                style={styles.editButton}
                activeOpacity={0.7}

                onPress={() =>
                  navigation.navigate("Formulario", {
                    id: item.id,
                    tituloActual: item.titulo,
                    calificacionActual: item.calificacion,
                    comentariosActuales: item.comentarios,
                    fotoActual: item.fotoBase64,
                  })
                }
              >
                <Ionicons
                  name="pencil"
                  size={20}
                  color="#7c3aed"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editButton}
                activeOpacity={0.7}
                onPress={() => eliminarRegistro(item.id)}>

                <Ionicons
                  name="trash"
                  size={20}
                  color="#ed3a61"
                />

              </TouchableOpacity>

            </View>
          )}
        />


        {/* Botón flotante */}
        <TouchableOpacity
          style={styles.floatingButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Formulario")
          }
        >
          <Ionicons
            name="add"
            size={34}
            color="#ffffff"
          />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f5fb",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },


  // HEADER

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#21182b",
  },

  subtitle: {
    fontSize: 14,
    color: "#83758e",
    marginTop: 4,
  },

  counter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ede9fe",
    justifyContent: "center",
    alignItems: "center",
  },

  counterText: {
    color: "#7c3aed",
    fontWeight: "800",
    fontSize: 16,
  },


  // LISTA

  listContent: {
    paddingBottom: 100,
  },


  // TARJETA

  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#ffffff",

    borderRadius: 20,

    padding: 14,
    marginBottom: 15,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 3,
  },


  cardImage: {
    width: 82,
    height: 82,
    borderRadius: 16,
    backgroundColor: "#ede9fe",
  },


  imagePlaceholder: {
    width: 82,
    height: 82,
    borderRadius: 16,

    backgroundColor: "#f3f0ff",

    justifyContent: "center",
    alignItems: "center",
  },


  cardInfo: {
    flex: 1,
    marginLeft: 14,
  },


  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d2335",
    marginBottom: 5,
  },


  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",

    alignSelf: "flex-start",

    backgroundColor: "#fffbeb",
    borderRadius: 10,

    paddingHorizontal: 8,
    paddingVertical: 3,

    marginBottom: 7,
  },

  ratingText: {
    color: "#a16207",
    fontWeight: "700",
    marginLeft: 4,
  },


  comments: {
    fontSize: 13,
    color: "#726779",
    lineHeight: 18,
  },


  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  dateText: {
    fontSize: 12,
    color: "#93899b",
    marginLeft: 4,
  },


  editButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: "#f3f0ff",

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 8,
  },


  // BOTÓN FLOTANTE

  floatingButton: {
    position: "absolute",

    right: 24,
    bottom: 25,

    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#7c3aed",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#7c3aed",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,

    elevation: 8,
  },


  // EMPTY STATE

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 40,
    paddingBottom: 80,
  },

  emptyIcon: {
    width: 90,
    height: 90,

    borderRadius: 45,

    backgroundColor: "#ede9fe",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#33283b",
  },

  emptyText: {
    fontSize: 14,
    color: "#83758e",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
});