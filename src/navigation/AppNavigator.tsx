import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import CartScreen from '../screens/CartScreen';

export type AppStackParamList = {
    MainTabs: undefined;
    Notifications: undefined;
    Cart: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

/**
 * AppNavigator Component
 * Reverted to original state (MainTabs, Notifications, Cart only).
 */
export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    );
}
