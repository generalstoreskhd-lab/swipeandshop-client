import React from "react";
import { View } from "react-native";
import BrowseProducts from "../components/BrowseProducts";
import CategoryList from "../components/CategoryList";
import NewArrivals from "../components/NewArrivals";
import { PromoCard } from "../components/PromoCard";
import HomeLayout from "../layouts/HomeLayout";

import { useAppSelector } from "../store/hooks";

/**
 * HomeScreen Component
 * The app's landing page. Composes several sections:
 * 1. **CategoryList** — Horizontally scrollable category icons
 * 2. **PromoCard** — Seasonal sale banner (hidden when logged in)
 * 3. **NewArrivals** — 2-column product grid
 * 4. **BrowseProducts** — Full vertical product list with sorting
 *
 * During search, only BrowseProducts is shown to display results.
 */
export default function HomeScreen() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const searchQuery = useAppSelector((state) => state.products.searchQuery);
    const isSearching = searchQuery.length > 0;

    return (
        <HomeLayout>
            {!isSearching && (
                <>
                    <CategoryList />
                    {!isLoggedIn && (
                        <View className="w-full px-4 mt-4">
                            <PromoCard />
                        </View>
                    )}
                    <NewArrivals />
                </>
            )}
            <BrowseProducts />
        </HomeLayout>
    );
}