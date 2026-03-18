import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { 
    Gesture, 
    GestureDetector, 
    GestureHandlerRootView 
} from 'react-native-gesture-handler';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring, 
    runOnJS,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import SwipeCard from './SwipeCard';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface SwipeDeckProps {
    /** Array of products to display in the deck */
    data: any[];
    /** Callback triggered when a card is swiped left (disliked) */
    onSwipeLeft?: (item: any) => void;
    /** Callback triggered when a card is swiped right (liked) */
    onSwipeRight?: (item: any) => void;
    /** Callback triggered when the deck is empty */
    onEmpty?: () => void;
}

/**
 * SwipeDeck Component
 * Manages a stack of SwipeCards and handles pan gestures for the top-most card.
 * Uses 'currentIndex' to track progress and 'translateX' SharedValue for fluid movement.
 */
export interface SwipeDeckRef {
    swipeLeft: () => void;
    swipeRight: () => void;
}

const SwipeDeck = forwardRef<SwipeDeckRef, SwipeDeckProps>(({ data, onSwipeLeft, onSwipeRight, onEmpty }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = useSharedValue(0);

    useImperativeHandle(ref, () => ({
        swipeLeft: () => {
            translateX.value = withSpring(-SCREEN_WIDTH * 1.5, { damping: 20 }, () => {
                runOnJS(completeSwipe)('left');
            });
        },
        swipeRight: () => {
            translateX.value = withSpring(SCREEN_WIDTH * 1.5, { damping: 20 }, () => {
                runOnJS(completeSwipe)('right');
            });
        }
    }));

    /**
     * Handles the completion of a swipe gesture.
     * Moves to the next index and resets translation, or signals empty deck.
     */
    const completeSwipe = (direction: 'left' | 'right') => {
        const nextIndex = currentIndex + 1;
        const item = data[currentIndex];
        
        if (direction === 'left') {
            onSwipeLeft?.(item);
        } else {
            onSwipeRight?.(item);
        }

        if (nextIndex < data.length) {
            setCurrentIndex(nextIndex);
            translateX.value = 0;
        } else {
            onEmpty?.();
            setCurrentIndex(data.length); // End of deck
        }
    };

    /**
     * Configures the Pan Gesture.
     * onUpdate: Syncs finger movement to the SharedValue.
     * onEnd: Decides whether to complete the swipe or snap back based on velocity and distance.
     */
    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
        })
        .onEnd((event) => {
            if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
                const direction = event.translationX > 0 ? 'right' : 'left';
                const dest = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
                
                translateX.value = withSpring(dest, { 
                    velocity: event.velocityX,
                    damping: 20,
                    stiffness: 100
                }, () => {
                    runOnJS(completeSwipe)(direction);
                });
            } else {
                translateX.value = withSpring(0);
            }
        });

    if (currentIndex >= data.length) {
        return null;
    }

    // Performance optimization: We only render the top 2 cards at any time.
    // The previous card is unmounted, and future cards wait in the array.
    const cardsToRender = data.slice(currentIndex, currentIndex + 2).reverse();

    return (
        <View className="flex-1 items-center justify-center relative w-full h-full">
            {cardsToRender.map((item, index) => {
                const isTopCard = index === cardsToRender.length - 1;
                
                if (isTopCard) {
                    return (
                        <GestureDetector gesture={gesture} key={item.id}>
                            <SwipeCard 
                                product={item} 
                                index={0} 
                                translateX={translateX} 
                            />
                        </GestureDetector>
                    );
                }

                return (
                    <SwipeCard 
                        key={item.id} 
                        product={item} 
                        index={1} 
                        translateX={translateX} 
                    />
                );
            })}
        </View>
    );
});

export default SwipeDeck;
