import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeLayout from '../layouts/HomeLayout';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { toggleLanguage } from '../store/slices/settingsSlice';
import { translations } from '../constants/translations';

/**
 * PreferencesScreen Component
 * 
 * Updated to show guest view when not logged in and support language switching.
 */
export default function PreferencesScreen() {
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const { language } = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();
    
    const t = translations[language];

    return (
        <HomeLayout showSearch={false}>
            {/* Header */}
            <View className="px-4 pt-2 pb-4">
                <Text className="text-[10px] font-bold text-blue-500 uppercase tracking-widest font-inter mb-1">
                    {t.settingsProfile}
                </Text>
                <Text className="text-2xl font-bold text-slate-900 font-outfit">
                    {t.preferences}
                </Text>
            </View>

            <ScrollView className="px-4">
                {!isLoggedIn ? (
                    /* Guest View / Call to Action */
                    <View className="mb-6">
                        <View className="bg-sky-500 rounded-3xl p-6 shadow-lg shadow-sky-200 overflow-hidden relative">
                            {/* Decorative Circle */}
                            <View className="absolute top-[-20] right-[-20] w-40 h-40 bg-sky-400 opacity-20 rounded-full" />
                            
                            <Text className="text-white text-2xl font-bold font-outfit mb-2">
                                {t.joinSwipeShop}
                            </Text>
                            <Text className="text-sky-50 text-sm font-inter mb-6 leading-5">
                                {t.joinDescription}
                            </Text>
                            
                            <TouchableOpacity 
                                className="bg-white px-6 py-3 rounded-xl items-center self-start"
                                onPress={() => dispatch(logout())} // Goes back to auth stack
                            >
                                <Text className="text-sky-500 font-bold font-inter">{t.getStarted}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View className="mt-8">
                            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest font-inter mb-3 ml-1">
                                {t.appSettings}
                            </Text>
                            <View className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
                                <SettingsItem icon="notifications-outline" label={t.pushNotifications} showBorder={true} />
                                <SettingsItem 
                                    icon="globe-outline" 
                                    label={t.language} 
                                    sublabel={language === 'en' ? 'English (US)' : 'മലയാളം'} 
                                    showBorder={true} 
                                    onPress={() => dispatch(toggleLanguage())}
                                />
                                <SettingsItem icon="help-circle-outline" label={t.helpSupport} showBorder={false} />
                            </View>
                        </View>
                    </View>
                ) : (
                    /* Logged-in View */
                    <>
                        {/* My Account Section */}
                        <View className="mb-6">
                            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest font-inter mb-3 ml-1">
                                {t.myAccount}
                            </Text>
                            <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                                <View className="flex-row items-center mb-4">
                                    <View className="w-14 h-14 bg-blue-100 rounded-full items-center justify-center mr-4">
                                        <Ionicons name="person" size={28} color="#2563eb" />
                                    </View>
                                    <View>
                                        <Text className="text-lg font-bold text-slate-900 font-outfit">{user?.name || 'Sreerag Sathian'}</Text>
                                        <Text className="text-sm text-slate-500 font-inter">{user?.email || 'sreerag@example.com'}</Text>
                                    </View>
                                    <TouchableOpacity className="ml-auto bg-slate-50 p-2 rounded-full border border-slate-100">
                                        <Ionicons name="pencil" size={18} color="#64748b" />
                                    </TouchableOpacity>
                                </View>
                                <View className="h-[1px] bg-slate-50 w-full mb-3" />
                                <SettingsItem icon="location-outline" label={t.manageAddresses} />
                                <SettingsItem icon="card-outline" label={t.paymentMethods} />
                                <SettingsItem icon="shield-checkmark-outline" label={t.securityPassword} />
                            </View>
                        </View>

                        {/* My Grievances Section */}
                        <View className="mb-6">
                            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest font-inter mb-3 ml-1">
                                {t.supportFeedback}
                            </Text>
                            <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                                <Text className="text-sm font-bold text-slate-900 font-outfit mb-3">{t.activeGrievances}</Text>
                                
                                <View className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-100">
                                    <View className="flex-row justify-between items-center mb-1">
                                        <Text className="text-xs font-bold text-slate-900 font-inter">Ticket #GR-1024</Text>
                                        <View className="bg-amber-100 px-2 py-0.5 rounded-full">
                                            <Text className="text-[10px] font-bold text-amber-600 uppercase">In Progress</Text>
                                        </View>
                                    </View>
                                    <Text className="text-xs text-slate-500 font-inter" numberOfLines={1}>
                                        Damaged product received for Order #8815...
                                    </Text>
                                </View>

                                <TouchableOpacity className="bg-blue-600 w-full py-3 rounded-xl items-center flex-row justify-center gap-x-2">
                                    <Ionicons name="add-circle-outline" size={20} color="white" />
                                    <Text className="text-white font-bold font-inter">{t.raiseGrievance}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Contact Us Section */}
                        <View className="mb-10">
                            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest font-inter mb-3 ml-1">
                                {t.contactUs}
                            </Text>
                            <View className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
                                <SettingsItem icon="mail-outline" label={t.emailSupport} sublabel="support@swipeandshop.com" showBorder={true} />
                                <SettingsItem icon="logo-whatsapp" label={t.whatsappChat} sublabel="+91 98765 43210" showBorder={true} />
                                <SettingsItem icon="call-outline" label={t.callHelpline} sublabel="1800-SHOP-NOW" showBorder={false} />
                                <SettingsItem 
                                    icon="globe-outline" 
                                    label={t.language} 
                                    sublabel={language === 'en' ? 'English (US)' : 'മലയാളം'} 
                                    showBorder={false} 
                                    onPress={() => dispatch(toggleLanguage())}
                                />
                            </View>
                        </View>

                        {/* Logout Button */}
                        <TouchableOpacity 
                            onPress={() => dispatch(logout())}
                            className="flex-row items-center justify-center p-4 bg-rose-50 rounded-2xl border border-rose-100 mb-10"
                        >
                            <Ionicons name="log-out-outline" size={20} color="#e11d48" className="mr-2" />
                            <Text className="text-rose-600 font-bold font-inter ml-2">{t.logout}</Text>
                        </TouchableOpacity>
                    </>
                )}

                <View className="h-10" />
            </ScrollView>
        </HomeLayout>
    );
}

/** Helper component for settings list items */
function SettingsItem({ icon, label, sublabel, showBorder = true, onPress }: { icon: any; label: string; sublabel?: string; showBorder?: boolean; onPress?: () => void }) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            disabled={!onPress}
            className={`flex-row items-center py-3.5 px-2 ${showBorder ? 'border-b border-slate-50' : ''}`}
        >
            <View className="w-8 h-8 rounded-lg bg-slate-50 items-center justify-center mr-3">
                <Ionicons name={icon} size={18} color="#64748b" />
            </View>
            <View className="flex-1">
                <Text className="text-sm font-semibold text-slate-700 font-inter">{label}</Text>
                {sublabel && <Text className="text-[11px] text-slate-400 font-inter mt-0.5">{sublabel}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
        </TouchableOpacity>
    );
}
