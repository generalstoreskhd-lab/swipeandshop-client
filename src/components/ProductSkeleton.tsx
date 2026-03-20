import React from 'react';
import { View } from 'react-native';

/**
 * ProductSkeleton Component
 * Renders a placeholder card to simulate a loading ProductCard.
 * Uses slate-100/200 backgrounds to create a subtle shimmer effect.
 */
export default function ProductSkeleton() {
    return (
        <View className="w-[48%] bg-white rounded-3xl overflow-hidden mb-6 border border-slate-100 shadow-sm opacity-60">
            {/* Image Placeholder */}
            <View className="w-full aspect-square bg-slate-100 items-center justify-center">
                <View className="w-12 h-12 bg-slate-200 rounded-full" />
            </View>
            
            {/* Content Placeholder */}
            <View className="p-4 gap-y-2">
                <View className="w-16 h-3 bg-slate-100 rounded-full" />
                <View className="w-full h-4 bg-slate-200 rounded-full" />
                <View className="flex-row justify-between items-center mt-2">
                    <View className="w-12 h-5 bg-slate-100 rounded-full" />
                    <View className="w-8 h-4 bg-slate-50 rounded-full" />
                </View>
            </View>
        </View>
    );
}
