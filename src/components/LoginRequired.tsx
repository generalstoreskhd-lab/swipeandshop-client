import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import HomeLayout from '../layouts/HomeLayout';
import { translations } from '../constants/translations';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import CustomPresseableText from './CustomPresseable';

export default function LoginRequired() {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.settings);
  const t = translations[language];

  return (
    <HomeLayout scrollable={false} showSearch={false} showBadge={false}>
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-full rounded-[32px] border border-white/15 bg-white/10 px-6 py-8 items-center">
          <View className="bg-white/10 border border-white/15 p-6 rounded-full mb-6">
            <Ionicons name="lock-closed" size={48} color="#fb923c" />
          </View>

          <Text className="text-2xl font-bold text-white text-center mb-2">
            {t.loginRequired}
          </Text>

          <Text className="text-base text-white/65 text-center mb-8 leading-6">
            {t.joinDescription}
          </Text>

          <CustomPresseableText
            stretch={true}
            onPress={() => dispatch(logout())}
            text={t.signInRegister}
          />

          <View className="mt-6 flex-row items-center">
            <Text className="text-white/55">Already have an account? </Text>
            <Pressable onPress={() => dispatch(logout())}>
              <Text className="text-orange-300 font-semibold text-base">Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </HomeLayout>
  );
}
