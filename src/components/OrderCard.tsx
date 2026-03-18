import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface OrderItem {
    name: string;
    quantity: number;
    unit: string;
    price: number;
}

interface OrderCardProps {
    orderId: string;
    items: OrderItem[];
    status: OrderStatus;
    date: string;
}

const STATUS_CONFIG: Record<OrderStatus, { bg: string; text: string; color: string; icon: string }> = {
    Processing: { bg: 'bg-amber-50', text: 'text-amber-600', color: '#d97706', icon: 'time-outline' },
    Shipped:    { bg: 'bg-sky-50',   text: 'text-sky-600',   color: '#0284c7', icon: 'airplane-outline' },
    Delivered:  { bg: 'bg-emerald-50', text: 'text-emerald-600', color: '#059669', icon: 'checkmark-circle-outline' },
    Cancelled:  { bg: 'bg-rose-50',  text: 'text-rose-600',  color: '#e11d48', icon: 'close-circle-outline' },
};

/** Max items to show before collapsing into a "View All" button */
const MAX_PREVIEW_ITEMS = 2;

export default function OrderCard({ orderId, items, status, date }: OrderCardProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const statusStyle = STATUS_CONFIG[status];

    const orderTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const previewItems = items.slice(0, MAX_PREVIEW_ITEMS);
    const hasMore = items.length > MAX_PREVIEW_ITEMS;

    const renderItemRow = (item: OrderItem, index: number) => (
        <View key={index} className="flex flex-row items-center justify-between py-2 border-b border-slate-50">
            <View className="flex-1 mr-3">
                <Text className="text-slate-900 text-sm font-medium font-outfit" numberOfLines={1}>
                    {item.name}
                </Text>
                <Text className="text-slate-400 text-xs font-inter">
                    {item.quantity} {item.unit} × ${item.price.toFixed(2)}
                </Text>
            </View>
            <Text className="text-slate-900 font-bold text-sm font-outfit">
                ${(item.quantity * item.price).toFixed(2)}
            </Text>
        </View>
    );

    return (
        <>
            <View className="bg-white rounded-2xl shadow-sm border border-slate-100 mx-4 mb-3 overflow-hidden">
                {/* Header: Order ID + Status */}
                <View className="flex flex-row items-center justify-between px-4 pt-3 pb-2">
                    <View>
                        <Text className="text-slate-900 font-bold text-sm font-outfit">
                            Order #{orderId}
                        </Text>
                        <Text className="text-slate-400 text-[10px] font-medium font-inter mt-0.5">{date}</Text>
                    </View>
                    <View className={`${statusStyle.bg} px-3 py-1.5 rounded-full flex flex-row items-center gap-x-1`}>
                        <Ionicons name={statusStyle.icon as any} size={12} color={statusStyle.color} />
                        <Text className={`${statusStyle.text} text-[10px] font-bold font-inter`}>{status}</Text>
                    </View>
                </View>

                {/* Item Preview List */}
                <View className="px-4">
                    {previewItems.map(renderItemRow)}
                </View>

                {/* Footer: Total + Actions */}
                <View className="flex flex-row items-center justify-between px-4 py-3">
                    <View>
                        <Text className="text-slate-400 text-[10px] font-inter uppercase tracking-wider">Total</Text>
                        <Text className="text-slate-900 font-bold text-base font-outfit">${orderTotal.toFixed(2)}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-x-3">
                        {hasMore && (
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                className="flex flex-row items-center gap-x-1 bg-slate-100 px-3 py-1.5 rounded-full"
                            >
                                <Text className="text-slate-600 text-xs font-bold font-inter">
                                    +{items.length - MAX_PREVIEW_ITEMS} more
                                </Text>
                                <Ionicons name="chevron-forward" size={12} color="#475569" />
                            </TouchableOpacity>
                        )}
                        {status === 'Delivered' && (
                            <TouchableOpacity className="flex flex-row items-center gap-x-1">
                                <Ionicons name="refresh-outline" size={14} color="#0ea5e9" />
                                <Text className="text-sky-500 text-xs font-bold font-inter">Reorder</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            {/* Full Order Details Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    className="flex-1 bg-black/40 justify-end"
                    onPress={() => setModalVisible(false)}
                >
                    <Pressable
                        className="bg-white rounded-t-3xl max-h-[75%]"
                        onPress={() => {}} // Prevent close when pressing inside
                    >
                        {/* Modal Header */}
                        <View className="flex flex-row items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
                            <View>
                                <Text className="text-slate-900 font-bold text-lg font-outfit">
                                    Order #{orderId}
                                </Text>
                                <Text className="text-slate-400 text-xs font-inter mt-0.5">{date}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="bg-slate-100 p-2 rounded-full"
                            >
                                <Ionicons name="close" size={20} color="#334155" />
                            </TouchableOpacity>
                        </View>

                        {/* Status Banner */}
                        <View className={`${statusStyle.bg} mx-6 mt-3 px-4 py-2.5 rounded-xl flex flex-row items-center gap-x-2`}>
                            <Ionicons name={statusStyle.icon as any} size={16} color={statusStyle.color} />
                            <Text className={`${statusStyle.text} text-sm font-bold font-inter`}>{status}</Text>
                        </View>

                        {/* Full Items List */}
                        <ScrollView className="px-6 mt-2" showsVerticalScrollIndicator={false}>
                            <Text className="text-slate-400 text-[10px] font-bold font-inter uppercase tracking-wider mt-3 mb-1">
                                {items.length} Item{items.length > 1 ? 's' : ''}
                            </Text>
                            {items.map(renderItemRow)}

                            {/* Total */}
                            <View className="flex flex-row items-center justify-between py-4 border-t border-slate-100 mt-2">
                                <Text className="text-slate-500 font-bold text-sm font-inter">Order Total</Text>
                                <Text className="text-slate-900 font-bold text-xl font-outfit">${orderTotal.toFixed(2)}</Text>
                            </View>

                            {/* Bottom spacer */}
                            <View className="h-8" />
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}
