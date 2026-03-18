import React from 'react';
import { View, Text } from 'react-native';
import HomeLayout from '../layouts/HomeLayout';

export default function BrowseScreen() {
    return (
        <HomeLayout scrollable={false} showSearch={false}>
            <View className="flex-1 items-center justify-center">
                <Text className="text-xl font-bold text-slate-800">Swipe Screen</Text>
            </View>
        </HomeLayout>
    );
}
