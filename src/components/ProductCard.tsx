import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageSourcePropType } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
    image: ImageSourcePropType;
    category: string;
    name: string;
    price: number;
    rating: number;
    unit?: string;
    onAddPress?: (quantity: number) => void;
}

export default function ProductCard({ image, category, name, price, rating, unit = "pc", onAddPress }: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);

    return (
        <View className="bg-white/10 rounded-[28px] overflow-hidden shadow-sm border border-white/15 w-[48%] mb-4">
            {/* Image Container */}
            <View className="relative w-full aspect-square bg-black/35 p-3">
                <Image
                    source={image}
                    className="w-full h-full"
                    resizeMode="contain"
                />

                {/* Wishlist Heart */}
                <TouchableOpacity className="absolute top-3 right-3 bg-white/10 border border-white/15 p-2 rounded-full">
                    <Ionicons name="heart-outline" size={18} color="#ffffff" />
                </TouchableOpacity>
            </View>

            {/* Content Container */}
            <View className="p-3 gap-y-1">
                <Text className="text-[10px] font-bold text-orange-300 uppercase tracking-wider font-inter">{category}</Text>
                <Text className="text-white font-bold text-sm font-outfit" numberOfLines={1}>{name}</Text>

                <View className="flex flex-row items-center justify-between mt-1">
                    <Text className="text-white font-bold text-md font-outfit">${price.toFixed(2)}</Text>
                    <View className="flex flex-row items-center gap-x-1">
                        <Ionicons name="star" size={12} color="#fbbf24" />
                        <Text className="text-white/55 text-[10px] font-medium font-inter">{rating}</Text>
                    </View>
                </View>

                {/* Quantity Row */}
                <View className="flex flex-row items-center justify-between mt-2 bg-black/35 border border-white/10 rounded-2xl px-2 py-1.5">
                    <View className="flex flex-row items-center gap-x-1.5">
                        <TouchableOpacity
                            onPress={() => setQuantity(q => Math.max(1, q - 1))}
                            className="bg-white/10 w-7 h-7 rounded-lg items-center justify-center shadow-sm"
                        >
                            <Ionicons name="remove" size={14} color="#ffffff" />
                        </TouchableOpacity>
                        <Text className="text-white font-bold text-sm font-outfit w-5 text-center">{quantity}</Text>
                        <TouchableOpacity
                            onPress={() => setQuantity(q => Math.min(10, q + 1))}
                            className="bg-white/10 w-7 h-7 rounded-lg items-center justify-center shadow-sm"
                        >
                            <Ionicons name="add" size={14} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-white/45 text-[10px] font-bold font-inter uppercase">{unit}</Text>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity
                    onPress={() => onAddPress?.(quantity)}
                    className="bg-orange-500 py-2 rounded-2xl mt-2 items-center active:bg-orange-600"
                >
                    <Text className="text-white font-bold text-xs font-inter">Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
