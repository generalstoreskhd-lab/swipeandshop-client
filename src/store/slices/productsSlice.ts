import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Dummy Categorized Products
export interface Product {
    id: string;
    image: any;
    category: string;
    name: string;
    price: number;
    rating: number;
    description?: string;
}

interface ProductsState {
    items: Product[];
    selectedCategory: string | null;
    sortOrder: 'none' | 'price-asc' | 'price-desc';
    searchQuery: string;
}

const initialState: ProductsState = {
    items: [
        {
            id: "1",
            image: require("../../assets/images/products/earbuds.png"),
            category: "Snacks",
            name: "Wireless Earbuds Pro",
            price: 129.00,
            rating: 4.8
        },
        {
            id: "2",
            image: require("../../assets/images/products/shirt.png"),
            category: "Stationary",
            name: "Minimalist Linen Shirt",
            price: 45.00,
            rating: 4.5
        },
        {
            id: "3",
            image: require("../../assets/images/products/lamp.png"),
            category: "Household",
            name: "Ceramic Table Lamp",
            price: 78.00,
            rating: 4.9
        },
        {
            id: "4",
            image: require("../../assets/images/products/serum.png"),
            category: "Personal Care",
            name: "Organic Skin Serum",
            price: 32.50,
            rating: 4.7
        },
        {
            id: "5",
            image: require("../../assets/images/products/earbuds.png"),
            category: "Snacks",
            name: "Gourmet Almonds",
            price: 12.00,
            rating: 4.6
        },
        {
            id: "6",
            image: require("../../assets/images/products/shirt.png"),
            category: "Stationary",
            name: "Premium Notebook",
            price: 15.00,
            rating: 4.8
        },
        {
            id: "7",
            image: require("../../assets/images/products/lamp.png"),
            category: "Household",
            name: "Scented Candle",
            price: 22.00,
            rating: 4.4
        },
        {
            id: "8",
            image: require("../../assets/images/products/serum.png"),
            category: "Personal Care",
            name: "Shea Butter Cream",
            price: 28.00,
            rating: 4.9
        }
    ],
    selectedCategory: null,
    sortOrder: 'none',
    searchQuery: "",
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
        setSortOrder: (state, action: PayloadAction<'none' | 'price-asc' | 'price-desc'>) => {
            state.sortOrder = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setCategory, setSortOrder, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
