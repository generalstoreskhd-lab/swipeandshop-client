import { Pressable, Text } from "react-native";


interface PressableProps {
    stretch?: boolean;
    onPress: () => void;
    text: string;

}

export default function CustomPresseableText({ stretch, onPress, text }: PressableProps) {
    return (
        <Pressable
            onPress={onPress}
            className={`${stretch ? "self-stretch" : ""} rounded-xl mt-4 bg-sky-500 active:bg-sky-600 shadow-md shadow-sky-200 py-4 items-center`}
        >
            <Text className="text-base font-semibold text-white">{text}</Text>
        </Pressable>
    )
}
