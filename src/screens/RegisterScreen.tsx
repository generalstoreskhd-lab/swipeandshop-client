import { getAuth, signInWithPhoneNumber } from "@react-native-firebase/auth/lib/modular";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    Text,
    TextInput,
    View
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import logo from "../assets/images/logo.png";
import CustomPresseableText from "../components/CustomPresseable";
import { translations } from "../constants/translations";
import { verifyOtpAndGetProfile } from "../firebase/auth";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { RootStackParamList } from "../navigation/Rootnavigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login, skipAuth } from "../store/slices/authSlice";

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

const getVerifyErrorMessage = (err: any) => {
    const code = err?.code as string | undefined;
    switch (code) {
        case "auth/invalid-verification-code":
            return "Incorrect verification code. Please check and try again.";
        case "auth/code-expired":
        case "auth/session-expired":
        case "auth/invalid-verification-id":
            return "Verification session expired. Please resend the code.";
        case "auth/network-request-failed":
            return "Network error while verifying. Please try again.";
        case "auth/too-many-requests":
            return "Too many attempts. Please wait and try again.";
        default:
            return "Verification failed. Please check the code and try again.";
    }
};

export default function RegisterScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const { language } = useAppSelector((state) => state.settings);
    const otpInputRef = useRef<TextInput>(null);
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
    const [verificationId, setVerificationId] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const t = translations[language];

    const focusOtpInput = () => {
        setTimeout(() => {
            otpInputRef.current?.focus();
        }, 100);
    };

    useEffect(() => {
        if (verificationId) {
            focusOtpInput();
        }
    }, [verificationId]);

    const getValidatedPhoneNumber = () => {
        const cleanPhone = phone.replace(/[^\d]/g, "");
        const code = normalizeCountryCode(countryCode);
        const phoneNumber = `${code}${cleanPhone}`;

        const isIndia = code === "+91" && isValidIndianNumber(cleanPhone);
        const isIreland = code === "+353" && isValidIrishNumber(cleanPhone);

        if (!isIndia && !isIreland) {
            setError("Only valid Indian (+91) and Irish (+353) mobile numbers are allowed.");
            return null;
        }

        return phoneNumber;
    };

    const handleSendOtp = async () => {
        const phoneNumber = getValidatedPhoneNumber();
        if (!phoneNumber) return;

        setIsLoading(true);
        setError("");

        try {
            const confirmationResult = await signInWithPhoneNumber(getAuth(), phoneNumber);
            setVerificationId(confirmationResult.verificationId ?? "");
            setSubmittedPhoneNumber(phoneNumber);
            setOtp("");
            focusOtpInput();
        } catch (err: any) {
            console.error("[RegisterScreen] send OTP error:", err?.code || err?.message || err);
            setError(getLoginErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length < 6) {
            setError("Please enter the 6-digit verification code.");
            focusOtpInput();
            return;
        }

        if (!verificationId) {
            setError("Verification session expired. Please resend the code.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const result = await verifyOtpAndGetProfile(verificationId, otp);
            dispatch(login({
                name: result.profile?.name || "User",
                email: result.profile?.email,
                phone: result.profile?.phone,
                role: "client"
            }));
        } catch (err: any) {
            console.error("[RegisterScreen] verify OTP error:", err?.code || err?.message || err);
            setError(getVerifyErrorMessage(err));
            focusOtpInput();
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        const phoneNumber = submittedPhoneNumber || getValidatedPhoneNumber();
        if (!phoneNumber) return;

        setIsResending(true);
        setError("");

        try {
            const confirmationResult = await signInWithPhoneNumber(getAuth(), phoneNumber);
            setVerificationId(confirmationResult.verificationId ?? "");
            setSubmittedPhoneNumber(phoneNumber);
            setOtp("");
            focusOtpInput();
        } catch (err: any) {
            console.error("[RegisterScreen] resend OTP error:", err?.code || err?.message || err);
            setError(getLoginErrorMessage(err));
        } finally {
            setIsResending(false);
        }
    };

    const handlePhoneChange = (val: string) => {
        setPhone(val.replace(/[^\d]/g, ""));
        setSubmittedPhoneNumber("");
        setVerificationId("");
        setOtp("");
        if (error) setError("");
    };

    const hasSentOtp = Boolean(verificationId);

    return (
        <RegisterLayout>
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
                        <Text className="text-orange-300 text-base font-semibold font-jakarta">{t.skip}</Text>
                    </Pressable>
                </View>

                {/* Hero + form */}
                <View className="w-full flex-col items-center mb-14 rounded-[32px] border border-white/15 bg-white/10 px-5 py-7 shadow-2xl shadow-black">
                    <Text className="text-4xl text-white text-center font-manrope">
                        Welcome back
                    </Text>
                    <Text className="text-base mt-3 text-white/70 text-center font-jakarta">
                        Sign in to continue
                    </Text>

                    {/* Phone input */}
                    <View className={`mt-8 w-full flex-row items-center rounded-[24px] border px-4 py-3 bg-black/35 ${error ? "border-red-400" : "border-white/15"}`}>
                        <TextInput
                            className="text-base text-white border-r border-white/20 pr-3 mr-3 w-16 font-jakarta"
                            placeholder="+91"
                            placeholderTextColor="#ffffff99"
                            keyboardType="phone-pad"
                            value={countryCode}
                            onChangeText={(val) => {
                                setCountryCode(normalizeCountryCode(val));
                                setSubmittedPhoneNumber("");
                                setVerificationId("");
                                setOtp("");
                                if (error) setError("");
                            }}
                            maxLength={5}
                        />
                        <TextInput
                            className="flex-1 text-base text-white font-jakarta"
                            placeholder="Phone number"
                            placeholderTextColor="#ffffff99"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={handlePhoneChange}
                            maxLength={15}
                        />
                    </View>

                    {hasSentOtp ? (
                        <>
                            <Text className="mt-4 w-full text-sm text-white/70 font-jakarta">
                                Enter the verification code sent to
                                <Text className="font-semibold text-white font-jakarta"> {submittedPhoneNumber}</Text>
                            </Text>
                            <View className={`mt-3 w-full rounded-[24px] border px-4 py-3 bg-black/35 ${error ? "border-red-400" : "border-white/15"}`}>
                                <TextInput
                                    ref={otpInputRef}
                                    className="text-base text-white font-jakarta"
                                    placeholder="Enter 6-digit OTP"
                                    placeholderTextColor="#ffffff99"
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    value={otp}
                                    onChangeText={(val) => {
                                        setOtp(val.replace(/[^\d]/g, "").slice(0, 6));
                                        if (error) setError("");
                                    }}
                                    maxLength={6}
                                    autoFocus
                                />
                            </View>
                            <View className="mt-3 w-full flex-row items-center justify-between">
                                <Pressable onPress={() => {
                                    setVerificationId("");
                                    setSubmittedPhoneNumber("");
                                    setOtp("");
                                    setError("");
                                }}>
                                    <Text className="text-sm font-semibold text-orange-300 font-jakarta">Change number</Text>
                                </Pressable>
                                <Pressable onPress={isResending ? undefined : handleResendOtp}>
                                    <Text className={`text-sm font-semibold font-jakarta ${isResending ? "text-white/40" : "text-orange-300"}`}>
                                        {isResending ? "Resending..." : "Resend OTP"}
                                    </Text>
                                </Pressable>
                            </View>
                        </>
                    ) : null}

                    {/* Error message */}
                    {error ? (
                        <Text className="mt-2 w-full text-sm text-red-500 font-jakarta">{error}</Text>
                    ) : null}

                    {/* Continue button */}
                    {isLoading ? (
                        <View className="mt-4 pb-4 w-full items-center justify-center">
                            <ActivityIndicator size="large" color="#f97316" />
                        </View>
                    ) : (
                        <CustomPresseableText
                            stretch={true}
                            onPress={hasSentOtp ? handleVerifyOtp : handleSendOtp}
                            text={hasSentOtp ? "Verify OTP" : "Send OTP"}
                        />
                    )}

                    <Text className="mt-5 text-sm text-center text-white/60 font-jakarta">
                        By continuing, you agree to our
                        <Text className="font-semibold text-white font-jakarta"> Terms of Services </Text> and
                        <Text className="font-semibold text-white font-jakarta"> Privacy Policies</Text>
                    </Text>
                </View>

                <View />

            </View>
        </RegisterLayout>
    );
};
