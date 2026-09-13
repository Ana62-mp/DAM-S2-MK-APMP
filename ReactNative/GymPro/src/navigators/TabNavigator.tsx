import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Ionicons } from '@expo/vector-icons'; 
import ProgressScreen from "../screens/ProgressScreen";
import RoutineListScreen from "../screens/RoutineListScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator
        
            screenOptions={({route}) => ({
                headerShown: false, // Ocultamos la cabecera interna para usar la del Drawer         
                tabBarIcon: ({ color, size }) => {           
                let iconName: keyof typeof Ionicons.glyphMap = 'fitness';           
                if (route.name === 'Progreso') {
                    iconName = 'stats-chart';
                } 
                else if (route.name === 'Rutinas') {
                    iconName = 'list';
                }

                return <Ionicons name={iconName} size={size} color={color}/>


            },   
            
            tabBarActiveTintColor: '#0284c7',   
            tabBarInactiveTintColor: 'gray', 
        
        })}
        >
        <Tab.Screen name="Progreso" component={ProgressScreen} />
        <Tab.Screen name="Listas Rutinas" component={RoutineListScreen} />

        </Tab.Navigator>
    )
};

