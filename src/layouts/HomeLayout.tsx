import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Topbar from "../components/Topbar";

interface HomeLayoutProps {
    children: React.ReactNode;
    scrollable?: boolean;
    showSearch?: boolean;
    showBadge?: boolean;
}

/**
 * HomeLayout Component
 * A shared layout that provides a consistent Topbar and optional ScrollView.
 * It automatically handles Safe Area Insets and provides a standardized bottom padding.
 * 
 * @param scrollable - Whether the content should be wrapped in a ScrollView
 * @param showSearch - Whether to show the search bar in the Topbar
 */
export default function HomeLayout({ children, scrollable = true, showSearch = true, showBadge = true }: HomeLayoutProps) {
    const isLoggedIn = false; // Mock login state

    return (
        <SafeAreaView className="flex-1 w-full bg-slate-50" edges={['top']}>
            {scrollable ? (
                <View className="flex-1">
                    <ScrollView
                        className="w-full flex-1"
                        contentContainerStyle={{ paddingBottom: 100 }}
                        stickyHeaderIndices={[0]}
                    >
                        <Topbar isLoggedIn={isLoggedIn} showSearch={showSearch} showBadge={showBadge} />
                        {children}
                    </ScrollView>
                </View>
            ) : (
                <View className="flex-1 w-full">
                    <Topbar isLoggedIn={isLoggedIn} showSearch={showSearch} showBadge={showBadge} />
                    <View className="flex-1 w-full" style={{ paddingBottom: 100 }}>
                        {children}
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}
