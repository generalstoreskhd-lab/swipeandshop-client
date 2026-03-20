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
                {/* Top bar: logo + skip */}
                <View className="w-full flex-row items-center justify-between mt-4 mb-4">
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

                <View className="w-full flex-col items-center flex-1 justify-center gap-y-4">
                    <Text className="text-3xl font-bold text-slate-900 mb-4 text-center">{t.whatShouldWeCallYou}</Text>
                    <View className="w-full flex flex-col gap-y-2">
                        <Text className="text-sm font-semibold text-slate-500 ml-1">{t.fullName}</Text>
                        <TextInput
                            placeholder={t.enterName}
                            className={`${error ? "border-red-400" : "border-slate-200"} border-2 border-slate-200 rounded-xl px-4 py-3 w-full`}
                        />
                    </View>
                {error && <Text className="text-red-500">{error}</Text>}
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