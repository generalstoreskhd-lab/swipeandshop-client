import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeLayout from '../layouts/HomeLayout';
import NotificationCard, { NotificationCardProps } from '../components/NotificationCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { markAllAsRead, clearAll, restoreDummyData } from '../store/slices/notificationsSlice';
import LoginRequired from '../components/LoginRequired';

/**
 * NotificationsScreen
 *
 * Displays a scrollable list of notification cards.
 * Updated to protect screen from guest users.
 */
export default function NotificationsScreen() {
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const notifications = useAppSelector((state) => state.notifications.items);

    if (!isLoggedIn) {
        return <LoginRequired />;
    }

    const unreadCount = notifications.filter((n: any) => !n.isRead).length;

    const handleMarkAllRead = () => {
        dispatch(markAllAsRead());
    };

    const handleClearAll = () => {
        dispatch(clearAll());
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
                notifications.map((notification: any, index: number) => (
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
                        onPress={() => dispatch(restoreDummyData())}
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
