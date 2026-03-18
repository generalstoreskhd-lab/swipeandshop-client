import React from "react";
import { View } from "react-native";
import HomeLayout from "../layouts/HomeLayout";
import { PromoCard } from "../components/PromoCard";
import CategoryList from "../components/CategoryList";
import NewArrivals from "../components/NewArrivals";

export default function HomeScreen() {

    const isLoggedIn = false;


    return (
        <HomeLayout>
            <CategoryList />
            {!isLoggedIn && (
                <View className="w-full px-4 mt-4">
                    <PromoCard />
                </View>
            )}
            <NewArrivals />
        </HomeLayout>
    );
}