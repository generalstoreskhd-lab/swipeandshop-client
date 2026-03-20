import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  type: 'order' | 'wishlist' | 'promo' | 'system';
  title: string;
  body: string;
  timeAgo: string;
  isRead: boolean;
  product?: {
    name: string;
    imageUri: string;
    currentPrice: number;
    originalPrice?: number;
  };
  actions?: Array<{
    label: string;
    variant: 'primary' | 'secondary';
  }>;
}

interface NotificationsState {
  items: Notification[];
}

const DUMMY_NOTIFICATIONS: Notification[] = [
    {
        type: 'order',
        title: 'Order #8829\nShipped',
        body: 'Your Ethereal Silk Scarf has been dispatched and is on its way to your gallery. Track your delivery in real-time.',
        timeAgo: 'Just now',
        isRead: false,
        actions: [
            { label: 'Track\nPackage', variant: 'primary' },
            { label: 'View\nOrder', variant: 'secondary' },
        ],
    },
    {
        type: 'wishlist',
        title: 'Wishlist Price Drop',
        body: 'The "Marble Study No. 4" you saved has decreased in price by 15%. Grab it before it\'s gone.',
        timeAgo: '2h ago',
        isRead: false,
        product: {
            name: 'Marble Study No. 4',
            imageUri: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=120&q=80',
            currentPrice: 425.00,
            originalPrice: 500.00,
        },
    },
    {
        type: 'promo',
        title: "Exclusive Collector's Access",
        body: 'As a preferred merchant partner, you have early access to the Spring Curated Collection. Browse 40+ new pieces before they go live.',
        timeAgo: 'Yesterday',
        isRead: false,
        actions: [
            { label: 'Browse Collection', variant: 'primary' },
        ],
    },
    {
        type: 'order',
        title: 'Order #8815 Delivered',
        body: 'Your Artisan Vase Set has been delivered successfully. We hope you love it!',
        timeAgo: '2d ago',
        isRead: true,
        actions: [
            { label: 'Leave Review', variant: 'secondary' },
        ],
    },
    {
        type: 'system',
        title: 'Account Security Update',
        body: 'We\'ve enhanced our security protocols. Please review your account settings to enable two-factor authentication.',
        timeAgo: '3d ago',
        isRead: true,
    },
    {
        type: 'wishlist',
        title: 'Back in Stock',
        body: 'Great news! The "Coastal Breeze Canvas" is back in stock with limited availability. Don\'t miss out this time.',
        timeAgo: '5d ago',
        isRead: true,
    },
];

const initialState: NotificationsState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.items = action.payload;
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      if (state.items[action.payload]) {
        state.items[action.payload].isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => {
        n.isRead = true;
      });
    },
    clearAll: (state) => {
      state.items = [];
    },
    restoreDummyData: (state) => {
        state.items = DUMMY_NOTIFICATIONS;
    }
  },
});

export const { setNotifications, markAsRead, markAllAsRead, clearAll, restoreDummyData } = notificationsSlice.actions;
export default notificationsSlice.reducer;
