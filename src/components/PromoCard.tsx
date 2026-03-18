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
        <View className="w-full bg-sky-300 rounded-2xl overflow-hidden p-6 relative">
            {/* Background Accent Shape */}
            <View 
                className="absolute right-[-20] top-[-20] w-48 h-48 bg-sky-400 rounded-full opacity-30" 
                style={{ transform: [{ scale: 1.2 }] }}
            />
            
            <View className="z-10 gap-y-2">
                <Text className="text-3xl font-bold text-slate-600 leading-tight font-outfit">
                    Summer Sale{"\n"}Up to 50% Off
                </Text>
                
                <Text className="text-slate-500 text-md mb-4 font-inter">
                    Discover our latest collections
                </Text>

                <TouchableOpacity 
                    className="bg-white px-6 py-3 rounded-xl self-start shadow-sm"
                    activeOpacity={0.8}
                >
                    <Text className="text-sky-500 font-bold text-sm font-inter">SHOP NOW</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
