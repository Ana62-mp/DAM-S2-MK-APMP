import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { Ionicons } from '@expo/vector-icons'; 
import SettingsScreen from "../screens/SettingsScreen";
import TabNavigator from "./TabNavigator";


const Drawer = createDrawerNavigator();


export default function DrawerNavigator(){
    return(
        <Drawer.Navigator

            screenOptions={{
                headerStyle: {backgroundColor: "#030303"},
                headerTintColor: "#f0f0f0",
                drawerActiveTintColor: "#5a1717",
            }}
            >


            <Drawer.Screen
                name="Mi Entrenamiento"
                component={TabNavigator}
                options={{
                    drawerIcon: ({color, size}) => (
                        <Ionicons name="barbell-outline" color={color} size={size}/>
                    ),
                }}
            />
            <Drawer.Screen
                name="Configuración"
                component={SettingsScreen}
                options={{
                    drawerIcon: ({color, size}) => (
                        <Ionicons name="settings-outline" color={color} size={size}/>
                    ),

                }}
            
            />


        </Drawer.Navigator>
    )
};

