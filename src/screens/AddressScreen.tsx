import CustomPresseableText from "../components/CustomPresseable";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { useState } from "react";
import { Image, Text, TextInput, View, ScrollView, Pressable } from "react-native";
import logo from "../assets/images/logo.png";
import { LeafletMap } from "../components/LeafletMap";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { skipAuth } from "../store/slices/authSlice";
import { translations } from "../constants/translations";

type Props = NativeStackScreenProps<RootStackParamList, 'Address'>;

export default function AddressScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const { language } = useAppSelector((state) => state.settings);
    const [error, setError] = useState("");

    const t = translations[language];

    const handleContinue = () => {
        dispatch(skipAuth());
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

                <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <View className="w-full flex-col items-center justify-start gap-y-4">
                        <View className="w-full mb-2 mt-4">
                            <Text className="text-4xl font-semibold text-slate-950 text-center">{t.whereShouldWeDeliver}</Text>
                        </View>

                        <LeafletMap />

                        <View className="w-full flex-col gap-y-2 mt-6">
                            <Text className="text-sm font-semibold text-slate-500 ml-2">{t.apartmentStreet}</Text>
                            <TextInput
                                aria-label={t.enterApartment}
                                placeholder={t.enterApartment}
                                placeholderTextColor="#94a3b8"
                                className={`${error ? "border-red-400" : "border-slate-200"} bg-white border-2 rounded-xl px-5 py-4 w-full text-base text-slate-900 text-start`}
                            />
                        </View>

                        <View className="w-full flex-col gap-y-2 mt-2">
                            <Text className="text-sm font-semibold text-slate-500 ml-2">{t.localityArea}</Text>
                            <TextInput
                                aria-label={t.enterLocality}
                                placeholder={t.enterLocality}
                                placeholderTextColor="#94a3b8"
                                className={`${error ? "border-red-400" : "border-slate-200"} bg-white border-2 rounded-xl px-5 py-4 w-full text-base text-slate-900 text-start`}
                            />
                        </View>

                        <View className="w-full flex flex-col gap-y-2 mt-2 mb-6">
                            <Text className="text-sm font-semibold text-slate-500 ml-2">{t.landmarkOptional}</Text>
                            <TextInput
                                placeholder={t.landmark}
                                placeholderTextColor="#94a3b8"
                                className="bg-white border-slate-200 border-2 rounded-xl px-5 py-4 w-full text-base text-slate-900 text-start"
                            />
                        </View>

                        <CustomPresseableText
                            stretch={true}
                            onPress={handleContinue}
                            text={t.continue}
                        />
                    </View>
                </ScrollView>
            </View>
        </RegisterLayout>
    );
}