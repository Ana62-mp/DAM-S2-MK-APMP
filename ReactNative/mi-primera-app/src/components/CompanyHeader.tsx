import { StyleSheet, Text, View, Image } from "react-native";

export default function CompanyHeader() {
  return (
    <View style={styles.card}>

      <View style={styles.decoracion1} />
      <View style={styles.decoracion2} />

      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://tse1.mm.bing.net/th/id/OIP.hChyPUJBJHXml1X1KLqpAQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          }}
        />

        <View style={styles.crown}>
          <Text style={styles.crownText}>👑</Text>
        </View>
      </View>

      <Text style={styles.companyName}>
        Dream Company
      </Text>

      <Text style={styles.title}>
        ✨ Siempre haciendo más ✨
      </Text>

      <Text style={styles.subtitle}>
        Nuestro maravilloso equipo
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FCE7F3',

    paddingVertical: 22,
    paddingHorizontal: 24,

    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,

    position: 'relative',
    overflow: 'hidden',
  },

  decoracion1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E9D5FF',
    top: -90,
    right: -50,
    opacity: 0.7,
  },

  decoracion2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FBCFE8',
    bottom: -70,
    left: -40,
  },

  imageContainer: {
    position: 'relative',
  },

  profileImage: {
    width: 100,
    height: 100,

    borderRadius: 50,

    borderWidth: 4,
    borderColor: '#FFFFFF',

    backgroundColor: '#FFFFFF',

    shadowColor: '#BE185D',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,

    elevation: 6,
  },

  crown: {
    position: 'absolute',

    top: -15,
    right: -12,

    backgroundColor: '#FFFFFF',

    width: 38,
    height: 38,

    borderRadius: 19,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,

    elevation: 4,
  },

  crownText: {
    fontSize: 21,
  },

  companyName: {
    marginTop: 12,

    fontSize: 13,

    fontWeight: '600',

    color: '#A855F7',

    textTransform: 'uppercase',

    letterSpacing: 2,
  },

  title: {
    marginTop: 5,

    fontSize: 22,

    fontWeight: '800',

    color: '#831843',

    textAlign: 'center',

    letterSpacing: 0.3,
  },

  subtitle: {
    marginTop: 4,

    fontSize: 13,

    color: '#9D6B86',

    fontWeight: '500',
  },
});