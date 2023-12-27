import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"
import Product from './pages/Product'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
    const user = useSelector((state) => state.user.currentUser)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/products" element={<ProductList />}/>
                <Route path="/products/:category" element={<ProductList />}/>
                <Route path="/product/:id" element={ <Product />}/>
                <Route path="/cart/:id" element={!user ? <Navigate to="/login"/> : <Cart />}/>
                <Route path="/wishlist/:id" element={!user ? <Navigate to="/login"/> : <Wishlist />}/>
                <Route path="/login" element={user ?  <Navigate to="/"/> : <Login/>}/>
                <Route path="/register" element={user ?  <Navigate to="/"/> : <Register />}/>
                <Route path="/success" element={<Success/>}/>
                <Route path="/cancel" element={<Cancel/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
