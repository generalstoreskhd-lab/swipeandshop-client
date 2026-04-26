import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CartItem, { CartItemProps } from '../components/CartItem';
import LoginRequired from '../components/LoginRequired';
import { translations } from '../constants/translations';
import HomeLayout from '../layouts/HomeLayout';
import { useAppSelector } from '../store/hooks';

const INITIAL_CART_ITEMS: CartItemProps[] = [];

/**
 * CartScreen Component
 * 
 * Reverted to original state (content visible without login check).
 */
export default function CartScreen() {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const { language } = useAppSelector((state) => state.settings);

    if (!isLoggedIn) {
        return <LoginRequired />;
    }
    
    const t = translations[language];
    const [items, setItems] = useState(INITIAL_CART_ITEMS);

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const handleRemove = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 15.00 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <HomeLayout showSearch={false}>
            {/* Header */}
            <View className="px-4 pt-2 pb-4">
                <Text className="text-[10px] font-bold text-blue-500 uppercase tracking-widest font-inter mb-1">
                    {t.myShoppingBag}
                </Text>
                <Text className="text-2xl font-bold text-slate-900 font-outfit">
                    {t.cart} ({items.length})
                </Text>
            </View>

            {items.length > 0 ? (
                <View className="flex-1">
                    <ScrollView 
                        className="px-4 flex-1" 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        {items.map(item => (
                            <CartItem 
                                key={item.id} 
                                {...item} 
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemove}
                            />
                        ))}

                        {/* Order Summary Card */}
                        <View className="bg-white rounded-3xl p-5 mt-4 border border-slate-100 shadow-sm">
                            <Text className="text-base font-bold text-slate-900 font-outfit mb-4">{t.orderSummary}</Text>
                            
                            <View className="gap-y-3">
                                <SummaryRow label={t.subtotal} value={subtotal} />
                                <SummaryRow label={t.shipping} value={shipping} />
                                <SummaryRow label={t.tax} value={tax} />
                                <View className="h-[1px] bg-slate-50 w-full my-1" />
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-lg font-bold text-slate-900 font-outfit">{t.total}</Text>
                                    <Text className="text-xl font-bold text-blue-600 font-outfit">${total.toFixed(2)}</Text>
                                </View>
                            </View>

                            <TouchableOpacity className="bg-slate-900 w-full py-4 rounded-2xl items-center mt-6 shadow-md shadow-slate-300">
                                <Text className="text-white font-bold font-inter text-base">{t.proceedToCheckout}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View className="h-10" />
                    </ScrollView>
                </View>
            ) : (
                <View className="flex-1 items-center justify-center py-20 px-10">
                    <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center mb-6">
                        <Ionicons name="cart-outline" size={48} color="#94a3b8" />
                    </View>
                    <Text className="text-xl font-bold text-slate-900 font-outfit text-center mb-2">
                        {t.cartEmpty}
                    </Text>
                    <Text className="text-sm text-slate-500 font-inter text-center leading-5 mb-8">
                        {t.cartEmptyDesc}
                    </Text>
                    <TouchableOpacity 
                        onPress={() => setItems(INITIAL_CART_ITEMS)}
                        className="bg-slate-900 px-8 py-3 rounded-full"
                    >
                        <Text className="text-white font-bold font-inter text-sm">
                            {t.startShopping}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </HomeLayout>
    );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
    return (
        <View className="flex-row justify-between items-center">
            <Text className="text-sm text-slate-500 font-inter">{label}</Text>
            <Text className="text-sm font-bold text-slate-900 font-inter">${value.toFixed(2)}</Text>
        </View>
    );
}
