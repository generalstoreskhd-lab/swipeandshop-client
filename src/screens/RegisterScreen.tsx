import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { signInWithPhoneNumber } from "firebase/auth";
import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    Text,
    TextInput,
    View
} from "react-native";
import app, { auth } from "../config/firebaseConfig";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import logo from "../assets/images/logo.png";
import CustomPresseableText from "../components/CustomPresseable";
import { translations } from "../constants/translations";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { RootStackParamList } from "../navigation/Rootnavigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { skipAuth } from "../store/slices/authSlice";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const normalizeCountryCode = (value: string) => {
    const digits = value.replace(/[^\d]/g, "");
    return digits ? `+${digits}` : "+";
};

const isValidIndianNumber = (number: string) => /^[6-9]\d{9}$/.test(number);
const isValidIrishNumber = (number: string) => /^8\d{8}$/.test(number);

const getLoginErrorMessage = (err: any) => {
    const code = err?.code as string | undefined;
    switch (code) {
        case "auth/invalid-phone-number":
            return "Invalid phone number format. Use a valid Indian (+91) or Irish (+353) mobile number.";
        case "auth/too-many-requests":
            return "Too many attempts. Please wait a few minutes and try again.";
        case "auth/network-request-failed":
            return "Network error. Check your internet connection and try again.";
        case "auth/quota-exceeded":
            return "SMS quota exceeded temporarily. Please try again later.";
        default:
            return "Could not send verification code. Please try again.";
    }
};

export default function RegisterScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const { language } = useAppSelector((state) => state.settings);
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const recaptchaVerifier = useRef(null);

    const t = translations[language];

    const handleContinue = async () => {
        const cleanPhone = phone.replace(/[^\d]/g, "");
        const code = normalizeCountryCode(countryCode);
        const phoneNumber = `${code}${cleanPhone}`;

        const isIndia = code === "+91" && isValidIndianNumber(cleanPhone);
        const isIreland = code === "+353" && isValidIrishNumber(cleanPhone);

        if (!isIndia && !isIreland) {
            setError("Only valid Indian (+91) and Irish (+353) mobile numbers are allowed.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                phoneNumber,
                recaptchaVerifier.current as any
            );
            navigation.navigate("Verify", { verificationId: confirmationResult.verificationId, phone: phoneNumber });
        } catch (err: any) {
            console.error("[RegisterScreen] send OTP error:", err?.code || err?.message || err);
            setError(getLoginErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RegisterLayout>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
            />
            <View className="flex-1 w-full px-4 py-6 pb-10 flex-col justify-between items-center">

                {/* Top bar: logo + skip */}
                <View className="w-full flex-row items-center justify-between mt-4">
                    <Image
                        source={logo}
                        accessibilityLabel="brand-logo"
                        style={{ width: 80, height: 80 }}
                        resizeMode="contain"
                    />
                    <Pressable onPress={() => dispatch(skipAuth())}>
                        <Text className="text-sky-500 text-base font-semibold font-jakarta">{t.skip}</Text>
                    </Pressable>
                </View>

                {/* Hero + form */}
                <View className="w-full flex-col items-center mb-20">
                    <Text className="text-4xl text-slate-950 text-center font-manrope">
                        Welcome back
                    </Text>
                    <Text className="text-base mt-3 text-slate-600 text-center font-jakarta">
                        Sign in to continue
                    </Text>

                    {/* Phone input */}
                    <View className={`mt-8 w-full flex-row items-center rounded-xl border px-4 py-3 bg-white ${error ? "border-red-400" : "border-slate-200"}`}>
                        <TextInput
                            className="text-base text-slate-900 border-r border-slate-200 pr-3 mr-3 w-16 font-jakarta"
                            placeholder="+91"
                            keyboardType="phone-pad"
                            value={countryCode}
                            onChangeText={(val) => {
                                setCountryCode(normalizeCountryCode(val));
                                if (error) setError("");
                            }}
                            maxLength={5}
                        />
                        <TextInput
                            className="flex-1 text-base text-slate-900 font-jakarta"
                            placeholder="Phone number"
                            placeholderTextColor="#94a3b8"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={(val) => {
                                setPhone(val.replace(/[^\d]/g, ""));
                                if (error) setError("");
                            }}
                            maxLength={15}
                        />
                    </View>

                    {/* Error message */}
                    {error ? (
                        <Text className="mt-2 w-full text-sm text-red-500 font-jakarta">{error}</Text>
                    ) : null}

                    {/* Continue button */}
                    {isLoading ? (
                        <View className="mt-4 pb-4 w-full items-center justify-center">
                            <ActivityIndicator size="large" color="#0ea5e9" />
                        </View>
                    ) : (
                        <CustomPresseableText
                            stretch={true}
                            onPress={handleContinue}
                            text="Login"
                        />
                    )}
                </View>

                <View id="login-bottombar" className="pb-4">
                    <Text className="text-md text-center text-slate-600 font-jakarta">
                        By continuing, you agree to our
                        <Text className="font-semibold font-jakarta"> Terms of Services </Text> and
                        <Text className="font-semibold font-jakarta"> Privacy Policies</Text>
                    </Text>
                </View>

            </View>
        </RegisterLayout>
    );
};