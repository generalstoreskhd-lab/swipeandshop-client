import { RegisterLayout } from "../layouts/RegisterLayout";
import { Image, Pressable, Text, View } from "react-native";

import { OtpInput } from "../components/OtpInput";

import logo from "../assets/images/logo.png";
import lock from "../assets/images/lock.png";
import CustomPresseableText from "../components/CustomPresseable";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { useAppDispatch } from "../store/hooks";
import { skipAuth, login } from "../store/slices/authSlice";
import { verifyOtpAndGetProfile } from "../firebase/auth";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'Verify'>;

/**
 * PhoneVerification Component
 * 
 * Handles the 6-digit OTP verification for client users. 
 * On success, it either creates a new session (for existing users) 
 * or redirects to the 'Name' screen for profile setup (for new users).
 */
export default function PhoneVerification({ navigation, route }: Props) {
    const dispatch = useAppDispatch();
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    const verificationId = route.params?.verificationId || "";
    const phone = route.params?.phone || "your number";

    /**
     * Reconciles the OTP with Firebase Auth and checks Firestore for an existing profile.
     */
    const handleVerify = async () => {
        if (code.length < 6) {
            setError("Please enter all 6 digits of the verification code.");
            return;
        }

        if (!verificationId) {
            setError("Session expired. Please go back and request a new code.");
            return;
        }

        setIsLoading(true);
        setError("");
        try {
            console.log("[PhoneVerification] Starting OTP verification, code length:", code.length);
            const result = await verifyOtpAndGetProfile(verificationId, code);
            console.log("[PhoneVerification] Result:", JSON.stringify(result));

            if (result.isNewUser) {
                console.log("[PhoneVerification] New user, navigating to Name screen...");
                navigation.navigate("Name");
            } else {
                console.log("[PhoneVerification] Existing user, dispatching login...");
                dispatch(login({ 
                    name: result.profile?.name || "User",
                    email: result.profile?.email,
                    role: 'client'
                }));
            }
        } catch (error: any) {
            console.error("[PhoneVerification] Verification error:", error);
            const message = error?.message || "Verification failed. Please check the code and try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RegisterLayout>
            <View className="flex-1 w-full px-4 py-6 flex-col justify-start items-center">
                <View className="w-full flex-row items-center justify-between mt-4">
                    <Image
                        source={logo}
                        alt="brand-logo"
                        aria-label="brand-logo"
                        style={{ width: 80, height: 80 }}
                        resizeMode="contain"
                    />
                    <Pressable onPress={() => dispatch(skipAuth())}>
                        <Text className="text-sky-500 text-base font-medium">Skip</Text>
                    </Pressable>
                </View>

                <View className="flex-col items-center flex-1 justify-center gap-y-6 text-center">
                    <Image source={lock} alt="lock" className="h-8 w-8"></Image>
                    <Text className="text-3xl font-bold text-slate-900 text-center">Enter Verification Code</Text>
                    <Text className="text-md text-center font-light text-slate-600">
                        We have sent a verification code to
                        <Text className="text-md font-semibold text-slate-900"> {phone} </Text>Please
                        enter below.
                    </Text>
                    <View className="w-full px-4">
                        <OtpInput
                            onTextChange={(val: string) => setCode(val)}
                            numberOfDigits={6}
                            type="numeric"
                            placeholder="******" />
                    </View>
                    <View className="mt-0 flex-col items-center justify-between gap-y-1 text-center">
                        <Text className="text-md font-light text-slate-600">Didn't receive the code?</Text>
                        <Text className="text-md font-semibold text-sky-500" onPress={() => navigation.goBack()}>Change Number / Resend</Text>
                    </View>
                    {error ? <Text className="text-sm text-red-500 text-center px-4">{error}</Text> : null}
                    {isLoading ? (
                        <View className="mt-4"><ActivityIndicator size="large" color="#0ea5e9" /></View>
                    ) : (
                        <CustomPresseableText text="Verify" stretch={true} onPress={handleVerify} />
                    )}

                </View>
            </View>
        </RegisterLayout>
    );
}