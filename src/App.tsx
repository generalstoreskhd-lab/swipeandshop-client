import React from 'react';
import "../global.css";
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainTabNavigator from './navigation/MainTabNavigator';

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