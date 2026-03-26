import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from 'react';
import "../global.css";
import "./config/firebaseConfig";
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { Provider } from 'react-redux';
import { store } from './store';
import RootNavigation from './navigation/RootNavigation';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { setAuthUser, logout } from './store/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

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
    });

    useEffect(() => {
        /**
         * Subscribe to Firebase auth state changes.
         * On user sign-in: fetch Firestore profile and update Redux.
         * On sign-out: dispatch logout to reset Redux state.
         */
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // TODO: [DEBUG] Remove after fixes
            console.log("[App:onAuthStateChanged] Fired | uid:", user?.uid ?? "null (signed out)");
            if (user) {
                try {
                    // TODO: [DEBUG] Remove after fixes
                    console.log("[App:onAuthStateChanged] Fetching Firestore profile for uid:", user.uid);
                    const userDoc = await getDoc(doc(db, "users-client", user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        // TODO: [DEBUG] Remove after fixes
                        console.log("[App:onAuthStateChanged] Profile found:", JSON.stringify(data));
                        dispatch(setAuthUser({
                            name: data.name,
                            email: data.email || "",
                            role: 'client',
                        }));
                    } else {
                        // TODO: [DEBUG] Remove after fixes
                        console.log("[App:onAuthStateChanged] No profile found for uid:", user.uid, "-> staying in onboarding flow");
                    }
                    // If profile doesn't exist yet, we remain in the onboarding flow
                } catch (error) {
                    // TODO: [DEBUG] Remove after fixes
                    console.error("[App:onAuthStateChanged] Error fetching profile:", error);
                }
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