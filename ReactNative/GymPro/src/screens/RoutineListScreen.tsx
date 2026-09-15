import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";

export default function RoutineListScreen({ navigation }: any) {
  const { routines, deleteRoutine } = useRoutines();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("AddRoutine")}>
        <Ionicons name="add" size={30} color="black" />
      </TouchableOpacity>

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View>
              <View>
                <Text>{item.name}</Text>

                <Text>{item.muscleGroup}</Text>

                <Text>{item.duration} mins</Text>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Detail", { id: item.id })
                  }
                >
                  <Ionicons name="eye" size={24} color="blue" />
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AddRoutine", { id: item.id })
                  }
                >
                  <Ionicons name="pencil" size={24} color="orange" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteRoutine(item.id)}>
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
