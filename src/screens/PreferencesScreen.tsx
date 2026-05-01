import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeLayout from '../layouts/HomeLayout';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { toggleLanguage } from '../store/slices/settingsSlice';
import { translations } from '../constants/translations';
import { signOutUser } from '../firebase/auth';

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
                <Text className="text-[10px] font-bold text-orange-300 uppercase tracking-widest font-inter mb-1">
                    {t.settingsProfile}
                </Text>
                <Text className="text-2xl font-bold text-white font-outfit">
                    {t.preferences}
                </Text>
            </View>

            <ScrollView className="px-4">
                {!isLoggedIn ? (
                    /* Guest View / Call to Action */
                    <View className="mb-6">
                        <View className="bg-white/10 border border-white/15 rounded-[32px] p-6 shadow-lg overflow-hidden relative">
                            <Text className="text-white text-2xl font-bold font-outfit mb-2">
                                {t.joinSwipeShop}
                            </Text>
                            <Text className="text-white/65 text-sm font-inter mb-6 leading-5">
                                {t.joinDescription}
                            </Text>
                            
                            <TouchableOpacity 
                                className="bg-orange-500 px-6 py-3 rounded-[22px] items-center self-start"
                                onPress={() => dispatch(logout())} // Goes back to auth stack
                            >
                                <Text className="text-white font-bold font-inter">{t.getStarted}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View className="mt-8">
                            <Text className="text-xs font-bold text-white/45 uppercase tracking-widest font-inter mb-3 ml-1">
                                {t.appSettings}
                            </Text>
                            <View className="bg-white/10 rounded-[28px] p-2 shadow-sm border border-white/15">
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
                            <Text className="text-xs font-bold text-white/45 uppercase tracking-widest font-inter mb-3 ml-1">
                                {t.myAccount}
                            </Text>
                            <View className="bg-white/10 rounded-[28px] p-4 shadow-sm border border-white/15">
                                <View className="flex-row items-center mb-4">
                                    <View className="w-14 h-14 bg-white/10 border border-white/15 rounded-full items-center justify-center mr-4">
                                        <Ionicons name="person" size={28} color="#fb923c" />
                                    </View>
                                    <View>
                                        <Text className="text-lg font-bold text-white font-outfit">{user?.name || 'Sreerag Sathian'}</Text>
                                        <Text className="text-sm text-white/55 font-inter">{user?.email || 'sreerag@example.com'}</Text>
                                    </View>
                                    <TouchableOpacity className="ml-auto bg-white/10 p-2 rounded-full border border-white/15">
                                        <Ionicons name="pencil" size={18} color="#ffffff" />
                                    </TouchableOpacity>
                                </View>
                                <View className="h-[1px] bg-white/10 w-full mb-3" />
                                <SettingsItem icon="location-outline" label={t.manageAddresses} />
                                <SettingsItem icon="card-outline" label={t.paymentMethods} />
                                <SettingsItem icon="shield-checkmark-outline" label={t.securityPassword} />
                            </View>
                        </View>

                        {/* My Grievances Section */}
                        <View className="mb-6">
                            <Text className="text-xs font-bold text-white/45 uppercase tracking-widest font-inter mb-3 ml-1">
                                {t.supportFeedback}
                            </Text>
                            <View className="bg-white/10 rounded-[28px] p-4 shadow-sm border border-white/15">
                                <Text className="text-sm font-bold text-white font-outfit mb-3">{t.activeGrievances}</Text>
                                
                                <View className="bg-black/35 rounded-2xl p-3 mb-3 border border-white/10">
                                    <View className="flex-row justify-between items-center mb-1">
                                        <Text className="text-xs font-bold text-white font-inter">Ticket #GR-1024</Text>
                                        <View className="bg-amber-100 px-2 py-0.5 rounded-full">
                                            <Text className="text-[10px] font-bold text-amber-600 uppercase">In Progress</Text>
                                        </View>
                                    </View>
                                    <Text className="text-xs text-white/55 font-inter" numberOfLines={1}>
                                        Damaged product received for Order #8815...
                                    </Text>
                                </View>

                                <TouchableOpacity className="bg-orange-500 w-full py-3 rounded-[22px] items-center flex-row justify-center gap-x-2">
                                    <Ionicons name="add-circle-outline" size={20} color="white" />
                                    <Text className="text-white font-bold font-inter">{t.raiseGrievance}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Contact Us Section */}
                        <View className="mb-10">
                            <Text className="text-xs font-bold text-white/45 uppercase tracking-widest font-inter mb-3 ml-1">
                                {t.contactUs}
                            </Text>
                            <View className="bg-white/10 rounded-[28px] p-2 shadow-sm border border-white/15">
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
                            onPress={async () => {
                                await signOutUser();
                                dispatch(logout());
                            }}
                            className="flex-row items-center justify-center p-4 bg-rose-500/15 rounded-[24px] border border-rose-400/20 mb-10"
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
            className={`flex-row items-center py-3.5 px-2 ${showBorder ? 'border-b border-white/10' : ''}`}
        >
            <View className="w-8 h-8 rounded-lg bg-white/10 items-center justify-center mr-3">
                <Ionicons name={icon} size={18} color="#fb923c" />
            </View>
            <View className="flex-1">
                <Text className="text-sm font-semibold text-white/85 font-inter">{label}</Text>
                {sublabel && <Text className="text-[11px] text-white/45 font-inter mt-0.5">{sublabel}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ffffff80" />
        </TouchableOpacity>
    );
}
