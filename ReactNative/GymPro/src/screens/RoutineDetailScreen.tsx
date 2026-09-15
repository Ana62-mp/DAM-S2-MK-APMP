import { Text, View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const exercises = [
  {name: 'Press de banca', detail: '4 series · 8–10 reps', icon: 'barbell-outline'},
  {name: 'Press inclinado', detail: '3 series · 10–12 reps', icon: 'trending-up-outline'},
  {name: 'Aperturas con mancuernas', detail: '3 series · 12 reps', icon: 'resize-outline'},
  {name: 'Fondos en paralelas', detail: '3 series · 8–12 reps', icon: 'fitness-outline'},
];

export default function RoutineDetailScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ImageBackground source={require('../../assets/chest-workout-hero.png')} style={styles.hero} imageStyle={styles.heroImage}>
          <View style={styles.heroOverlay}>
            <View style={styles.badge}><Text style={styles.badgeText}>DÍA 01</Text></View>
            <View>
              <Text style={styles.title}>Pecho & tríceps</Text>
              <Text style={styles.subtitle}>Fuerza · Nivel intermedio</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}><Ionicons name="time-outline" size={18} color="#c9363f" /><Text style={styles.summaryText}>50 min</Text></View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}><Ionicons name="barbell-outline" size={18} color="#c9363f" /><Text style={styles.summaryText}>18 series</Text></View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}><Ionicons name="flame-outline" size={18} color="#c9363f" /><Text style={styles.summaryText}>Alta</Text></View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ejercicios</Text>
          <Text style={styles.count}>4 movimientos</Text>
        </View>

        {exercises.map((exercise, index) => (
          <View style={styles.exerciseCard} key={exercise.name}>
            <Text style={styles.exerciseNumber}>{String(index + 1).padStart(2, '0')}</Text>
            <View style={styles.exerciseIcon}><Ionicons name={exercise.icon as any} size={22} color="#ffffff" /></View>
            <View style={styles.exerciseCopy}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDetail}>{exercise.detail}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#777777" />
          </View>
        ))}

        <View style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={22} color="#e2666d" />
          <Text style={styles.noteText}>Calienta 5–10 minutos y prioriza una ejecución limpia en cada repetición.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#f7f7f7'},
  container: {paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32},
  hero: {height: 230, marginBottom: 14},
  heroImage: {borderRadius: 22},
  heroOverlay: {flex: 1, padding: 18, justifyContent: 'space-between', borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.38)'},
  badge: {alignSelf: 'flex-start', backgroundColor: '#8f1d24', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 6},
  badgeText: {color: '#ffffff', fontSize: 10, fontWeight: '900', letterSpacing: 1},
  title: {fontSize: 29, fontWeight: '900', color: '#ffffff', letterSpacing: -0.7},
  subtitle: {fontSize: 13, color: '#d0d0d0', marginTop: 4},
  summaryRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 16, paddingVertical: 14, marginBottom: 24},
  summaryItem: {alignItems: 'center', gap: 5},
  summaryText: {fontSize: 11, color: '#b8b8b8', fontWeight: '600'},
  divider: {width: 1, height: 28, backgroundColor: '#e3e3e3'},
  sectionHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12},
  sectionTitle: {fontSize: 19, color: '#111111', fontWeight: '800'},
  count: {fontSize: 11, color: '#666666'},
  exerciseCard: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 16, padding: 13, marginBottom: 10},
  exerciseNumber: {width: 26, color: '#5f5f5f', fontSize: 11, fontWeight: '800'},
  exerciseIcon: {width: 42, height: 42, borderRadius: 13, backgroundColor: '#65151a', alignItems: 'center', justifyContent: 'center'},
  exerciseCopy: {flex: 1, marginLeft: 12},
  exerciseName: {color: '#111111', fontSize: 14, fontWeight: '700'},
  exerciseDetail: {color: '#666666', fontSize: 11, marginTop: 4},
  noteCard: {flexDirection: 'row', gap: 10, backgroundColor: '#fff3f3', borderWidth: 1, borderColor: '#e6c5c7', borderRadius: 16, padding: 15, marginTop: 8},
  noteText: {flex: 1, color: '#bfa5a6', fontSize: 12, lineHeight: 18},
});
