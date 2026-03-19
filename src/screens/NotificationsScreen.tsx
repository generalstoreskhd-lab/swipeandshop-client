import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeLayout from '../layouts/HomeLayout';
import NotificationCard, { NotificationCardProps } from '../components/NotificationCard';

/** Dummy notifications data with a mix of types and read/unread states */
const INITIAL_NOTIFICATIONS: NotificationCardProps[] = [
    {
        type: 'order',
        title: 'Order #8829\nShipped',
        body: 'Your Ethereal Silk Scarf has been dispatched and is on its way to your gallery. Track your delivery in real-time.',
        timeAgo: 'Just now',
        isRead: false,
        actions: [
            { label: 'Track\nPackage', variant: 'primary' },
            { label: 'View\nOrder', variant: 'secondary' },
        ],
    },
    {
        type: 'wishlist',
        title: 'Wishlist Price Drop',
        body: 'The "Marble Study No. 4" you saved has decreased in price by 15%. Grab it before it\'s gone.',
        timeAgo: '2h ago',
        isRead: false,
        product: {
            name: 'Marble Study No. 4',
            imageUri: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=120&q=80',
            currentPrice: 425.00,
            originalPrice: 500.00,
        },
    },
    {
        type: 'promo',
        title: "Exclusive Collector's Access",
        body: 'As a preferred merchant partner, you have early access to the Spring Curated Collection. Browse 40+ new pieces before they go live.',
        timeAgo: 'Yesterday',
        isRead: false,
        actions: [
            { label: 'Browse Collection', variant: 'primary' },
        ],
    },
    {
        type: 'order',
        title: 'Order #8815 Delivered',
        body: 'Your Artisan Vase Set has been delivered successfully. We hope you love it!',
        timeAgo: '2d ago',
        isRead: true,
        actions: [
            { label: 'Leave Review', variant: 'secondary' },
        ],
    },
    {
        type: 'system',
        title: 'Account Security Update',
        body: 'We\'ve enhanced our security protocols. Please review your account settings to enable two-factor authentication.',
        timeAgo: '3d ago',
        isRead: true,
    },
    {
        type: 'wishlist',
        title: 'Back in Stock',
        body: 'Great news! The "Coastal Breeze Canvas" is back in stock with limited availability. Don\'t miss out this time.',
        timeAgo: '5d ago',
        isRead: true,
    },
];

/**
 * NotificationsScreen
 *
 * Displays a scrollable list of notification cards with a "Mark all as read"
 * action in the header. Uses the shared HomeLayout with search hidden.
 */
export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const handleMarkAllRead = () => {
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, isRead: true }))
        );
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    return (
        <HomeLayout showSearch={false} showBadge={unreadCount > 0}>
            {/* Header */}
            <View className="px-4 pt-2 pb-4">
                <Text className="text-[10px] font-bold text-blue-500 uppercase tracking-widest font-inter mb-1">
                    Updates & Alerts
                </Text>
                <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-bold text-slate-900 font-outfit">
                        Notifications
                    </Text>
                    <View className="flex-row items-center gap-x-4">
                        {unreadCount > 0 && (
                            <TouchableOpacity onPress={handleMarkAllRead}>
                                <Text className="text-sm font-semibold text-blue-500 font-inter">
                                    Mark all as read
                                </Text>
                            </TouchableOpacity>
                        )}
                        {notifications.length > 0 && (
                            <TouchableOpacity onPress={handleClearAll}>
                                <Text className="text-sm font-semibold text-slate-400 font-inter">
                                    Clear all
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            {/* Notification List or Empty State */}
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <NotificationCard key={index} {...notification} />
                ))
            ) : (
                <View className="flex-1 items-center justify-center py-20 px-10">
                    <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center mb-6">
                        <Ionicons name="notifications-off-outline" size={48} color="#94a3b8" />
                    </View>
                    <Text className="text-xl font-bold text-slate-900 font-outfit text-center mb-2">
                        All caught up!
                    </Text>
                    <Text className="text-sm text-slate-500 font-inter text-center leading-5 mb-8">
                        You have no new notifications. We'll let you know when something exciting happens.
                    </Text>
                    <TouchableOpacity 
                        onPress={() => setNotifications(INITIAL_NOTIFICATIONS)}
                        className="bg-slate-900 px-8 py-3 rounded-full"
                    >
                        <Text className="text-white font-bold font-inter text-sm">
                            Restore Dummy Data
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Bottom Spacer */}
            <View className="h-8" />
        </HomeLayout>
    );
}
