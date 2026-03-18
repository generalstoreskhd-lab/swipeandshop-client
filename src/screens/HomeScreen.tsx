import React from "react";
import Topbar from "../components/Topbar";
import { View, ScrollView } from "react-native";
import { PromoCard } from "../components/PromoCard";
import CategoryList from "../components/CategoryList";
import NewArrivals from "../components/NewArrivals";

export default function HomeScreen() {
    // Using isLoggedIn=true as default for the home screen post-login
    const isLoggedIn = true;
    const userName = "Sreerag";

    return (
        <View className="flex-1 w-full bg-slate-50">
            <ScrollView className="w-full flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
                <Topbar isLoggedIn={isLoggedIn} userName={userName} />
                <CategoryList />
                <NewArrivals />
                {!isLoggedIn && (
                    <View className="w-full px-4 mt-4">
                        <PromoCard />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}