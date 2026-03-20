import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import CategoryIcon from "./CategoryIcon";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCategory } from "../store/slices/productsSlice";

const categories: { name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { name: "Snacks", icon: "fast-food-outline" },
    { name: "Cereals & Grains", icon: "leaf-outline" },
    { name: "Stationary", icon: "pencil-outline" },
    { name: "Fruits & Veg", icon: "basket-outline" },
    { name: "Household", icon: "home-outline" },
    { name: "Beverages", icon: "beer-outline" },
    { name: "Personal Care", icon: "sparkles-outline" },
    { name: "Pet Care", icon: "paw-outline" },
    { name: "Baby Care", icon: "happy-outline" },
    { name: "Meat & Fish", icon: "restaurant-outline" },
];

/**
 * CategoryList Component
 * Renders category icons on the HomeScreen.
 * Can toggle between a horizontally scrollable row and a multi-row grid.
 * Updates the global product category filter in Redux when a category is pressed.
 */
export default function CategoryList() {
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector((state) => state.products.selectedCategory);

    const handleCategoryPress = (categoryName: string) => {
        // Toggle category: if already selected, clear it
        if (selectedCategory === categoryName) {
            dispatch(setCategory(null));
        } else {
            dispatch(setCategory(categoryName));
        }
    };

    return (
        <View className="w-full mt-6 px-4">
            <View className="flex flex-row justify-between items-center mb-4">
                <View className="flex-row items-center gap-x-2">
                    <Text className="text-lg font-bold text-slate-900 font-outfit">Categories</Text>
                    {selectedCategory && (
                        <View className="bg-sky-100 px-2 py-0.5 rounded-full">
                            <Text className="text-[10px] font-bold text-sky-700 uppercase font-inter">{selectedCategory}</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <Text className="text-sky-600 font-semibold text-sm font-inter">
                        {isExpanded ? "Show Less" : "See All"}
                    </Text>
                </TouchableOpacity>
            </View>

            {isExpanded ? (
                <View className="flex flex-row flex-wrap justify-between gap-y-6">
                    {categories.map((category, index) => (
                        <TouchableOpacity 
                            key={index} 
                            className={`w-[30%] items-center rounded-2xl p-2 ${selectedCategory === category.name ? 'bg-sky-50 border border-sky-100' : ''}`}
                            onPress={() => handleCategoryPress(category.name)}
                        >
                            <CategoryIcon
                                name={category.name}
                                icon={category.icon}
                            />
                        </TouchableOpacity>
                    ))}
                    {/* Spacer to align last row if uneven */}
                    {categories.length % 3 !== 0 && (
                         <View className="w-[30%]" />
                    )}
                </View>
            ) : (
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 16 }}
                    >
                        {categories.map((category, index) => (
                            <TouchableOpacity 
                                key={index}
                                className={`rounded-2xl p-1 ${selectedCategory === category.name ? 'bg-sky-50 border border-sky-100' : ''}`}
                                onPress={() => handleCategoryPress(category.name)}
                            >
                                <CategoryIcon
                                    name={category.name}
                                    icon={category.icon}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}