import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler'; 
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';

export type RootStackParamList = {
  DrawerNavigator: undefined,
  ChestDetail: undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer theme={{
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: '#8f1d24',
        background: '#f7f7f7',
        card: '#ffffff',
        text: '#111111',
        border: '#e3e3e3',
      },
    }}>
      <StatusBar style='light'/>
      <Stack.Navigator>
        
        <Stack.Screen
          name='DrawerNavigator'
          component={DrawerNavigator}
          options={{headerShown: false}}
        
        />

        <Stack.Screen
          name='ChestDetail'
          component={RoutineDetailScreen}
          options={{
            title: "Rutina de pecho",
            headerStyle: {backgroundColor: '#ffffff'},
            headerTintColor: '#111111',
            headerShadowVisible: false,
          }}
        
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
