import React, { useState, useRef } from "react";
import {
    ActivityIndicator,
    Button,
    Image,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { signInWithPhoneNumber } from "firebase/auth";
import app, { auth } from "../config/firebaseConfig";

import logo from "../assets/images/logo.png";
import { RegisterLayout } from "../layouts/RegisterLayout";
import CustomPresseableText from "../components/CustomPresseable";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { skipAuth } from "../store/slices/authSlice";
import { translations } from "../constants/translations";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function RegisterScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const { language } = useAppSelector((state) => state.settings);
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const recaptchaVerifier = useRef(null);

    const t = translations[language];

    const handleContinue = async () => {
        const cleanPhone = phone.replace(/[^\d]/g, "");
        const code = countryCode.startsWith("+") ? countryCode : `+${countryCode.replace(/[^\d]/g, "")}`;
        const phoneNumber = `${code}${cleanPhone}`;
        if (phoneNumber.length < 10) {
            setError("Please enter a valid phone number with country code.");
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
            console.error(err);
            setError(err.message || "Failed to send verification code");
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
            <View className="flex-1 w-full px-4 py-6 flex-col justify-between items-center">

                {/* Top bar: logo + skip */}
                <View className="w-full flex-row items-center justify-between mt-4">
                    <Image
                        source={logo}
                        accessibilityLabel="brand-logo"
                        style={{ width: 80, height: 80 }}
                        resizeMode="contain"
                    />
                    <Pressable onPress={() => dispatch(skipAuth())}>
                        <Text className="text-sky-500 text-base font-medium">{t.skip}</Text>
                    </Pressable>
                </View>

                {/* Hero + form */}
                <View className="w-full flex-col items-center mb-20">
                    <Text className="text-4xl font-semibold text-slate-950 text-center">
                        {isLogin ? "Welcome back" : "Create an Account"}
                    </Text>
                    <Text className="text-base mt-3 font-light text-slate-600 text-center">
                        {isLogin ? "Sign in to continue" : "Sign up to get started"}
                    </Text>

                    {/* Phone input */}
                    <View className={`mt-8 w-full flex-row items-center rounded-xl border px-4 py-3 bg-white ${error ? "border-red-400" : "border-slate-200"}`}>
                        <TextInput
                            className="text-base text-slate-900 border-r border-slate-200 pr-3 mr-3 w-16"
                            placeholder="+91"
                            keyboardType="phone-pad"
                            value={countryCode}
                            onChangeText={(val) => {
                                const digits = val.replace(/[^\d]/g, "");
                                setCountryCode(digits.length > 0 ? "+" + digits : "+");
                            }}
                            maxLength={5}
                        />
                        <TextInput
                            className="flex-1 text-base text-slate-900"
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
                        <Text className="mt-2 w-full text-sm text-red-500">{error}</Text>
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
                            text={isLogin ? "Login" : "Register"}
                        />
                    )}

                    <CustomPresseableText
                        stretch={true}
                        onPress={() => setIsLogin(!isLogin)}
                        text={isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                        variant="secondary"
                    />
                </View>

                <View id="login-bottombar">
                    <Text className="text-md text-center font-light text-slate-600">
                        By continuing, you agree to our
                        <Text className="font-semibold"> Terms of Services </Text> and
                        <Text className="font-semibold"> Privacy Policies</Text>
                    </Text>
                </View>

            </View>
        </RegisterLayout>
    );
};