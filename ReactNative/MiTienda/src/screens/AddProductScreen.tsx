import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddProductScreen({ navigation, route }: any) {
  const { addProduct, updateProduct, products } = useProducts();
  const idToEdit = route.params?.id;

  const [name, setName] = useState("");
  const [priceString, setPriceString] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (idToEdit) {
      const productFound = products.find((p) => p.id === idToEdit);
      if (productFound) {
        setName(productFound.name);
        setPriceString(productFound.price.toString());
        setDescripcion(productFound.descripcion);
      }
    }
  }, [idToEdit]);

  const handleSave = () => {
    if (!name || !priceString) {
      Alert.alert("Error", "Faltan datos requeridos");
      return;
    }

    const priceNumber = parseFloat(priceString);
    if (isNaN(priceNumber)) {
      Alert.alert("Error", "El precio debe ser un numero valido");
      return;
    }

    if (idToEdit) {
      updateProduct(idToEdit, { name, price: priceNumber, descripcion });
    } else {
      addProduct({ name, price: priceNumber, descripcion });
    }

    navigation.goBack();
  };

  return (
    <View>
      <Text>Nombre: </Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Price: </Text>
      <TextInput
        value={priceString}
        onChangeText={setPriceString}
        keyboardType="numeric"
      />

      <Text>Descripcion</Text>
      <TextInput value={descripcion} onChangeText={setDescripcion} />
      <TouchableOpacity onPress={handleSave}>
        <Text>{idToEdit ? "Actualizar" : "Guardar"}</Text>
      </TouchableOpacity>
    </View>
  );
}
