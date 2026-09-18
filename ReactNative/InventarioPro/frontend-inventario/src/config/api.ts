import axios from 'axios'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

// En Expo Go usamos el mismo equipo que sirve Metro, sin fijar una IP de red.
const expoHost = Constants.expoConfig?.hostUri?.split(':')[0]
//IP TOMADA DE LA COMPU ACTUALIZADA
const host = Platform.OS === 'web'
    ? window.location.hostname
    : expoHost || (Platform.OS === 'android' ? '10.0.2.2' : 'localhost')
const API_URL = process.env.EXPO_PUBLIC_API_URL || `http://${host}:3001`


export const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers:{
        'Content-Type':'application/json'
    }
})

