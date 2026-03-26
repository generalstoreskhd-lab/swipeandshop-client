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
    items: [],
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
