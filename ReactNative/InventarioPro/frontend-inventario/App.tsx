import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { ProductoProvider } from './src/context/ProductoContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen';
import AddProductsScreen from './src/screens/AddProductsScreen';



export type RootStackParamList = {
  Home: undefined;
  AddProducts: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductoProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name='Productos'
              component={HomeScreen}
            />

            <Tab.Screen
              name='Agregar'
              component={AddProductsScreen}
            />

          </Tab.Navigator>

        </NavigationContainer>
      </ProductoProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
