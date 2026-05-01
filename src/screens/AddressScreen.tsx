import auth from "@react-native-firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import logo from "../assets/images/logo.png";
import CustomPresseableText from "../components/CustomPresseable";
import { LeafletMap } from "../components/LeafletMap";
import { translations } from "../constants/translations";
import { getOrCreateClientProfile, updateClientAddress } from "../firebase/auth";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { RootStackParamList } from "../navigation/Rootnavigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/slices/authSlice";
import { addNotification } from "../store/slices/notificationsSlice";


type Props = NativeStackScreenProps<RootStackParamList, 'Address'>;

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
            const user = auth().currentUser;
            if (user) {
                await updateClientAddress(user.uid, {
                    apartment,
                    locality,
                    landmark
                });
                
                const profile = await getOrCreateClientProfile(user);
                dispatch(login({
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                    role: 'client'
                }));

                dispatch(addNotification({
                    type: 'system',
                    title: 'Welcome to Swipe & Shop!',
                    body: `Hi ${profile.name}, we're glad to have you! Explore our curated collections and start swiping.`,
                    timeAgo: 'Just now',
                    isRead: false
                }));
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
                <View className="w-full flex-row items-center justify-between mt-4 mb-4">
                    <Pressable
                        onPress={() => navigation.goBack()}
                        className="p-3 bg-white/10 border border-white/15 rounded-full"
                        accessibilityLabel="Go back"
                    >
                        <Ionicons name="arrow-back" size={22} color="#ffffff" />
                    </Pressable>
                    <Image
                        source={logo}
                        accessibilityLabel="brand-logo"
                        style={{ width: 80, height: 80 }}
                        resizeMode="contain"
                    />
                    <View className="w-10" />
                </View>

                <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <View className="w-full flex-col items-center justify-start gap-y-4 rounded-[32px] border border-white/15 bg-white/10 px-5 py-7 shadow-2xl shadow-black">
                        <View className="w-full mb-2 mt-4">
                            <Text className="text-4xl text-white text-center font-manrope">{t.whereShouldWeDeliver}</Text>
                        </View>

                        <LeafletMap />

                        <View className="w-full flex-col gap-y-2 mt-6">
                            <Text className="text-sm font-semibold text-white/75 ml-2 font-jakarta">{t.apartmentStreet}</Text>
                            <TextInput
                                aria-label={t.enterApartment}
                                placeholder={t.enterApartment}
                                placeholderTextColor="#ffffff99"
                                value={apartment}
                                onChangeText={setApartment}
                                className={`${error ? "border-red-400" : "border-white/15"} bg-black/35 border rounded-[24px] px-5 py-4 w-full text-base text-white text-start font-jakarta`}
                            />
                        </View>

                        <View className="w-full flex-col gap-y-2 mt-2">
                            <Text className="text-sm font-semibold text-white/75 ml-2 font-jakarta">{t.localityArea}</Text>
                            <TextInput
                                aria-label={t.enterLocality}
                                placeholder={t.enterLocality}
                                placeholderTextColor="#ffffff99"
                                value={locality}
                                onChangeText={setLocality}
                                className={`${error ? "border-red-400" : "border-white/15"} bg-black/35 border rounded-[24px] px-5 py-4 w-full text-base text-white text-start font-jakarta`}
                            />
                        </View>

                        <View className="w-full flex flex-col gap-y-2 mt-2 mb-6">
                            <Text className="text-sm font-semibold text-white/75 ml-2 font-jakarta">{t.landmarkOptional}</Text>
                            <TextInput
                                placeholder={t.landmark}
                                placeholderTextColor="#ffffff99"
                                value={landmark}
                                onChangeText={setLandmark}
                                className="bg-black/35 border-white/15 border rounded-[24px] px-5 py-4 w-full text-base text-white text-start font-jakarta"
                            />
                        </View>

                        {error ? <Text className="w-full text-left text-sm text-red-500 mb-4 font-jakarta">{error}</Text> : null}

                        {isLoading ? (
                            <ActivityIndicator size="large" color="#f97316" className="mb-4" />
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
