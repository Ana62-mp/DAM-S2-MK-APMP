import { View, Text, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRoutines } from "../context/RoutineContext";

export default function RoutineDetailScreen({ route }: any) {
  const { routines } = useRoutines();

  // Recibimos el id enviado desde RoutineListScreen
  const idToView = route.params?.id;

  // Buscamos la rutina correspondiente
  const routine = routines.find((routine) => routine.id === idToView);

  // Por si no existe la rutina
  if (!routine) {
    return (
      <SafeAreaView>
        <Text>Rutina no encontrada</Text>
      </SafeAreaView>
    );
  }

  // Convertimos la fecha para mostrarla mejor
  const createdDate = new Date(routine.createdAt).toLocaleDateString();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{routine.name}</Text>

      <Text style={styles.label}>Grupo muscular</Text>
      <Text style={styles.info}>{routine.muscleGroup}</Text>

      <Text style={styles.label}>Duración</Text>
      <Text style={styles.info}>{routine.duration} mins</Text>

      <Text style={styles.label}>Fecha de creación</Text>
      <Text style={styles.info}>{createdDate}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
  },

  info: {
    fontSize: 20,
    marginTop: 5,
  },
});
