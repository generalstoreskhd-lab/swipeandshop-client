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
        <View className="flex-row items-center bg-white/10 rounded-[24px] p-3 mb-3 border border-white/15 shadow-sm">
            {/* Product Image */}
            <View className="w-20 h-20 bg-black/35 rounded-xl overflow-hidden mr-3">
                <Image
                    source={{ uri: imageUri }}
                    className="w-full h-full"
                    contentFit="cover"
                />
            </View>

            {/* Product Info */}
            <View className="flex-1 mr-2">
                <Text className="text-sm font-bold text-white font-outfit" numberOfLines={1}>
                    {name}
                </Text>
                <View className="flex-row items-center gap-x-2 mt-0.5">
                    {size && (
                        <Text className="text-[11px] text-white/45 font-inter">
                            Size: <Text className="text-white/70 font-medium">{size}</Text>
                        </Text>
                    )}
                    {color && (
                        <Text className="text-[11px] text-white/45 font-inter">
                            Color: <Text className="text-white/70 font-medium">{color}</Text>
                        </Text>
                    )}
                </View>
                <Text className="text-sm font-bold text-orange-300 font-outfit mt-2">
                    ${price.toFixed(2)}
                </Text>
            </View>

            {/* Controls */}
            <View className="items-end gap-y-3">
                <TouchableOpacity onPress={() => onRemove?.(id)}>
                    <Ionicons name="trash-outline" size={18} color="#ffffff99" />
                </TouchableOpacity>

                {/* Quantity Selector */}
                <View className="flex-row items-center bg-black/35 rounded-full px-2 py-1 border border-white/10">
                    <TouchableOpacity 
                        onPress={() => onUpdateQuantity?.(id, Math.max(1, quantity - 1))}
                        className="w-6 h-6 items-center justify-center"
                    >
                        <Ionicons name="remove" size={14} color="#ffffff" />
                    </TouchableOpacity>
                    
                    <Text className="mx-2 text-xs font-bold text-white font-inter w-4 text-center">
                        {quantity}
                    </Text>
                    
                    <TouchableOpacity 
                        onPress={() => onUpdateQuantity?.(id, quantity + 1)}
                        className="w-6 h-6 items-center justify-center"
                    >
                        <Ionicons name="add" size={14} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
