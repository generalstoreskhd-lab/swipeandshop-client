import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth/lib/modular';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import "../global.css";
import { getOrCreateClientProfile } from './firebase/auth';
import AppNavigator from './navigation/AppNavigator';
import RootNavigation from './navigation/Rootnavigation';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { logout, setAuthUser } from './store/slices/authSlice';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

/**
 * Navigation Swapper
 * 
 * Dynamically switches between the onboarding/auth stack (RootNavigation) 
 * and the main application (AppNavigator) based on the user's login or guest status.
 */
function Navigation() {
    const { isLoggedIn, isGuest } = useAppSelector((state) => state.auth);
    return isLoggedIn || isGuest ? <AppNavigator /> : <RootNavigation />;
}

/**
 * Inner App that has access to the Redux store.
 * Subscribes to Firebase auth state changes and syncs them to Redux.
 */
function AppWithStore() {
    const dispatch = useAppDispatch();
    const [fontsLoaded, fontError] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Outfit_400Regular,
        Outfit_500Medium,
        Outfit_600SemiBold,
        Outfit_700Bold,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
        PlusJakartaSans_500Medium,
        PlusJakartaSans_600SemiBold,
        PlusJakartaSans_700Bold,
    });

    useEffect(() => {
        /**
         * Subscribe to Firebase auth state changes.
         * On user sign-in: sync the Firebase Auth session into Redux.
         * On sign-out: dispatch logout to reset Redux state.
         */
        const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
            // TODO: [DEBUG] Remove after fixes
            console.log("[App:onAuthStateChanged] Fired | uid:", user?.uid ?? "null (signed out)");
            if (user) {
                const profile = await getOrCreateClientProfile(user);
                dispatch(setAuthUser({
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                    role: profile.role,
                }));
            } else {
                // TODO: [DEBUG] Remove after fixes
                console.log("[App:onAuthStateChanged] Signed out -> dispatching logout");
                dispatch(logout());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Navigation />
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

/**
 * Root Client App Component
 * 
 * Wraps the entire app in the Redux Provider and delegates all logic 
 * to AppWithStore which has access to the store.
 */
function App() {
    return (
        <Provider store={store}>
            <AppWithStore />
        </Provider>
    );
}

registerRootComponent(App);
