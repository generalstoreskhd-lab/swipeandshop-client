import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSortOrder } from "../store/slices/productsSlice";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

/**
 * BrowseProducts Component
 * Displays a sortable vertical list of all products (filtered by category and search query).
 * Uses local state to simulate a "loading" skeleton effect on every keystroke.
 */
export default function BrowseProducts() {
    const dispatch = useAppDispatch();
    const allProducts = useAppSelector((state) => state.products.items);
    const selectedCategory = useAppSelector((state) => state.products.selectedCategory);
    const searchQuery = useAppSelector((state) => state.products.searchQuery);
    const sortOrder = useAppSelector((state) => state.products.sortOrder);

    const [isSearching, setIsSearching] = useState(false);

    // Simulate a brief loading state when the search query changes
    useEffect(() => {
        if (searchQuery.length > 0) {
            setIsSearching(true);
            const timer = setTimeout(() => setIsSearching(false), 300);
            return () => clearTimeout(timer);
        } else {
            setIsSearching(false);
        }
    }, [searchQuery]);

    // Apply Filter (Category + Search Query)
    let filteredProducts = allProducts.filter(p => {
        const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
        const matchesSearch = searchQuery.length > 0 
            ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) 
            : true;
        return matchesCategory && matchesSearch;
    });

    // Apply Sorting
    let displayedProducts = [...filteredProducts];
    if (sortOrder === 'price-asc') {
        displayedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
        displayedProducts.sort((a, b) => b.price - a.price);
    }

    const toggleSort = () => {
        if (sortOrder === 'none') dispatch(setSortOrder('price-asc'));
        else if (sortOrder === 'price-asc') dispatch(setSortOrder('price-desc'));
        else dispatch(setSortOrder('none'));
    };

    return (
        <View className="w-full mt-10 px-4 pb-20">
            <View className="flex flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold text-slate-900 font-outfit">
                    {searchQuery.length > 0 ? `Results for "${searchQuery}"` : (selectedCategory ? `${selectedCategory} Collection` : "Browse All Products")}
                </Text>
                
                <TouchableOpacity 
                    onPress={toggleSort}
                    className="flex-row items-center bg-slate-100 px-3 py-1.5 rounded-full"
                >
                    <Ionicons 
                        name={sortOrder === 'none' ? "swap-vertical" : (sortOrder === 'price-asc' ? "arrow-up" : "arrow-down")} 
                        size={16} 
                        color="#475569" 
                    />
                    <Text className="text-slate-600 font-semibold text-xs font-inter ml-1.5">
                        {sortOrder === 'none' ? "Sort" : (sortOrder === 'price-asc' ? "Price: Low-High" : "Price: High-Low")}
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row flex-wrap justify-between">
                {isSearching ? (
                    // Show 4 skeletons during "searching" effect
                    [1, 2, 3, 4].map((i) => <ProductSkeleton key={i} />)
                ) : (
                    displayedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            category={product.category.toUpperCase()}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                        />
                    ))
                )}
            </View>
            
            {!isSearching && displayedProducts.length === 0 && (
                <View className="py-20 items-center justify-center">
                    <View className="w-16 h-16 bg-slate-50 rounded-full items-center justify-center mb-4">
                        <Ionicons name="search-outline" size={32} color="#cbd5e1" />
                    </View>
                    <Text className="text-slate-400 font-inter italic text-center">No products match your search. Try a different term.</Text>
                </View>
            )}
        </View>
    );
}
