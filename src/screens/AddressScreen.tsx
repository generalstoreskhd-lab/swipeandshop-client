import CustomPresseableText from "../components/CustomPresseable";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { useState } from "react";
import { Image, Text, TextInput, View, ScrollView, ActivityIndicator } from "react-native";
import logo from "../assets/images/logo.png";
import { LeafletMap } from "../components/LeafletMap";
import { auth, db } from "../config/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/slices/authSlice";
import { translations } from "../constants/translations";
import { addNotification } from "../store/slices/notificationsSlice";


type Props = NativeStackScreenProps<RootStackParamList, 'Address'>;

import { updateClientAddress } from "../firebase/auth";

/**
 * AddressScreen Component
 * 
 * Final step of onboarding. Allows users to select their delivery location 
 * via an interactive Leaflet map and manual input. Updates the client's 
 * Firestore profile with structured address data.
 */
export default function AddressScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const { language } = useAppSelector((state) => state.settings);
    const [apartment, setApartment] = useState("");
    const [locality, setLocality] = useState("");
    const [landmark, setLandmark] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const t = translations[language];

    /**
     * Saves the address to Firestore and completes the onboarding process.
     * Triggers the 'skipAuth' action to enter the main app.
     */
    const handleContinue = async () => {
        if (!apartment || !locality) {
            setError("Please fill in the required address fields.");
            return;
        }

        setIsLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                await updateClientAddress(user.uid, {
                    apartment,
                    locality,
                    landmark
                });
                
                // Fetch the updated profile to ensure we have the name for Redux
                const userDoc = await getDoc(doc(db, "users-client", user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    const loginPayload: { name: string; email?: string; role: 'client' | 'admin' } = {
                        name: data.name,
                        email: data.email || "",
                        role: 'client'
                    };
                    dispatch(login(loginPayload));
                    
                    // Add Welcome Notification
                    dispatch(addNotification({
                        type: 'system',
                        title: 'Welcome to Swipe & Shop!',
                        body: `Hi ${data.name}, we're glad to have you! Explore our curated collections and start swiping.`,
                        timeAgo: 'Just now',
                        isRead: false
                    }));
                }
            } else {
                setError("User session not found.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to save address");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RegisterLayout>
            <View className="flex-1 w-full px-4 py-6 flex-col justify-start items-center">
                {/* Top bar: logo */}
                <View className="w-full flex-row items-center justify-start mt-4 mb-4">
                    <Image
                        source={logo}
                        accessibilityLabel="brand-logo"
                        style={{ width: 80, height: 80 }}
                        resizeMode="contain"
                    />
                </View>

                <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <View className="w-full flex-col items-center justify-start gap-y-4">
                        <View className="w-full mb-2 mt-4">
                            <Text className="text-4xl font-semibold text-slate-950 text-center">{t.whereShouldWeDeliver}</Text>
                        </View>

                        <LeafletMap />

                        <View className="w-full flex-col gap-y-2 mt-6">
                            <Text className="text-sm font-semibold text-slate-500 ml-2">{t.apartmentStreet}</Text>
                            <TextInput
                                aria-label={t.enterApartment}
                                placeholder={t.enterApartment}
                                placeholderTextColor="#94a3b8"
                                value={apartment}
                                onChangeText={setApartment}
                                className={`${error ? "border-red-400" : "border-slate-200"} bg-white border-2 rounded-xl px-5 py-4 w-full text-base text-slate-900 text-start`}
                            />
                        </View>

                        <View className="w-full flex-col gap-y-2 mt-2">
                            <Text className="text-sm font-semibold text-slate-500 ml-2">{t.localityArea}</Text>
                            <TextInput
                                aria-label={t.enterLocality}
                                placeholder={t.enterLocality}
                                placeholderTextColor="#94a3b8"
                                value={locality}
                                onChangeText={setLocality}
                                className={`${error ? "border-red-400" : "border-slate-200"} bg-white border-2 rounded-xl px-5 py-4 w-full text-base text-slate-900 text-start`}
                            />
                        </View>

                        <View className="w-full flex flex-col gap-y-2 mt-2 mb-6">
                            <Text className="text-sm font-semibold text-slate-500 ml-2">{t.landmarkOptional}</Text>
                            <TextInput
                                placeholder={t.landmark}
                                placeholderTextColor="#94a3b8"
                                value={landmark}
                                onChangeText={setLandmark}
                                className="bg-white border-slate-200 border-2 rounded-xl px-5 py-4 w-full text-base text-slate-900 text-start"
                            />
                        </View>

                        {error ? <Text className="w-full text-left text-sm text-red-500 mb-4">{error}</Text> : null}

                        {isLoading ? (
                            <ActivityIndicator size="large" color="#0ea5e9" className="mb-4" />
                        ) : (
                            <CustomPresseableText
                                stretch={true}
                                onPress={handleContinue}
                                text={t.continue}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        </RegisterLayout>
    );
}