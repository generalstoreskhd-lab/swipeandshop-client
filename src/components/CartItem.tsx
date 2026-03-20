import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

export interface CartItemProps {
    id: string;
    name: string;
    price: number;
    imageUri: string;
    quantity: number;
    size?: string;
    color?: string;
    onUpdateQuantity?: (id: string, newQuantity: number) => void;
    onRemove?: (id: string) => void;
}

/**
 * CartItem Component
 * 
 * Renders a single item in the shopping cart with:
 * - Product image, name, and attributes (size/color)
 * - Price per item
 * - Quantity selector (+/- buttons)
 * - Remove action
 */
export default function CartItem({
    id,
    name,
    price,
    imageUri,
    quantity,
    size,
    color,
    onUpdateQuantity,
    onRemove,
}: CartItemProps) {
    return (
        <View className="flex-row items-center bg-white rounded-2xl p-3 mb-3 border border-slate-100 shadow-sm">
            {/* Product Image */}
            <View className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden mr-3">
                <Image
                    source={{ uri: imageUri }}
                    className="w-full h-full"
                    contentFit="cover"
                />
            </View>

            {/* Product Info */}
            <View className="flex-1 mr-2">
                <Text className="text-sm font-bold text-slate-900 font-outfit" numberOfLines={1}>
                    {name}
                </Text>
                <View className="flex-row items-center gap-x-2 mt-0.5">
                    {size && (
                        <Text className="text-[11px] text-slate-400 font-inter">
                            Size: <Text className="text-slate-600 font-medium">{size}</Text>
                        </Text>
                    )}
                    {color && (
                        <Text className="text-[11px] text-slate-400 font-inter">
                            Color: <Text className="text-slate-600 font-medium">{color}</Text>
                        </Text>
                    )}
                </View>
                <Text className="text-sm font-bold text-blue-600 font-outfit mt-2">
                    ${price.toFixed(2)}
                </Text>
            </View>

            {/* Controls */}
            <View className="items-end gap-y-3">
                <TouchableOpacity onPress={() => onRemove?.(id)}>
                    <Ionicons name="trash-outline" size={18} color="#94a3b8" />
                </TouchableOpacity>

                {/* Quantity Selector */}
                <View className="flex-row items-center bg-slate-50 rounded-full px-2 py-1 border border-slate-100">
                    <TouchableOpacity 
                        onPress={() => onUpdateQuantity?.(id, Math.max(1, quantity - 1))}
                        className="w-6 h-6 items-center justify-center"
                    >
                        <Ionicons name="remove" size={14} color="#64748b" />
                    </TouchableOpacity>
                    
                    <Text className="mx-2 text-xs font-bold text-slate-900 font-inter w-4 text-center">
                        {quantity}
                    </Text>
                    
                    <TouchableOpacity 
                        onPress={() => onUpdateQuantity?.(id, quantity + 1)}
                        className="w-6 h-6 items-center justify-center"
                    >
                        <Ionicons name="add" size={14} color="#64748b" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
