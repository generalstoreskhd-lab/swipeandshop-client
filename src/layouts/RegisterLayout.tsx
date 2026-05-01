import React from "react";
import { ImageBackground, View } from "react-native";
import darkBackground from "../assets/dark.jpg";

export type RegisterlayoutProps = {
    children: React.ReactNode;
}

export const RegisterLayout = ({ children }: RegisterlayoutProps) => {
    return (

        <ImageBackground source={darkBackground} resizeMode="cover" className="flex-1 w-full h-full bg-black">
            <View className="flex-1 w-full h-full bg-black/55">
                {children}
            </View>
        </ImageBackground>


    );
}
