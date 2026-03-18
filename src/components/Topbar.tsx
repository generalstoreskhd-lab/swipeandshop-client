import { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { Image } from 'expo-image';

import logo from "../assets/images/logo.png";
import { Ionicons } from "@expo/vector-icons";

interface TopbarProps {
    isLoggedIn: boolean;
    userName?: string;
    showSearch?: boolean;
}

export default function Topbar({ isLoggedIn, userName, showSearch = true }: TopbarProps) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <View className="w-full bg-white border-b border-slate-100 p-4 pt-8">
            {/* First Row: Brand and Actions */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                    {isLoggedIn ? (
                        <View className="flex-col">
                            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Welcome back</Text>
                            <Text className="text-xl font-bold text-slate-900">Hello {userName || 'User'}</Text>
                        </View>
                    ) : (
                        <View className="flex-row items-center flex-none">
                            <View className="w-24 h-24 bg-slate-50 rounded-xl items-center justify-center mr-3 overflow-hidden">
                                <Image
                                    source={logo}
                                    className="w-full h-full"
                                    contentFit="contain"
                                />
                            </View>


                            <View className="flex-col">
                                <Text className="text-lg font-bold text-slate-900 leading-tight">Swipe & Shop</Text>
                            </View>
                        </View>

                    )}
                </View>

                <View className="flex-row items-center gap-x-3">
                    <View className="p-2 bg-slate-50 rounded-full">
                        <Ionicons name="notifications-outline" size={22} color="#1e293b" />
                    </View>
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
                        className="ml-3 flex-1 text-slate-900 text-sm font-medium"
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
