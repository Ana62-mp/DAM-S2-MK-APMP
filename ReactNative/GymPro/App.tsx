import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native'; 
import ChestDetailScreen from './src/screens/ChestDetailScreen';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  DrawerNavigator: undefined,
  ChestDetail: undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light'/>
      <Stack.Navigator>
        
        <Stack.Screen
          name='DrawerNavigator'
          component={DrawerNavigator}
          options={{headerShown: false}}
        
        />

        <Stack.Screen
          name='ChestDetail'
          component={ChestDetailScreen}
          options={{title: "Detalle de ejercicio"}}
        
        />

      </Stack.Navigator>
    </NavigationContainer>
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
