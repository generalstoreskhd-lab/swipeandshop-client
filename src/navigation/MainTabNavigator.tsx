import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import OrdersScreen from '../screens/OrdersScreen';
import PreferencesScreen from '../screens/PreferencesScreen';

export type MainTabParamList = {
    Home: undefined;
    Swipe: undefined;
    Orders: undefined;
    Preferences: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Swipe') {
                        iconName = focused ? 'flame' : 'flame-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Preferences') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else {
                        iconName = 'help-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#f97316',
                tabBarInactiveTintColor: '#ffffff99',
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: '#ffffff1f',
                    backgroundColor: '#090909',
                    position: 'absolute',
                    marginHorizontal: 18,
                    marginBottom: 12,
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                    height: 82,
                    paddingBottom: 20,
                    paddingTop: 10,
                    elevation: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    fontFamily: 'Inter_500Medium',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Swipe" component={BrowseScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Preferences" component={PreferencesScreen} />
        </Tab.Navigator>
    );
}
