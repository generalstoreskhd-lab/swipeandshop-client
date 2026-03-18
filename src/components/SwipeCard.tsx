import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Dimensions for the swipe cards. 
 * We use 90% of screen width and 65% of screen height for a premium aspect ratio.
 */
export const CARD_WIDTH = SCREEN_WIDTH * 0.9;
export const CARD_HEIGHT = SCREEN_HEIGHT * 0.6;

interface SwipeCardProps {
    /** Product data to display on the card */
    product: {
        id: string;
        name: string;
        price: number;
        category: string;
        image: any;
        rating: number;
    };
    /** The index in the current render stack (0 for top, higher for cards behind) */
    index: number;
    /** The shared value managing horizontal translation from SwipeDeck */
    translateX: any;
}

/**
 * SwipeCard Component
 * Displays a product in a swipable card format with animated overlays for LIKE/NOPE actions.
 * Uses Reanimated for high-performance 60fps animations.
 */
export default function SwipeCard({ product, index, translateX }: SwipeCardProps) {
    /**
     * Main animated style for the card.
     * Handles translation, rotation, and opacity for the top card,
     * and scaling/opacity for cards deeper in the stack.
     */
    const animatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
            translateX.value,
            [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            [-10, 0, 10],
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            translateX.value,
            [-SCREEN_WIDTH / 2, -SCREEN_WIDTH / 4, 0, SCREEN_WIDTH / 4, SCREEN_WIDTH / 2],
            [0, 1, 1, 1, 0],
            Extrapolation.CLAMP
        );

        // For cards behind the top one
        if (index > 0) {
            const scale = interpolate(
                translateX.value,
                [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
                [1, 0.95, 1],
                Extrapolation.CLAMP
            );

            return {
                transform: [{ scale }],
                opacity: 1 - index * 0.1,
            };
        }

        return {
            transform: [
                { translateX: translateX.value },
                { rotate: `${rotate}deg` }
            ],
            opacity,
        };
    });

    /**
     * Animated style for the green 'LIKE' overlay.
     * Fades in as the card is swiped to the right.
     */
    const likeOpacity = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [0, SCREEN_WIDTH / 4],
            [0, 1],
            Extrapolation.CLAMP
        );
        return { opacity };
    });

    /**
     * Animated style for the red 'NOPE' overlay.
     * Fades in as the card is swiped to the left.
     */
    const dislikeOpacity = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [-SCREEN_WIDTH / 4, 0],
            [1, 0],
            Extrapolation.CLAMP
        );
        return { opacity };
    });

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    alignSelf: 'center'
                },
                animatedStyle,
                { zIndex: 100 - index }
            ]}
            className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100"
        >
            {/* Image Section */}
            <View className="flex-1 bg-slate-50 relative">
                <Image
                    source={product.image}
                    className="w-full h-full"
                    contentFit="contain"
                />

                {/* Overlays */}
                <Animated.View
                    style={[likeOpacity]}
                    className="absolute top-[150px] left-[30px] z-10 border-4 border-emerald-500 rounded-2xl p-4 rotate-[-15deg]"
                >
                    <Text className="text-emerald-500 font-bold text-4xl uppercase font-outfit">LIKE</Text>
                </Animated.View>

                <Animated.View
                    style={[dislikeOpacity]}
                    className="absolute top-[150px] right-[30px] z-10 border-4 border-rose-500 rounded-2xl p-4 rotate-[15deg]"
                >
                    <Text className="text-rose-500 font-bold text-4xl uppercase font-outfit">NOPE</Text>
                </Animated.View>
            </View>

            {/* Info Section */}
            <View className="p-6 bg-white gap-y-2">
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-sky-400 font-bold text-xs tracking-widest uppercase font-inter">
                        {product.category}
                    </Text>
                    <View className="flex flex-row items-center gap-x-1">
                        <Ionicons name="star" size={14} color="#fbbf24" />
                        <Text className="text-slate-400 text-xs font-medium font-inter">{product.rating}</Text>
                    </View>
                </View>

                <Text className="text-2xl font-bold text-slate-900 font-outfit" numberOfLines={1}>
                    {product.name}
                </Text>

                <Text className="text-3xl font-bold text-slate-900 font-outfit">
                    ${product.price.toFixed(2)}
                </Text>

                <View className="flex flex-row gap-x-2 mt-2">
                    <View className="bg-slate-100 px-3 py-1 rounded-full">
                        <Text className="text-slate-500 text-[10px] font-bold font-inter">ECO FRIENDLY</Text>
                    </View>
                    <View className="bg-slate-100 px-3 py-1 rounded-full">
                        <Text className="text-slate-500 text-[10px] font-bold font-inter">PREMIUM</Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
}
