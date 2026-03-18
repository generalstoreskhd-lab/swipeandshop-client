import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
    image: ImageSourcePropType;
    category: string;
    name: string;
    price: number;
    rating: number;
    onAddPress?: () => void;
}

export default function ProductCard({ image, category, name, price, rating, onAddPress }: ProductCardProps) {
    return (
        <View className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50 w-[48%] mb-4">
            {/* Image Container */}
            <View className="relative w-full aspect-square bg-slate-50">
                <Image 
                    source={image} 
                    className="w-full h-full"
                    resizeMode="cover"
                />
                {/* Wishlist Heart */}
                <TouchableOpacity className="absolute top-3 right-3 bg-white/80 p-2 rounded-full">
                    <Ionicons name="heart-outline" size={18} color="#64748b" />
                </TouchableOpacity>
            </View>

            {/* Content Container */}
            <View className="p-3 gap-y-1">
                <Text className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">{category}</Text>
                <Text className="text-slate-900 font-bold text-sm" numberOfLines={1}>{name}</Text>
                
                <View className="flex flex-row items-center justify-between mt-1">
                    <Text className="text-slate-900 font-bold text-md">${price.toFixed(2)}</Text>
                    <View className="flex flex-row items-center gap-x-1">
                        <Ionicons name="star" size={12} color="#fbbf24" />
                        <Text className="text-slate-400 text-[10px] font-medium">{rating}</Text>
                    </View>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity 
                    onPress={onAddPress}
                    className="bg-sky-200 py-2 rounded-xl mt-2 items-center active:bg-sky-300"
                >
                    <Text className="text-sky-600 font-bold text-xs">Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
