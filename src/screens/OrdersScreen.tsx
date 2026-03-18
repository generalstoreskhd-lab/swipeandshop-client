import React from 'react';
import { View, Text } from 'react-native';
import HomeLayout from '../layouts/HomeLayout';

export default function OrdersScreen() {
    return (
        <HomeLayout showSearch={false}>
            <View className="flex-1 items-center justify-center min-h-[400px]">
                <Text className="text-xl font-bold text-slate-800 font-outfit">Orders</Text>
            </View>
        </HomeLayout>
    );
}
