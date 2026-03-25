import { RegisterLayout } from "../layouts/RegisterLayout";
import { Button, Image, Pressable, Text, View } from "react-native";

import { OtpInput } from "../components/OtpInput";

import logo from "../assets/images/logo.png";
import lock from "../assets/images/lock.png";
import CustomPresseableText from "../components/CustomPresseable";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { useAppDispatch } from "../store/hooks";
import { skipAuth, login } from "../store/slices/authSlice";
import { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { PhoneAuthProvider, signInWithCredential, getAdditionalUserInfo } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

type Props = NativeStackScreenProps<RootStackParamList, 'Verify'>;

export default function PhoneVerification({ navigation, route }: Props) {
    const dispatch = useAppDispatch();
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const verificationId = route.params?.verificationId || "";
    const phone = route.params?.phone || "your number";

    const handleVerify = async () => {
        if (code.length < 6) {
            Alert.alert("Invalid Code", "Please enter a 6-digit verification code");
            return;
        }

        setIsLoading(true);
        try {
            const credential = PhoneAuthProvider.credential(verificationId, code);
            const userCredential = await signInWithCredential(auth, credential);
            const additionalUserInfo = getAdditionalUserInfo(userCredential);
            
            if (additionalUserInfo?.isNewUser) {
                // Navigate to next onboarding step for new users
                navigation.navigate("Name");
            } else {
                // For existing users, bypass onboarding and log them in
                dispatch(login({ 
                    name: userCredential.user.displayName || "User",
                    email: userCredential.user.email || undefined
                }));
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert("Verification Failed", error.message || "Invalid verification code");
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