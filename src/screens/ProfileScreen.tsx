import React from 'react';
import { View, Text } from 'react-native';
import Topbar from '../components/Topbar';

export default function ProfileScreen() {
    return (
        <View className="flex-1 bg-slate-50">
            <Topbar isLoggedIn={false} showSearch={false} />
            <View className="flex-1 items-center justify-center">
                <Text className="text-xl font-bold text-slate-800">Profile</Text>
            </View>
        </View>
    );
}
