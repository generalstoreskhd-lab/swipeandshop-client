import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type CategoryIconProps = {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
};

export default function CategoryIcon({ icon, name }: CategoryIconProps) {
  return (
    <View className="flex flex-col items-center justify-center gap-y-2 w-20">
      <View className="border border-sky-100 p-4 rounded-full bg-sky-50 shadow-sm items-center justify-center">
        <Ionicons name={icon} size={28} color="#0284c7" />
      </View>
      <Text className="text-xs font-medium text-slate-600 text-center font-inter" numberOfLines={2}>
        {name}
      </Text>
    </View>
  );
}
