import { createSlice } from "@reduxjs/toolkit"

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        id: "",
        products: [],
        quantity: 0,
    },
    reducers: {
        emptyWishlist: (state) => {
            state.id = ""
            state.products = []
            state.quantity = 0
        },
        setWishlist: (state, action) => {
            state.id = action.payload._id
            state.products = action.payload.products
            state.quantity = action.payload.products.length
        },
        addToWishlist: (state, action) => {
            const product = state.products.find((product) => product._id === action.payload._id)

            if (!product) {
                state.products.push(action.payload)
                state.quantity += 1
            } 
        },
        removeFromWishList: (state, action) => {
            const product = state.products.find((product) => product._id === action.payload.product._id)

            if (product) {
                state.products = state.products.filter((product) => product._id !== action.payload.product._id)
                state.quantity -= 1
            }
        }
    },
});

export const { emptyWishlist, setWishlist, addToWishlist, removeFromWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
