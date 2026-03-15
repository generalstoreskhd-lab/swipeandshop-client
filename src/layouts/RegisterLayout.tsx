import React from "react";
import { View } from "react-native";

export type RegisterlayoutProps = {
    children: React.ReactNode;
}

export const RegisterLayout = ({ children }: RegisterlayoutProps) => {
    return (

        <View className="flex-1 w-full h-full bg-slate-50 p-8">
            {children}
        </View>


    );
}