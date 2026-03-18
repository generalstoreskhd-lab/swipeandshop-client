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
    withTiming,
    Easing,
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
    /** The index of the current top card (managed by parent) */
    currentIndex: number;
    /** Callback triggered when a card is swiped left (disliked) */
    onSwipeLeft?: (item: any) => void;
    /** Callback triggered when a card is swiped right (liked) */
    onSwipeRight?: (item: any) => void;
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

const SwipeDeck = forwardRef<SwipeDeckRef, SwipeDeckProps>((props, ref) => {
    const { data, currentIndex, onSwipeLeft, onSwipeRight } = props;
    const translateX = useSharedValue(0);
    
    // Sync props to a ref to ensure runOnJS always has the latest handlers
    const propsRef = React.useRef(props);
    React.useEffect(() => {
        propsRef.current = props;
    });

    useImperativeHandle(ref, () => ({
        swipeLeft: () => {
            if (currentIndex >= data.length) return;
            translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 200, easing: Easing.out(Easing.ease) }, () => {
                runOnJS(completeSwipe)('left');
            });
        },
        swipeRight: () => {
            if (currentIndex >= data.length) return;
            translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 200, easing: Easing.out(Easing.ease) }, () => {
                runOnJS(completeSwipe)('right');
            });
        }
    }), [currentIndex, data.length]);

    /**
     * Handles the completion of a swipe gesture.
     * Moves to the next index and resets translation, or signals empty deck.
     */
    const completeSwipe = (direction: 'left' | 'right') => {
        const { currentIndex: latestIndex, data: latestData, onSwipeLeft: handleLeft, onSwipeRight: handleRight } = propsRef.current;
        const item = latestData[latestIndex];
        
        // Signal the parent to update index
        if (direction === 'left') {
            runOnJS(handleLeft!)(item);
        } else {
            runOnJS(handleRight!)(item);
        }

        // Parent re-renders will update props, but we reset translation here
        translateX.value = 0;
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

                translateX.value = withTiming(dest, {
                    duration: 200,
                    easing: Easing.out(Easing.ease)
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
                        <GestureDetector gesture={gesture} key={`top-${item.id}-${currentIndex}`}>
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
                        key={`back-${item.id}-${currentIndex}`}
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
