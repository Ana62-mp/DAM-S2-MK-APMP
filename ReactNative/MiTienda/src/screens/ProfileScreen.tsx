import { View, Text, Button, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Mi perfil</Text>

                <Text style={styles.text}>
                    Contenido aquí
                </Text>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    text: {
        fontSize: 16,
        marginBottom: 24,
    },

    buttonContainer: {
        marginTop: 10,
    },
})