import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../store/hooks";
import ProductCard from "./ProductCard";

/**
 * NewArrivals Component
 * Displays a 2-column grid of `ProductCard` components on the HomeScreen.
 * Connects to Redux to display products filtered by the currently selected category.
 * Can toggle between showing a few items and all items.
 */
export default function NewArrivals() {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Get products and filter from Redux
    const allProducts = useAppSelector((state) => state.products.items);
    const selectedCategory = useAppSelector((state) => state.products.selectedCategory);
    
    // Filter products based on category
    const filteredProducts = selectedCategory 
        ? allProducts.filter(p => p.category === selectedCategory)
        : allProducts;

    // Show only 4 products initially, all when expanded
    const displayedProducts = isExpanded ? filteredProducts : filteredProducts.slice(0, 4);

    if (filteredProducts.length === 0) {
        return null; // Don't show the section if no products match
    }

    return (
        <View className="w-full mt-8 px-4">
            <View className="flex flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold text-slate-900 font-outfit">New Arrivals</Text>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <Text className="text-sky-600 font-semibold text-sm font-inter">
                        {isExpanded ? "Show Less" : "See All"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row flex-wrap justify-between">
                {displayedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        image={product.image}
                        category={product.category.toUpperCase()}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                    />
                ))}
            </View>
        </View>
    );
}
