import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { ProductoProvider } from './src/context/ProductoContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen';
import AddProductsScreen from './src/screens/AddProductsScreen';
import { Ionicons } from '@expo/vector-icons';



export type RootStackParamList = {
  Home: undefined;
  AddProducts: undefined;
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductoProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#23785e',
            tabBarInactiveTintColor: '#82958b',
            tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#e5ece8' },
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
            tabBarIcon: ({ color, size }) => <Ionicons name={route.name === 'Productos' ? 'cube-outline' : 'add-circle-outline'} size={size} color={color} />,
          })}>
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
