import React from 'react';
import "../global.css";
import { Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RegisterScreen } from './screens/RegisterScreen';
import PhoneVerification from './screens/PhoneVerification';
import NameScreen from './screens/NameScreen';
import AddressScreen from './screens/AddressScreen';

const Stack = createNativeStackNavigator();

function HomeScreen() {
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <RegisterScreen />
        </SafeAreaView>

    );
}

function App() {
    return (


        <SafeAreaProvider>
            <View className="flex-1 items-center justify-center bg-blue-500">
                <AddressScreen />
            </View>
        </SafeAreaProvider>



    );
}

registerRootComponent(App);