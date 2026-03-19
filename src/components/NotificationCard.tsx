import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

/**
 * Notification types supported by the card.
 * Each type maps to a distinct icon and color scheme.
 */
export type NotificationType = 'order' | 'wishlist' | 'promo' | 'system';

/** Optional action button rendered at the bottom of the card */
export interface NotificationAction {
    label: string;
    /** 'primary' renders a filled button; 'secondary' renders a text-only button */
    variant?: 'primary' | 'secondary';
    onPress?: () => void;
}

/** Optional product thumbnail (e.g. for wishlist price-drop notifications) */
export interface NotificationProduct {
    name: string;
    imageUri: string;
    currentPrice: number;
    originalPrice?: number;
}

export interface NotificationCardProps {
    type: NotificationType;
    title: string;
    body: string;
    timeAgo: string;
    isRead: boolean;
    actions?: NotificationAction[];
    product?: NotificationProduct;
}

/**
 * Visual configuration per notification type.
 * Controls the icon circle color and the Ionicons glyph.
 */
const TYPE_CONFIG: Record<NotificationType, { bg: string; iconColor: string; icon: keyof typeof Ionicons.glyphMap }> = {
    order:    { bg: 'bg-blue-100',   iconColor: '#2563eb', icon: 'cube' },
    wishlist: { bg: 'bg-purple-100', iconColor: '#7c3aed', icon: 'trending-down' },
    promo:    { bg: 'bg-orange-100', iconColor: '#ea580c', icon: 'star' },
    system:   { bg: 'bg-emerald-100', iconColor: '#059669', icon: 'information-circle' },
};

/**
 * NotificationCard Component
 *
 * Renders a single notification entry with visual differentiation
 * between read and unread states:
 * - **Unread**: White bg, blue left border, subtle shadow
 * - **Read**: Slate-50 bg, no left border, no shadow
 *
 * Supports optional action buttons and a product thumbnail.
 */
export default function NotificationCard({
    type,
    title,
    body,
    timeAgo,
    isRead,
    actions,
    product,
}: NotificationCardProps) {
    const config = TYPE_CONFIG[type];

    return (
        <View
            className={`mx-4 mb-3 rounded-2xl overflow-hidden ${
                isRead
                    ? 'bg-slate-50 border border-slate-100'
                    : 'bg-white border-l-4 border-blue-600 shadow-sm'
            }`}
        >
            <View className="p-4">
                {/* Top Row: Icon + Title + Time */}
                <View className="flex-row items-start">
                    {/* Type Icon */}
                    <View className={`${config.bg} w-11 h-11 rounded-xl items-center justify-center mr-3`}>
                        <Ionicons name={config.icon} size={22} color={config.iconColor} />
                    </View>

                    {/* Title & Body */}
                    <View className="flex-1">
                        <View className="flex-row items-start justify-between mb-1">
                            <Text
                                className={`text-base font-bold font-outfit flex-1 mr-2 ${
                                    isRead ? 'text-slate-500' : 'text-slate-900'
                                }`}
                                numberOfLines={2}
                            >
                                {title}
                            </Text>
                            <Text className="text-[10px] font-bold text-blue-500 uppercase tracking-wider font-inter mt-0.5">
                                {timeAgo}
                            </Text>
                        </View>

                        <Text
                            className={`text-sm leading-5 font-inter ${
                                isRead ? 'text-slate-400' : 'text-slate-500'
                            }`}
                        >
                            {body}
                        </Text>
                    </View>
                </View>

                {/* Product Thumbnail (optional) */}
                {product && (
                    <View className="flex-row items-center mt-3 ml-14 bg-slate-50 rounded-xl p-2.5">
                        <View className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 mr-3">
                            <Image
                                source={{ uri: product.imageUri }}
                                className="w-full h-full"
                                contentFit="cover"
                            />
                        </View>
                        <View>
                            <Text className="text-sm font-bold text-slate-900 font-outfit" numberOfLines={1}>
                                {product.name}
                            </Text>
                            <View className="flex-row items-center gap-x-2">
                                <Text className="text-sm font-bold text-slate-900 font-outfit">
                                    ${product.currentPrice.toFixed(2)}
                                </Text>
                                {product.originalPrice && (
                                    <Text className="text-xs text-slate-400 line-through font-inter">
                                        ${product.originalPrice.toFixed(2)}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>
                )}

                {/* Action Buttons (optional) */}
                {actions && actions.length > 0 && (
                    <View className="flex-row items-center gap-x-3 mt-3 ml-14">
                        {actions.map((action, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={action.onPress}
                                className={`px-5 py-2.5 rounded-full ${
                                    action.variant === 'primary'
                                        ? 'bg-slate-900'
                                        : ''
                                }`}
                            >
                                <Text
                                    className={`text-xs font-bold font-inter ${
                                        action.variant === 'primary'
                                            ? 'text-white'
                                            : 'text-slate-600'
                                    }`}
                                >
                                    {action.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
}
