import 'react-native-gesture-handler';
import React from 'react';
import "../global.css";
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainTabNavigator from './navigation/MainTabNavigator';
import HomeScreen from './screens/HomeScreen';
import { Text } from 'react-native';

function App() {
    return (

        <SafeAreaProvider>
            <NavigationContainer>
                <MainTabNavigator />
            </NavigationContainer>

        </SafeAreaProvider>
    );
}

registerRootComponent(App);