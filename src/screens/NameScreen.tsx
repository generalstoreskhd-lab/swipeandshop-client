import CustomPresseableText from "../components/CustomPresseable";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { useState } from "react";
import { Image, Text, TextInput, View, Pressable } from "react-native";
import logo from "../assets/images/logo.png";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { skipAuth } from "../store/slices/authSlice";
import { translations } from "../constants/translations";

type Props = NativeStackScreenProps<RootStackParamList, 'Name'>;

export default function NameScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const { language } = useAppSelector((state) => state.settings);
    const [error, setError] = useState("");
    
    const t = translations[language];

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
                            className={`${error ? "border-red-400" : "border-slate-200"} bg-white border-2 rounded-xl px-5 py-4 w-full text-base text-slate-900`}
                        />
                    </View>

                    {error ? <Text className="w-full text-left text-sm text-red-500 mb-2">{error}</Text> : null}

                    <CustomPresseableText
                        stretch={true}
                        onPress={() => navigation.navigate("Address")}
                        text={t.continue}
                    />
                </View>
            </View>
        </RegisterLayout>
    );
}