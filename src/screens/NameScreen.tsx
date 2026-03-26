import CustomPresseableText from "../components/CustomPresseable";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { useState } from "react";
import { Image, Text, TextInput, View, Pressable } from "react-native";
import logo from "../assets/images/logo.png";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { skipAuth } from "../store/slices/authSlice";
import { translations } from "../constants/translations";
import { ActivityIndicator } from "react-native";
import { createClientProfile } from "../firebase/auth";

type Props = NativeStackScreenProps<RootStackParamList, 'Name'>;

/**
 * NameScreen Component
 * 
 * The first step of client onboarding after phone verification. 
 * Collects the user's name and initiates profile creation in 'users-client'.
 */
export default function NameScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const { language } = useAppSelector((state) => state.settings);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const t = translations[language];

    /**
     * Handles the creation of a new client profile. 
     * Sets the user's role to 'client' and redirects to the Address screen.
     */
    const handleCreateProfile = async () => {
        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }
        
        setIsLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                const profile = await createClientProfile(user.uid, name, user.phoneNumber);
                // Note: we don't dispatch login yet, usually happens after address
                navigation.navigate("Address");
            } else {
                setError("User session not found. Please try again.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to save profile");
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

                <View className="w-full flex-col items-center flex-1 justify-center gap-y-6 pb-20">
                    <View className="w-full mb-6">
                        <Text className="text-4xl font-semibold text-slate-950 text-center">{t.whatShouldWeCallYou}</Text>
                        <Text className="text-base mt-3 font-light text-slate-600 text-center">Tell us your name so we can personalize your experience</Text>
                    </View>

                    <View className="w-full flex flex-col gap-y-2 mb-6">
                        <Text className="text-sm font-semibold text-slate-500 ml-2">{t.fullName}</Text>
                        <TextInput
                            placeholder={t.enterName}
                            placeholderTextColor="#94a3b8"
                            value={name}
                            onChangeText={setName}
                            className={`${error ? "border-red-400" : "border-slate-200"} bg-white border-2 rounded-xl px-5 py-4 w-full text-base text-slate-900`}
                        />
                    </View>

                    {error ? <Text className="w-full text-left text-sm text-red-500 mb-2">{error}</Text> : null}

                    {isLoading ? (
                        <ActivityIndicator size="large" color="#0ea5e9" className="my-4" />
                    ) : (
                        <CustomPresseableText
                            stretch={true}
                            onPress={handleCreateProfile}
                            text={t.continue}
                        />
                    )}
                </View>
            </View>
        </RegisterLayout>
    );
}