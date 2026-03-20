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

                <View className="w-full flex-col items-center flex-1 justify-center gap-y-2">
                    <Text className="text-3xl font-bold text-slate-900 mb-4 text-center">{t.whereShouldWeDeliver}</Text>
                    <LeafletMap />

                    <View className="w-full flex-col gap-y-2 mt-8">
                        <Text className="text-sm font-semibold text-slate-500 ml-1">{t.apartmentStreet}</Text>
                        <TextInput
                            aria-label={t.enterApartment}
                            placeholder={t.enterApartment}
                            className={`${error ? "border-red-400" : "border-slate-200"} border-2 border-slate-200 rounded-xl px-4 py-3 w-full  text-start`}
                        />
                    </View>

                    <View className="w-full flex-col gap-y-2">
                        <Text className="text-sm font-semibold text-slate-500 ml-2">{t.localityArea}</Text>
                        <TextInput
                            aria-label={t.enterLocality}
                            placeholder={t.enterLocality}
                            className={`${error ? "border-red-400" : "border-slate-200"} border-2 border-slate-200 rounded-xl px-4 py-3 w-full text-start`}
                        />
                    </View>

                    <View className="w-full flex flex-col gap-y-2">
                        <Text className="text-sm font-semibold text-slate-500 ml-1">{t.landmarkOptional}</Text>
                        <TextInput
                            placeholder={t.landmark}
                            className="border-slate-200 border-2 rounded-xl px-4 py-3 w-full mb-4"
                        />
                    </View>

                    <CustomPresseableText
                        stretch={true}
                        onPress={handleContinue}
                        text={t.continue}
                    />
                </View>
            </View>
        </RegisterLayout>
    );
}