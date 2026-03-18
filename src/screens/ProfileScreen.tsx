import React from 'react';
import { View, Text } from 'react-native';
import Topbar from '../components/Topbar';

/**
 * ProfileScreen Component
 * Placeholder screen for user profile management.
 * Currently renders a centered "Profile" title with the Topbar.
 * Will be expanded to include user settings, order history links, and account details.
 */
export default function ProfileScreen() {
    return (
        <View className="flex-1 bg-slate-50">
            <Topbar isLoggedIn={false} showSearch={false} />
            <View className="flex-1 items-center justify-center">
                <Text className="text-xl font-bold text-slate-800 font-outfit">Profile</Text>
            </View>
        </View>
    );
}
