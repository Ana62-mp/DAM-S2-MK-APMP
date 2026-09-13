import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { View, Text, Button, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();


export default function TabNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({route})=>({
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => {
                let iconName: any = 'List';

                if(route.name == 'InicioTab'){
                    iconName = focused? 'cube': 'cube-outline';
                } else if(route.name == 'PerfilTab'){
                    iconName = focused? 'person': 'person-outline';
                }

                return <Ionicons name = {iconName} size={size} color={color}/>

            },

            tabBarActiveTintColor:'#700a0a',
            tabBarInactiveTintColor: '#575555'

        })}>
            <Tab.Screen 
                name='InicioTab'
                component={HomeScreen}
                options={{title: 'Inventario'}}
            />
            <Tab.Screen 
                name='PerfilTab'
                component={ProfileScreen}
                options={{title: 'Perfil'}}
            />
        </Tab.Navigator>
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