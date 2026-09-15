import { View, Text, Button, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useProducts } from '../context/ProductContext';

export default function DetailScreen({route} : any){
  const idToView = route.params?.id;
  const {products} = useProducts();

  const product = products.find(p => p.id === idToView);

  if(!product) return <Text>Producto no encontrado</Text>

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.price.toFixed(2)}</Text>
      <Text>{product.createdAt}</Text>
      <Text>{product.descripcion}</Text>
    </View>
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