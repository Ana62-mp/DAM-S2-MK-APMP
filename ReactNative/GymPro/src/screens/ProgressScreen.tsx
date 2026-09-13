import {} from "@expo/vector-icons"
import {Text, Button, View, StyleSheet} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function ProgressScreen(){
    return(

        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
        
                <Text style={styles.title}>
                    PANTALLA DE PROGRESO
                </Text>
        
        
            </View>
        </SafeAreaView>
    )
};

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