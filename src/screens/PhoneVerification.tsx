import { RegisterLayout } from "../layouts/RegisterLayout";
import { Button, Image, Pressable, Text, View } from "react-native";

import { OtpInput } from "../components/OtpInput";

import logo from "../assets/images/logo.png";
import lock from "../assets/images/lock.png";
import CustomPresseableText from "../components/CustomPresseable";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { useAppDispatch } from "../store/hooks";
import { skipAuth } from "../store/slices/authSlice";

type Props = NativeStackScreenProps<RootStackParamList, 'Verify'>;

export default function PhoneVerification({ navigation }: Props) {
    const dispatch = useAppDispatch();
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
                        <Text className="text-md font-semibold text-slate-900"> +91 9544407064 </Text>Please
                        enter below.
                    </Text>
                    <View className="w-full px-4">
                        <OtpInput
                            onTextChange={(val) => { console.log(val) }}
                            numberOfDigits={6}
                            type="numeric"
                            placeholder="******" />
                    </View>
                    <View className="mt-0 flex-col items-center justify-between gap-y-1 text-center">
                        <Text className="text-md font-light text-slate-600">Didn't recieve the code</Text>
                        <Text className="text-md font-semibold text-sky-500">Resend Code</Text>
                    </View>
                    <CustomPresseableText text="Verify" stretch={true} onPress={() => navigation.navigate("Name")} />

                </View>
            </View>
        </RegisterLayout>
    );
}