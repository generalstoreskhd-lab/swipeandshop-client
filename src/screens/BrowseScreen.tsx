import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SwipeDeck, { SwipeDeckRef } from '../components/SwipeDeck';
import HomeLayout from '../layouts/HomeLayout';

// Import images

const SWIPE_PRODUCTS: any[] = [];

import LoginRequired from '../components/LoginRequired';
import { translations } from '../constants/translations';
import { useAppSelector } from '../store/hooks';

/**
 * BrowseScreen Component
 * The main discovery interface of the app.
 * It integrates the SwipeDeck with mock product data and provides manual controls.
 * Handles the 'Empty' state when all products have been swiped.
 */
export default function BrowseScreen() {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const { language } = useAppSelector((state) => state.settings);

    if (!isLoggedIn) {
        return <LoginRequired />;
    }
    
    const t = translations[language];

    /** Track the current product being viewed */
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const isEmpty = currentIndex >= SWIPE_PRODUCTS.length;

    /** Reference to SwipeDeck to trigger manual swipes from bottom buttons */
    const deckRef = React.useRef<SwipeDeckRef>(null);

    /**
     * Logic for handling a 'Liked' product.
     * In a real app, this would call a backend API or update a global store.
     */
    const handleSwipeRight = (product: any) => {
        console.log('Liked:', product.name);
        setCurrentIndex(prev => prev + 1);
    };

    /**
     * Logic for handling a 'Passed' (disliked) product.
     */
    const handleSwipeLeft = (product: any) => {
        console.log('Passed:', product.name);
        setCurrentIndex(prev => prev + 1);
    };

    return (
        <HomeLayout scrollable={false} showSearch={false}>
            <View className="flex-1 bg-slate-50 relative">
                {/* Swipe Area - Takes full space for perfect vertical centering */}
                <View className="flex-1 items-center justify-center ">
                    {!isEmpty ? (
                        <>
                            <SwipeDeck
                                ref={deckRef}
                                data={SWIPE_PRODUCTS}
                                currentIndex={currentIndex}
                                onSwipeRight={handleSwipeRight}
                                onSwipeLeft={handleSwipeLeft}
                            />
                            {/* Bottom Controls - Moved inside the !isEmpty block for guaranteed hiding */}
                            <View className="absolute bottom-[-40] left-0 right-0 flex flex-row justify-center gap-x-12 px-6">
                                <TouchableOpacity
                                    onPress={() => deckRef.current?.swipeLeft()}
                                    className="bg-white w-20 h-20 rounded-full shadow-xl border border-slate-100 items-center justify-center active:bg-slate-50"
                                >
                                    <Ionicons name="close" size={40} color="#f43f5e" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => deckRef.current?.swipeRight()}
                                    className="bg-white w-20 h-20 rounded-full shadow-xl border border-slate-100 items-center justify-center active:bg-slate-50"
                                >
                                    <Ionicons name="cart" size={40} color="#10b981" />
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <View className="flex-1 items-center justify-center p-10">
                            <View className="bg-white p-8 rounded-full shadow-sm mb-6">
                                <Ionicons name="sparkles" size={60} color="#0ea5e9" />
                            </View>
                            <Text className="text-2xl font-bold text-slate-900 font-outfit text-center mb-2">
                                {t.seenEverything}
                            </Text>
                            <Text className="text-slate-500 font-inter text-center mb-8">
                                {t.noMoreProducts}
                            </Text>
                            <TouchableOpacity
                                className="bg-sky-500 px-8 py-4 rounded-2xl shadow-lg active:bg-sky-600"
                                onPress={() => setCurrentIndex(0)}
                            >
                                <Text className="text-white font-bold font-inter text-lg">{t.restartDiscovery}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </HomeLayout>
    );
}
