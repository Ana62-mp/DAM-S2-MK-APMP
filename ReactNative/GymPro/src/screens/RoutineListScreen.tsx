import { Text, Button, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function RoutineListScreen({navigation}:any) {

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <Text style={styles.title}>
                    RUTINA DE ENTRENAMIENTO
                </Text>

                <Button
                    title="Ver Rutina de pecho"
                    onPress={() => navigation.navigate("ChestDetail")}
                />

            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#7c1515",
    },

    subtitle: {
        fontSize: 15,
        color: "gray",
    },

});