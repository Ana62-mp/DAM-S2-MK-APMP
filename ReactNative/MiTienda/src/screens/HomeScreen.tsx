import {View, Text, Button} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen({navigation}:any){
    return (
        <SafeAreaView>
            <Text>Pantalla de inicio</Text>
            <Button
                title='Ir a detalles'
                onPress={()=>navigation.navigate('Detail')}
            
            
            />


        </SafeAreaView>
    )
}