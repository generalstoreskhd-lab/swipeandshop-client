import React from "react";
import { View, ScrollView, Text } from "react-native";
import CategoryIcon from "./CategoryIcon";
import { Ionicons } from "@expo/vector-icons";

const categories: { name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { name: "Snacks", icon: "fast-food-outline" },
    { name: "Cereals & Grains", icon: "leaf-outline" },
    { name: "Stationary", icon: "pencil-outline" },
    { name: "Fruits & Veg", icon: "basket-outline" },
    { name: "Household", icon: "home-outline" },
];

/**
 * CategoryList Component
 * Renders a horizontally scrollable row of category icons on the HomeScreen.
 * Each category is represented by a `CategoryIcon` tile.
 * Includes a "Categories" header with a "See All" link.
 *
 * Categories are currently hardcoded; they will be fetched from an API in the future.
 */
export default function CategoryList() {
    return (
        <View className="w-full mt-6 px-4">
            <View className="flex flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-slate-900 font-outfit">Categories</Text>
                <Text className="text-sky-600 font-semibold text-sm font-inter">See All</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16 }}
            >
                {categories.map((category, index) => (
                    <CategoryIcon
                        key={index}
                        name={category.name}
                        icon={category.icon}
                    />
                ))}
            </ScrollView>
        </View>
    );
}