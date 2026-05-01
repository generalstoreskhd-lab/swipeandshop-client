import { Pressable, Text } from "react-native";


interface PressableProps {
    stretch?: boolean;
    onPress: () => void;
    text: string;
    variant?: "primary" | "secondary";
}

export default function CustomPresseableText({ stretch, onPress, text, variant = "primary" }: PressableProps) {
    const isPrimary = variant === "primary";

    return (
        <Pressable
            onPress={onPress}
            className={`${stretch ? "self-stretch" : ""} rounded-[28px] mt-4 ${isPrimary ? "bg-orange-500 active:bg-orange-600 shadow-lg shadow-orange-950/40" : "bg-white/10 active:bg-white/15 border border-white/15"} py-4 items-center`}
        >
            <Text className={`text-base font-semibold ${isPrimary ? "text-white" : "text-white/90"}`}>{text}</Text>
        </Pressable>
    )
}
