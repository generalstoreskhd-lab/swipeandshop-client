import { Image, Text, View, TextInput } from "react-native";
import logo from "../assets/images/logo.png";
import { Ionicons } from "@expo/vector-icons";

interface TopbarProps {
    isLoggedIn: boolean;
    userName?: string;
}

export default function Topbar({ isLoggedIn, userName }: TopbarProps) {

    return (
        <View className="w-full flex flex-col p-4 pt-8 border-b border-slate-100 bg-white gap-y-4">
            {/* First Row: Logo/User Info and Action Icons */}
            <View className="flex flex-row items-center justify-between">
                <View className="flex-1">
                    {
                        isLoggedIn ? (
                            <View className="flex flex-col items-start justify-center">
                                <Text className="text-xl text-slate-500">Welcome back</Text>
                                <Text className="text-2xl font-bold text-slate-900">Hello {userName}</Text>
                            </View>
                        ) : (
                            <Image
                                source={logo}
                                resizeMode="contain"
                                accessibilityLabel="brand-logo"
                                className="h-24 w-24" />
                        )
                    }
                </View>

                <View className="flex flex-row items-center gap-x-4">
                    <Ionicons name="notifications-outline" size={28} color="black" />
                    <Ionicons name="cart-outline" size={28} color="black" />
                </View>
            </View>

            {/* Second Row: Search Bar */}
            <View className="flex flex-row items-center bg-slate-50 rounded-full px-4 py-2 border border-slate-200 text-slate-500">
                <Ionicons name="search-outline" size={20} color="#64748b" />
                <TextInput
                    placeholder="Search products..."
                    className="ml-2 flex-1 text-slate-900 text-sm"
                    placeholderTextColor="#94a3b8"
                />
            </View>

        </View>
    );
}