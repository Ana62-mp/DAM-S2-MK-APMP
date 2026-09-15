import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useRoutines } from "../context/RoutineContext";

export default function AddRoutineScreen({ navigation, route }: any) {
  const { addRoutine, updateRoutine, routines } = useRoutines();

  // Si llega un id, estamos editando
  const idToEdit = route.params?.id;

  // Estados de los inputs
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [durationString, setDurationString] = useState("");

  // Si existe un id, buscamos la rutina
  // y llenamos los inputs
  useEffect(() => {
    if (idToEdit) {
      const routineFound = routines.find((routine) => routine.id === idToEdit);

      if (routineFound) {
        setName(routineFound.name);

        setMuscleGroup(routineFound.muscleGroup);

        setDurationString(routineFound.duration.toString());
      }
    }
  }, [idToEdit]);

  // Guardar o actualizar
  const handleSave = () => {
    // Validar campos vacíos
    if (!name || !muscleGroup || !durationString) {
      Alert.alert("Error", "Faltan datos requeridos");

      return;
    }

    // Convertir duración a número
    const durationNumber = parseFloat(durationString);

    // vaalidar que sea número
    if (isNaN(durationNumber)) {
      Alert.alert("Error", "La duración debe ser un número válido");

      return;
    }

    // Si hay id -> actualizar
    if (idToEdit) {
      updateRoutine(idToEdit, {
        name,
        muscleGroup,
        duration: durationNumber,
      });
    }

    // Si no hay id -> crear
    else {
      addRoutine({
        name,
        muscleGroup,
        duration: durationNumber,
      });
    }

    // Regresar a la pantalla anterior
    navigation.goBack();
  };

  return (
    <View>
      <Text>Nombre:</Text>

      <TextInput value={name} onChangeText={setName} />

      <Text>Grupo Muscular:</Text>

      <TextInput value={muscleGroup} onChangeText={setMuscleGroup} />

      <Text>Duración:</Text>

      <TextInput
        value={durationString}
        onChangeText={setDurationString}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleSave}>
        <Text>{idToEdit ? "Actualizar" : "Guardar"}</Text>
      </TouchableOpacity>
    </View>
  );
}
