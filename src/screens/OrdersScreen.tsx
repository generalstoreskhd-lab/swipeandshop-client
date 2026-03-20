import React from 'react';
import { View, Text } from 'react-native';
import HomeLayout from '../layouts/HomeLayout';
import OrderCard from '../components/OrderCard';

const DUMMY_ORDERS = [
    {
        orderId: 'SW1042',
        status: 'Processing' as const,
        date: 'Mar 18, 2026',
        items: [
            { name: 'Wireless Earbuds Pro', quantity: 1, unit: 'pc', price: 129.00 },
            { name: 'USB-C Charging Cable', quantity: 2, unit: 'pcs', price: 12.99 },
            { name: 'Silicone Ear Tips (Pack)', quantity: 1, unit: 'pack', price: 8.50 },
        ],
    },
    {
        orderId: 'SW1038',
        status: 'Shipped' as const,
        date: 'Mar 15, 2026',
        items: [
            { name: 'Minimalist Linen Shirt', quantity: 2, unit: 'pcs', price: 45.00 },
            { name: 'Slim Fit Chinos', quantity: 1, unit: 'pc', price: 55.00 },
        ],
    },
    {
        orderId: 'SW1025',
        status: 'Delivered' as const,
        date: 'Mar 10, 2026',
        items: [
            { name: 'Ceramic Table Lamp', quantity: 1, unit: 'pc', price: 78.00 },
        ],
    },
    {
        orderId: 'SW1019',
        status: 'Delivered' as const,
        date: 'Mar 05, 2026',
        items: [
            { name: 'Organic Skin Serum', quantity: 3, unit: 'bottles', price: 32.50 },
            { name: 'Vitamin C Face Wash', quantity: 1, unit: 'bottle', price: 18.00 },
            { name: 'Moisturizing Cream', quantity: 2, unit: 'jars', price: 24.00 },
            { name: 'Cotton Face Pads', quantity: 1, unit: 'pack', price: 6.99 },
        ],
    },
    {
        orderId: 'SW1012',
        status: 'Cancelled' as const,
        date: 'Feb 28, 2026',
        items: [
            { name: 'Noise Cancelling Headset', quantity: 1, unit: 'pc', price: 199.99 },
            { name: 'Headphone Stand', quantity: 1, unit: 'pc', price: 29.99 },
        ],
    },
];

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
                <Text className="text-2xl font-bold text-slate-900 font-outfit">{t.myOrders}</Text>
                <Text className="text-slate-400 text-sm font-inter mt-1">
                    {DUMMY_ORDERS.length} {t.ordersPlaced}
                </Text>
            </View>

            {/* Orders List */}
            {DUMMY_ORDERS.map((order) => (
                <OrderCard key={order.orderId} {...order} />
            ))}

            {/* Bottom Spacer */}
            <View className="h-8" />
        </HomeLayout>
    );
}
