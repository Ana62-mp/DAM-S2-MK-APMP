import { Text, Button, View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function RoutineListScreen({navigation}:any) {

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.headingRow}>
                    <View>
                        <Text style={styles.eyebrow}>TU PLAN</Text>
                        <Text style={styles.title}>Entrena con propósito</Text>
                    </View>
                    <View style={styles.streakBadge}>
                        <Ionicons name="flame" size={17} color="#ffffff" />
                        <Text style={styles.streakText}>4 días</Text>
                    </View>
                </View>

                <ImageBackground
                    source={require('../../assets/chest-workout-hero.png')}
                    style={styles.hero}
                    imageStyle={styles.heroImage}
                >
                    <View style={styles.heroOverlay}>
                        <View style={styles.levelBadge}>
                            <Text style={styles.levelText}>FUERZA · INTERMEDIO</Text>
                        </View>
                        <View>
                            <Text style={styles.heroTitle}>Pecho & tríceps</Text>
                            <Text style={styles.heroSubtitle}>6 ejercicios · 50 min</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.infoRow}>
                    <View style={styles.infoCard}>
                        <Ionicons name="time-outline" size={20} color="#c9363f" />
                        <Text style={styles.infoValue}>50 min</Text>
                        <Text style={styles.infoLabel}>Duración</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Ionicons name="barbell-outline" size={20} color="#c9363f" />
                        <Text style={styles.infoValue}>18</Text>
                        <Text style={styles.infoLabel}>Series</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Ionicons name="flash-outline" size={20} color="#c9363f" />
                        <Text style={styles.infoValue}>Alta</Text>
                        <Text style={styles.infoLabel}>Intensidad</Text>
                    </View>
                </View>

                <View style={styles.buttonShell}>
                    <Button title="Ver rutina de pecho" color="#8f1d24" onPress={() => navigation.navigate("ChestDetail")} />
                </View>

                <Text style={styles.sectionTitle}>Enfoque de hoy</Text>
                <View style={styles.tipCard}>
                    <View style={styles.tipIcon}>
                        <Ionicons name="shield-checkmark-outline" size={22} color="#ffffff" />
                    </View>
                    <View style={styles.tipContent}>
                        <Text style={styles.tipTitle}>Técnica antes que peso</Text>
                        <Text style={styles.tipText}>Mantén el control del movimiento y descansa entre series.</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {flex: 1, backgroundColor: '#f7f7f7'},
    container: {flexGrow: 1, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 30},
    title: {fontSize: 29, fontWeight: "800", color: "#111111", letterSpacing: -0.8},
    eyebrow: {color: '#c9363f', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 4},
    headingRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22},
    streakBadge: {flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#65151a', paddingHorizontal: 11, paddingVertical: 8, borderRadius: 18},
    streakText: {color: '#ffffff', fontSize: 12, fontWeight: '700'},
    hero: {height: 245, justifyContent: 'flex-end', marginBottom: 16},
    heroImage: {borderRadius: 22},
    heroOverlay: {flex: 1, justifyContent: 'space-between', padding: 18, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.38)'},
    levelBadge: {alignSelf: 'flex-start', backgroundColor: 'rgba(8,8,8,0.78)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', borderRadius: 20, paddingHorizontal: 11, paddingVertical: 7},
    levelText: {color: '#ffffff', fontSize: 10, fontWeight: '800', letterSpacing: 1},
    heroTitle: {color: '#ffffff', fontSize: 27, fontWeight: '800'},
    heroSubtitle: {color: '#dddddd', fontSize: 14, marginTop: 5},
    infoRow: {flexDirection: 'row', gap: 9, marginBottom: 16},
    infoCard: {flex: 1, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 16, padding: 13},
    infoValue: {color: '#111111', fontSize: 16, fontWeight: '800', marginTop: 10},
    infoLabel: {color: '#666666', fontSize: 11, marginTop: 2},
    buttonShell: {overflow: 'hidden', borderRadius: 12, marginBottom: 26},
    sectionTitle: {color: '#111111', fontSize: 18, fontWeight: '800', marginBottom: 12},
    tipCard: {flexDirection: 'row', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 18, padding: 16, alignItems: 'center'},
    tipIcon: {width: 44, height: 44, borderRadius: 14, backgroundColor: '#65151a', alignItems: 'center', justifyContent: 'center', marginRight: 13},
    tipContent: {flex: 1},
    tipTitle: {color: '#111111', fontSize: 15, fontWeight: '700', marginBottom: 4},
    tipText: {color: '#666666', fontSize: 12, lineHeight: 18},
});
