import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType
} from "react-native";

interface ProfileCardProps {
  nombre: string;
  cargo: string;
  imagen: ImageSourcePropType;
}

export default function ProfileCard({
  nombre,
  cargo,
  imagen
}: ProfileCardProps) {

  return (
    <View style={styles.card}>

      <View style={styles.imageContainer}>

        <View style={styles.imageBorder}>
          <Image
            style={styles.profileImage}
            source={imagen}
          />
        </View>

        <View style={styles.status}>
          <Text style={styles.statusText}>
            ♥
          </Text>
        </View>

      </View>

      <View style={styles.information}>

        <Text style={styles.title}>
          {nombre}
        </Text>

        <Text style={styles.subtitle}>
          {cargo}
        </Text>

        <View style={styles.tag}>
          <Text style={styles.tagText}>
            ✨ Team Member
          </Text>
        </View>

      </View>

      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>
          ›
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    padding: 15,

    borderRadius: 22,

    marginVertical: 7,

    marginHorizontal: 20,

    borderWidth: 1,

    borderColor: '#FCE7F3',

    shadowColor: '#BE185D',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.08,

    shadowRadius: 10,

    elevation: 3,
  },

  imageContainer: {
    position: 'relative',
  },

  imageBorder: {
    width: 70,
    height: 70,

    borderRadius: 35,

    padding: 3,

    backgroundColor: '#F9A8D4',

    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: '#FFF1F6',
  },

  status: {
    position: 'absolute',

    right: -1,
    bottom: 0,

    width: 23,
    height: 23,

    borderRadius: 12,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,

    borderColor: '#F9A8D4',
  },

  statusText: {
    color: '#EC4899',

    fontSize: 11,
  },

  information: {
    flex: 1,

    marginLeft: 15,
  },

  title: {
    fontSize: 17,

    fontWeight: '700',

    color: '#4A2638',
  },

  subtitle: {
    fontSize: 13,

    color: '#9D6B86',

    marginTop: 3,
  },

  tag: {
    alignSelf: 'flex-start',

    marginTop: 7,

    backgroundColor: '#FCE7F3',

    paddingHorizontal: 9,

    paddingVertical: 4,

    borderRadius: 10,
  },

  tagText: {
    fontSize: 10,

    fontWeight: '600',

    color: '#BE185D',
  },

  arrowContainer: {
    width: 30,
    height: 30,

    borderRadius: 15,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFF1F6',
  },

  arrow: {
    fontSize: 28,

    color: '#DB8EB5',

    marginTop: -3,
  },
});