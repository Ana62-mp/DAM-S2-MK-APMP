import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';
import { View, Text, Button, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName='Panel'>
            <Drawer.Screen
                name='Panel'
                component={TabNavigator}
                options={{title: 'Panel Principal'}}

            />
            <Drawer.Screen
                name='Acceso a detalles'
                component={DetailScreen}
                options={{title: 'Ver productos'}}

            />
        </Drawer.Navigator>
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