import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

/**
 * PromoCard Component
 * A visually rich promotional banner displayed on the HomeScreen.
 * Features a bold sale headline, subtitle, and a "SHOP NOW" CTA button.
 * Uses a decorative circular accent shape for depth.
 * Shown only when the user is not logged in (controlled by HomeScreen).
 */
export const PromoCard = () => {
    return (
        <View className="w-full bg-white/10 border border-white/15 rounded-[32px] overflow-hidden p-6 relative">
            <View className="z-10 gap-y-2">
                <Text className="text-3xl font-bold text-white leading-tight font-outfit">
                    Summer Sale{"\n"}Up to 50% Off
                </Text>
                
                <Text className="text-white/65 text-md mb-4 font-inter">
                    Discover our latest collections
                </Text>

                <TouchableOpacity 
                    className="bg-orange-500 px-6 py-3 rounded-[22px] self-start shadow-sm active:bg-orange-600"
                    activeOpacity={0.8}
                >
                    <Text className="text-white font-bold text-sm font-inter">SHOP NOW</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
