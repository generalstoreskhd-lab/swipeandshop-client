import CustomPresseableText from "../components/CustomPresseable";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import logo from "../assets/images/logo.png";

export default function NameScreen() {

    const [error, setError] = useState("");
    return (
        <RegisterLayout>
            <View className="w-full flex flex-1 flex-col items-center justify-center gap-y-4">
                <Image
                    source={logo}
                    accessibilityLabel="brand-logo"
                    className="h-32 w-32"
                    resizeMode="contain"
                />
                <Text className="text-3xl font-bold text-slate-900 mb-4">What should we call you ?</Text>
                <TextInput
                    placeholder="Enter your name"
                    className={`${error ? "border-red-400" : "border-slate-200"} border-2 border-slate-200 rounded-xl px-4 py-3 w-full h-48`}
                />
                {error && <Text className="text-red-500">{error}</Text>}
                <CustomPresseableText
                    stretch={true}
                    onPress={() => { }}
                    text="Continue"
                />
            </View>
        </RegisterLayout>
    );
}