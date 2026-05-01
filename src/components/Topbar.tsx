import { Image, Pressable, Text, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import logo from "../assets/images/logo.png";
import { AppStackParamList } from "../navigation/AppNavigator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearchQuery } from "../store/slices/productsSlice";

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
 * The app's primary navigation header. Renders brand logo/greeting and notification/cart icons.
 * Features a global search bar connected to Redux for real-time product filtering.
 */
export default function Topbar({ isLoggedIn, userName: propUserName, showSearch = true, showBadge = true }: TopbarProps) {
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector((state) => state.products.searchQuery);
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    
    const user = useAppSelector((state) => state.auth.user);
    const userName = propUserName || (user?.name && user.name !== 'User' ? user.name : user?.phone) || 'User';
    const displayName = userName.split(' ')[0];

    // Navigation state helpers
    const canGoBack = navigation.canGoBack();
    const routeName = useNavigationState((state) => state?.routes[state.index]?.name);
    const isNotifications = routeName === 'Notifications';
    const isCart = routeName === 'Cart';

    return (
        <View className="w-full bg-black/35 border-b border-white/10 p-4 pt-8 z-[1000]">
            {/* First Row: Brand and Actions */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                    {canGoBack && (isNotifications || isCart) ? (
                        <Pressable 
                            onPress={() => navigation.goBack()}
                            className="p-2 bg-white/10 border border-white/10 rounded-full mr-3"
                        >
                            <Ionicons name="arrow-back" size={24} color="#ffffff" />
                        </Pressable>
                    ) : null}

                    {isLoggedIn ? (
                        <View className="flex-row items-center flex-none">
                            <View className="w-12 h-12 items-center justify-center mr-3 overflow-hidden">
                                <Image
                                    source={logo}
                                    style={{ width: 48, height: 48 }}
                                    resizeMode="contain"
                                />
                            </View>
                            <View className="flex-col">
                                <Text className="text-[10px] font-bold text-orange-300 uppercase tracking-widest font-inter">Welcome back</Text>
                                <Text className="text-xl font-bold text-white font-outfit">Hello, {displayName}</Text>
                            </View>
                        </View>
                    ) : (
                        <View className="flex-row items-center flex-none">
                            <View className="w-12 h-12 items-center justify-center mr-3 overflow-hidden">
                                <Image
                                    source={logo}
                                    style={{ width: 48, height: 48 }}
                                    resizeMode="contain"
                                />
                            </View>

                            <View className="flex-col">
                                <Text className="text-lg font-bold text-white leading-tight font-outfit">Swipe & Shop</Text>
                            </View>
                        </View>
                    )}
                </View>

                <View className="flex-row items-center gap-x-3">
                    <Pressable 
                        onPress={() => navigation.navigate('Notifications')}
                        className="p-2 bg-white/10 border border-white/10 rounded-full relative"
                    >
                        <Ionicons name="notifications-outline" size={22} color="#ffffff" />
                        {showBadge && (
                            <View className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-black" />
                        )}
                    </Pressable>
                    <Pressable 
                        onPress={() => navigation.navigate('Cart')}
                        className="p-2 bg-white/10 border border-white/10 rounded-full"
                    >
                        <Ionicons name="cart-outline" size={22} color="#ffffff" />
                    </Pressable>
                </View>
            </View>

            {/* Second Row: Search */}
            {showSearch && (
                <View className="flex-row items-center bg-white/10 rounded-[24px] px-4 py-3 border border-white/15 shadow-inner">
                    <Ionicons name="search-outline" size={20} color="#fb923c" />
                    <TextInput
                        placeholder="Search products..."
                        className="ml-3 flex-1 text-white text-sm font-medium font-inter h-full"
                        placeholderTextColor="#ffffff99"
                        value={searchQuery}
                        onChangeText={(text) => dispatch(setSearchQuery(text))}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => dispatch(setSearchQuery(""))} className="ml-2">
                            <Ionicons name="close-circle" size={18} color="#ffffff99" />
                        </Pressable>
                    )}
                </View>
            )}
        </View>
    );
}
