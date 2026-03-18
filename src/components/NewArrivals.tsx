import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import ProductCard from "./ProductCard";

// Import images
import earbuds from "../assets/images/products/earbuds.png"
import shirt from "../assets/images/products/shirt.png"
import lamp from "../assets/images/products/lamp.png"
import serum from "../assets/images/products/serum.png"


const products = [
    {
        id: "1",
        image: earbuds,
        category: "ELECTRONICS",
        name: "Wireless Earbuds Pro",
        price: 129.00,
        rating: 4.8
    },
    {
        id: "2",
        image: shirt,
        category: "FASHION",
        name: "Minimalist Linen Shirt",
        price: 45.00,
        rating: 4.5
    },
    {
        id: "3",
        image: lamp,
        category: "HOME",
        name: "Ceramic Table Lamp",
        price: 78.00,
        rating: 4.9
    },
    {
        id: "4",
        image: serum,
        category: "BEAUTY",
        name: "Organic Skin Serum",
        price: 32.50,
        rating: 4.7
    }
];

/**
 * NewArrivals Component
 * Displays a 2-column grid of `ProductCard` components on the HomeScreen.
 * Shows a "New Arrivals" header with a "See All" link.
 * Products are currently hardcoded; they will be fetched from an API in the future.
 */
export default function NewArrivals() {
    return (
        <View className="w-full mt-8 px-4">
            <View className="flex flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold text-slate-900 font-outfit">New Arrivals</Text>
                <TouchableOpacity>
                    <Text className="text-sky-600 font-semibold text-sm font-inter">See All</Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row flex-wrap justify-between">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        image={product.image}
                        category={product.category}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                    />
                ))}
            </View>
        </View>
    );
}
