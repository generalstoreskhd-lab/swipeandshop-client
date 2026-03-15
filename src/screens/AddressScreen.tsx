import CustomPresseableText from "../components/CustomPresseable";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { useState } from "react";
import { Image, Text, TextInput, View, ScrollView } from "react-native";
import logo from "../assets/images/logo.png";
import { LeafletMap } from "../components/LeafletMap";

export default function AddressScreen() {

    const [error, setError] = useState("");
    return (
        <RegisterLayout>
            <View className="w-full flex flex-1 flex-col items-center justify-center gap-y-2">
                <Image
                    source={logo}
                    accessibilityLabel="brand-logo"
                    className="h-32 w-32"
                    resizeMode="contain"
                />
                <Text className="text-3xl font-bold text-slate-900 mb-4">Where should we deliver ?</Text>
                <TextInput
                    placeholder="Enter the address"
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                    className={`${error ? "border-red-400" : "border-slate-200"} border-2 border-slate-200 rounded-xl px-4 py-3 w-full h-32 text-start`}
                />
                <LeafletMap />

                <TextInput
                    placeholder="Landmark"
                    className="border-slate-200 border-2 rounded-xl px-4 py-3 w-full mb-4"
                />


                <View className="h-4" />

                <CustomPresseableText
                    stretch={true}
                    onPress={() => { }}
                    text="Continue"
                />
            </View>
        </RegisterLayout>
    );
}