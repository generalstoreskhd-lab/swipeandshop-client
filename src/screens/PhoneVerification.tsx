import { Image, Pressable, Text, View } from "react-native";
import { RegisterLayout } from "../layouts/RegisterLayout";

import { OtpInput } from "../components/OtpInput";

import lock from "../assets/images/lock.png";
import logo from "../assets/images/logo.png";
import CustomPresseableText from "../components/CustomPresseable";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import { verifyOtpAndGetProfile } from "../firebase/auth";
import { RootStackParamList } from "../navigation/Rootnavigation";
import app, { auth } from "../config/firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";
import { useAppDispatch } from "../store/hooks";
import { login, skipAuth } from "../store/slices/authSlice";

type Props = NativeStackScreenProps<RootStackParamList, 'Verify'>;

const getVerifyErrorMessage = (err: any) => {
    const code = err?.code as string | undefined;
    switch (code) {
        case "auth/invalid-verification-code":
            return "Incorrect verification code. Please check and try again.";
        case "auth/code-expired":
        case "auth/session-expired":
        case "auth/invalid-verification-id":
            return "Verification session expired. Please request a new code.";
        case "auth/network-request-failed":
            return "Network error while verifying. Please try again.";
        case "auth/too-many-requests":
            return "Too many attempts. Please wait and try again.";
        default:
            return "Verification failed. Please check the code and try again.";
    }
};

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
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState("");
    const [verificationId, setVerificationId] = useState(route.params?.verificationId || "");
    const phone = route.params?.phone || "your number";
    const recaptchaVerifier = useRef(null);

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
            console.error("[PhoneVerification] Verification error:", error?.code || error?.message || error);
            setError(getVerifyErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!phone || phone === "your number") {
            setError("Phone number is missing. Please change number and try again.");
            return;
        }

        setIsResending(true);
        setError("");
        try {
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                phone,
                recaptchaVerifier.current as any
            );
            setVerificationId(confirmationResult.verificationId);
        } catch (resendError: any) {
            setError(getVerifyErrorMessage(resendError));
        } finally {
            setIsResending(false);
        }
    };

    return (
        <RegisterLayout>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
            />
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
                        <Text className="text-sky-500 text-base font-semibold font-jakarta">Skip</Text>
                    </Pressable>
                </View>

                <View className="w-full flex-col items-center flex-1 justify-center gap-y-6 text-center">
                    <Image source={lock} alt="lock" className="h-8 w-8"></Image>
                    <Text className="w-full text-3xl text-slate-900 text-center font-manrope">Enter Verification Code</Text>
                    <Text className="w-full text-md text-center text-slate-600 font-jakarta">
                        We have sent a verification code to
                        <Text className="text-md font-semibold text-slate-900 font-jakarta"> {phone} </Text>Please
                        enter below.
                    </Text>
                    <View className="w-full px-2">
                        <OtpInput
                            onTextChange={(val: string) => setCode(val)}
                            numberOfDigits={6}
                            type="numeric"
                            placeholder="******" />
                    </View>
                    <View className="mt-0 flex-col items-center justify-between gap-y-1 text-center">
                        <Text className="text-md text-slate-600 font-jakarta">Didn&apos;t receive the code?</Text>
                        <View className="flex-row items-center">
                            <Text
                                className="text-md font-semibold text-sky-500 font-jakarta"
                                onPress={() => navigation.goBack()}
                            >
                                Change Number
                            </Text>
                            <Text className="text-slate-400 mx-2">|</Text>
                            <Text
                                className="text-md font-semibold text-sky-500 font-jakarta"
                                onPress={isResending ? undefined : handleResend}
                            >
                                {isResending ? "Resending..." : "Resend"}
                            </Text>
                        </View>
                    </View>
                    {error ? <Text className="text-sm text-red-500 text-center px-4 font-jakarta">{error}</Text> : null}
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