import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { translations } from '../constants/translations';
import { Ionicons } from '@expo/vector-icons';
import CustomPresseableText from './CustomPresseable';

export default function LoginRequired() {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.settings);
  
  const t = translations[language];

  return (
    <View className="flex-1 bg-white items-center justify-center px-8">
      <View className="bg-sky-50 p-6 rounded-full mb-6">
        <Ionicons name="lock-closed" size={48} color="#0ea5e9" />
      </View>
      
      <Text className="text-2xl font-bold text-slate-900 text-center mb-2">
        {t.loginRequired}
      </Text>
      
      <Text className="text-base text-slate-500 text-center mb-8 leading-6">
        {t.joinDescription}
      </Text>

      <CustomPresseableText
        stretch={true}
        onPress={() => dispatch(logout())} // Logout resets isGuest and isLoggedIn, taking us back to RootNavigation
        text={t.signInRegister}
      />

      <View className="mt-6 flex-row items-center">
        <Text className="text-slate-400">Already have an account? </Text>
        <Pressable onPress={() => dispatch(logout())}>
          <Text className="text-sky-500 font-semibold text-base">{t.cartEmpty ? 'Login' : 'ലോഗിൻ'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
