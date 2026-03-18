import React from "react";
import { View, ScrollView } from "react-native";
import Topbar from "../components/Topbar";

interface HomeLayoutProps {
    children: React.ReactNode;
    scrollable?: boolean;
    showSearch?: boolean;
}

export default function HomeLayout({ children, scrollable = true, showSearch = true }: HomeLayoutProps) {
    const isLoggedIn = false; // This can be moved to a context later

    return (
        <View className="flex-1 w-full bg-slate-50">
            {scrollable ? (
                <ScrollView
                    className="w-full flex-1"
                    contentContainerStyle={{ paddingBottom: 100 }}
                    stickyHeaderIndices={[0]}
                >
                    <Topbar isLoggedIn={isLoggedIn} showSearch={showSearch} />
                    {children}
                </ScrollView>
            ) : (
                <View className="flex-1 w-full">
                    <Topbar isLoggedIn={isLoggedIn} showSearch={showSearch} />
                    <View className="flex-1 w-full" style={{ paddingBottom: 100 }}>
                        {children}
                    </View>
                </View>
            )}
        </View>
    );
}
