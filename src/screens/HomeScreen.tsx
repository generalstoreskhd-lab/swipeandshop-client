import React from "react";
import { View } from "react-native";
import HomeLayout from "../layouts/HomeLayout";
import { PromoCard } from "../components/PromoCard";
import CategoryList from "../components/CategoryList";
import NewArrivals from "../components/NewArrivals";

import { useAppSelector } from "../store/hooks";

/**
 * HomeScreen Component
 * The app's landing page. Composes three sections:
 * 1. **CategoryList** — Horizontally scrollable category icons
 * 2. **PromoCard** — Seasonal sale banner (hidden when logged in)
 * 3. **NewArrivals** — 2-column product grid
 *
 * Wrapped in `HomeLayout` for consistent Topbar and scrolling behavior.
 */
export default function HomeScreen() {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);


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