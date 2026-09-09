import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList
} from "react-native";

import ProfileCard from "./ProfileCard";

const EMPLEADOS = [
  {
    id: "1",
    nombre: "Princesa Aurora",
    cargo: "Diseñadora UX 👑",
    fotoUrl:
      "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "2",
    nombre: "Princesa Isabella",
    cargo: "Diseñadora UI 🎀",
    fotoUrl:
      "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: "3",
    nombre: "Príncipe Alexander",
    cargo: "Desarrollador Real ⚔️",
    fotoUrl:
      "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "4",
    nombre: "Princesa Celeste",
    cargo: "Directora Creativa ✨",
    fotoUrl:
      "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: "5",
    nombre: "Príncipe Adrián",
    cargo: "Arquitecto Digital 👑",
    fotoUrl:
      "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: "6",
    nombre: "Princesa Victoria",
    cargo: "Experiencia de Usuario 🌸",
    fotoUrl:
      "https://randomuser.me/api/portraits/women/79.jpg"
  }
];


export default function EmployeeList() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Nuestro equipo
          </Text>

          <Text style={styles.subtitle}>
            Conoce a las personas que hacen la magia ✨
          </Text>
        </View>

        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {EMPLEADOS.length}
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>
          🔎
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Buscar empleado..."
          placeholderTextColor="#C084A1"
        />
      </View>

      <FlatList
        data={EMPLEADOS}
        keyExtractor={(item) => item.id}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.list}

        renderItem={({ item }) => (
          <ProfileCard
            nombre={item.nombre}
            cargo={item.cargo}
            imagen={{ uri: item.fotoUrl }}
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 20,

    backgroundColor: '#FFF7FB',
  },

  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 20,

    marginBottom: 15,
  },

  title: {
    fontSize: 22,

    fontWeight: '800',

    color: '#831843',
  },

  subtitle: {
    fontSize: 12,

    marginTop: 3,

    color: '#A96B8D',
  },

  counter: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: '#FCE7F3',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,

    borderColor: '#F9A8D4',
  },

  counterText: {
    fontSize: 15,

    fontWeight: 'bold',

    color: '#BE185D',
  },

  searchContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginHorizontal: 20,
    marginBottom: 12,

    height: 50,

    paddingHorizontal: 16,

    backgroundColor: '#FFFFFF',

    borderRadius: 25,

    borderWidth: 1,

    borderColor: '#FBCFE8',

    shadowColor: '#BE185D',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.07,

    shadowRadius: 8,

    elevation: 2,
  },

  searchIcon: {
    fontSize: 17,

    marginRight: 10,
  },

  input: {
    flex: 1,

    fontSize: 14,

    color: '#831843',
  },

  list: {
    paddingBottom: 30,

    paddingTop: 4,
  },
});