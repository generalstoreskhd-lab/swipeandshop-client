import { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { Image } from 'expo-image';

import logo from "../assets/images/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigation/AppNavigator";

/**
 * Props for the Topbar component.
 * @property isLoggedIn - Determines whether to show the greeting or the brand logo
 * @property userName - User's name, displayed in the greeting when logged in
 * @property showSearch - Controls visibility of the search bar (default: true)
 */
interface TopbarProps {
    isLoggedIn: boolean;
    userName?: string;
    showSearch?: boolean;
    showBadge?: boolean;
}

/**
 * Topbar Component
 * The app's primary navigation header. Renders two layouts:
 * - **Logged-out**: Brand logo + "Swipe & Shop" title
 * - **Logged-in**: Personalized greeting with the user's name
 *
 * Always includes notification and cart action icons.
 * Optionally renders a search bar with live query state and a clear button.
 * Uses `z-[1000]` to stay above all stacked content (e.g., swipe cards).
 */
export default function Topbar({ isLoggedIn, userName, showSearch = true, showBadge = true }: TopbarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    
    // Check if we can go back and if we are on the Notifications screen
    const canGoBack = navigation.canGoBack();
    const routeName = useNavigationState((state) => state?.routes[state.index]?.name);
    const isNotifications = routeName === 'Notifications';

    return (
        <View className="w-full bg-white border-b border-slate-100 p-4 pt-8 z-[1000]">
            {/* First Row: Brand and Actions */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                    {canGoBack && isNotifications ? (
                        <Pressable 
                            onPress={() => navigation.goBack()}
                            className="p-2 bg-slate-50 rounded-full mr-3"
                        >
                            <Ionicons name="arrow-back" size={24} color="#1e293b" />
                        </Pressable>
                    ) : null}

                    {isLoggedIn ? (
                        <View className="flex-col">
                            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-inter">Welcome back</Text>
                            <Text className="text-xl font-bold text-slate-900 font-outfit">Hello {userName || 'User'}</Text>
                        </View>
                    ) : (
                        <View className="flex-row items-center flex-none">
                            <View className="w-12 h-12 rounded-xl items-center justify-center mr-3 overflow-hidden">
                                <Image
                                    source={logo}
                                    className="w-full h-full"
                                    contentFit="contain"
                                />
                            </View>

                            <View className="flex-col">
                                <Text className="text-lg font-bold text-slate-900 leading-tight font-outfit">Swipe & Shop</Text>
                            </View>
                        </View>
                    )}
                </View>

                <View className="flex-row items-center gap-x-3">
                    <Pressable 
                        onPress={() => navigation.navigate('Notifications')}
                        className="p-2 bg-slate-50 rounded-full relative"
                    >
                        <Ionicons name="notifications-outline" size={22} color="#1e293b" />
                        {showBadge && (
                            <View className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                        )}
                    </Pressable>
                    <View className="p-2 bg-slate-50 rounded-full">
                        <Ionicons name="cart-outline" size={22} color="#1e293b" />
                    </View>
                </View>
            </View>

            {/* Second Row: Search */}
            {showSearch && (
                <View className="flex-row items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">
                    <Ionicons name="search-outline" size={20} color="#64748b" />
                    <TextInput
                        placeholder="Search products..."
                        className="ml-3 flex-1 text-slate-900 text-sm font-medium font-inter"
                        placeholderTextColor="#94a3b8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => setSearchQuery("")} className="ml-2">
                            <Ionicons name="close-circle" size={18} color="#94a3b8" />
                        </Pressable>
                    )}
                </View>
            )}
        </View>
    );
}
