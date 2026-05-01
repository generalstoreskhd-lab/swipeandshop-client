import React from 'react';
import { View, Text } from 'react-native';
import HomeLayout from '../layouts/HomeLayout';
import OrderCard from '../components/OrderCard';

const DUMMY_ORDERS: any[] = [];

import { useAppSelector } from '../store/hooks';
import LoginRequired from '../components/LoginRequired';
import { translations } from '../constants/translations';

export default function OrdersScreen() {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const { language } = useAppSelector((state) => state.settings);

    if (!isLoggedIn) {
        return <LoginRequired />;
    }

    const t = translations[language];

    return (
        <HomeLayout showSearch={false}>
            {/* Header */}
            <View className="px-4 pt-2 pb-4">
                <Text className="text-2xl font-bold text-white font-outfit">{t.myOrders}</Text>
                <Text className="text-white/55 text-sm font-inter mt-1">
                    {DUMMY_ORDERS.length} {t.ordersPlaced}
                </Text>
            </View>

            {DUMMY_ORDERS.length === 0 && (
                <View className="mx-4 mt-8 rounded-[32px] border border-white/15 bg-white/10 px-6 py-10 items-center">
                    <Text className="text-xl font-bold text-white font-outfit text-center mb-2">No orders yet</Text>
                    <Text className="text-white/60 font-inter text-center">Your completed orders will appear here.</Text>
                </View>
            )}

            {/* Orders List */}
            {DUMMY_ORDERS.map((order) => (
                <OrderCard key={order.orderId} {...order} />
            ))}

            {/* Bottom Spacer */}
            <View className="h-8" />
        </HomeLayout>
    );
}
