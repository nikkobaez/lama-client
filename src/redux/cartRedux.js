import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        sessionId: "",
        id: "",
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        removeSessionId: (state) => {
            state.sessionId = ""
        },
        removeCart: (state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        },
        addSessionId: (state, action) => {
            state.sessionId = action.payload
        },
        emptyCart: (state) => {
            state.id = ""
            state.products = []
            state.quantity = 0
            state.total = 0
        },
        setCart: (state, action) => {
            state.id = action.payload._id
            state.products = action.payload.products
            state.quantity = action.payload.products.length

            state.total = action.payload.products.reduce((total, product) => { 
                return total + product.price * product.quantity;
            }, 0);
        },
        addToCart: (state, action) => {
                const product = state.products.find((product) => product.productid === action.payload.productid)

                if (product) {
                    product.quantity += action.payload.quantity
                    state.total += action.payload.price * action.payload.quantity
                } else {
                    state.products.push(action.payload)
                    state.quantity += 1
                    state.total += action.payload.price * action.payload.quantity
                }
        },
        addProduct: (state, action) => {
            const product = state.products.find((product) => product._id === action.payload.product._id && product.size[0] === action.payload.product.size[0])

            product.quantity += action.payload.quantity
            state.total += action.payload.product.price * action.payload.quantity
        },
        removeProduct: (state,action) => {
            const product = state.products.find((product) => product._id === action.payload.product._id  && product.size[0] === action.payload.product.size[0])

            if (product.quantity === 1) {
                state.products = state.products.filter((product) => product._id !== action.payload.product._id || product.size[0] !== action.payload.product.size[0])
                state.quantity -= 1
                state.total -= action.payload.product.price * action.payload.quantity
            } else {
                product.quantity -= action.payload.quantity
                state.total -= action.payload.product.price * action.payload.quantity
            }
        },
    },
});

export const { removeCart, removeSessionId, addSessionId, emptyCart, setCart, addToCart, addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;


