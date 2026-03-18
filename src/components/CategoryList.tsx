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