import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoCartOutline, IoBagHandleOutline } from "react-icons/io5";
import { removeSessionId, emptyCart } from "../redux/cartRedux";
import { emptyWishlist } from "../redux/wishlistRedux";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
    
const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const cartQuantity = useSelector((state) => state.cart.quantity)
    const wishlistQuantity = useSelector((state) => state.wishlist.quantity)
    const user = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='relative flex items-center justify-between w-screen h-16 px-5 py-3'>
            {/* LEFT NAVBAR */}
            <div className='items-center flex-1 hidden lg:flex'>
                <span className='text-base cursor-pointer'>
                    EN
                </span>
                <div className="ml-6 flex items-center border-[1px] border-gray-300 px-2 py-1">
                    <input type="text b" className="mr-2 border-0 outline-none"/>
                    <FaSearch size={15} color="black"/>
                </div>
            </div>
            {/* CENTER NAVBAR */}
            <div className='flex items-center justify-center w-full lg:w-fit'>
                <Link to="/">
                    <h1 className="text-2xl font-bold text-center cursor-pointer">
                        LAMA
                    </h1>
                </Link>
            </div>
            {/* RIGHT NAVBAR - L SCREEN */}
            <div className='items-center justify-end flex-1 hidden gap-6 lg:flex'>
                {
                    user ? 
                        (
                            <>
                                <p>
                                    Welcome back, {user.username}
                                </p>
                            </>
                        )
                    :
                        (
                            <>
                                <Link to="/register">
                                    <p className="text-base cursor-pointer">
                                        REGISTER
                                    </p>
                                </Link>
                                <Link to="/login">
                                    <p className="text-base cursor-pointer">
                                        SIGN IN
                                    </p>
                                </Link>
                            </>
                        )
                }
                    <div className="relative cursor-pointer w-fit" onClick={() => {
                        if (user) {
                            navigate(`/cart/${user._id}`)
                        } else {
                            navigate("/login")
                        }
                    }}>
                        <IoCartOutline size={25} color="black" />
                        {cartQuantity > 0 && (
                            <div className="absolute flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full -right-2 -top-1">
                                <span className="text-xs font-semibold">
                                    {cartQuantity}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="relative cursor-pointer w-fit" onClick={() => {
                        if (user) {
                            navigate(`/wishlist/${user._id}`)
                        } else {
                            navigate("/login")
                        }
                    }}>
                        <IoBagHandleOutline size={25} color="black" />
                        {wishlistQuantity > 0 && (
                            <div className="absolute flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full -right-2 -top-1">
                                <span className="text-xs font-semibold">
                                    {wishlistQuantity}
                                </span>
                            </div>
                        )}
                    </div>

                {
                    user && (
                        <button className="px-3 py-2 text-white bg-teal-600 rounded-md" onClick={() => {
                            dispatch(logout())
                            dispatch(emptyCart())
                            dispatch(emptyWishlist())
                            dispatch(removeSessionId())
                        }}>
                            Logout
                        </button>
                    )
                }
            </div>

            {/* RIGHT NAVBAR - S SCREEN */}
            <div className="absolute right-0 mx-5 cursor-pointer lg:hidden" onClick={() => setNavbar(true)}>
                <FaBars size={20}/>
            </div>

            {/* SIDE MODAL */}
            {
                navbar && (
                    <div className="fixed top-0 right-0 z-30 w-3/5 h-screen overflow-y-scroll bg-white shadow-2xl">
                        <div className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() => setNavbar(false)}>
                            <FaTimes size={20} color="black"/>
                        </div>
                        {
                            user && (
                                <div className="w-full h-24 p-0 sm:px-5 sm:pt-5">
                                    <div className="flex flex-col items-center justify-center gap-1 my-8 sm:my-0 sm:gap-6 sm:flex-row">
                                        <p className="my-3 text-center">
                                            Welcome back, {user.username}
                                        </p>
                                        <button className="px-3 py-2 text-white bg-teal-600 rounded-md" onClick={() => {
                                            dispatch(logout())
                                            dispatch(emptyCart())
                                            dispatch(emptyWishlist())
                                            dispatch(removeSessionId())
                                        }}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        
                        <ul className="flex flex-col w-full gap-8">
                            {
                                !user && (
                                    <>
                                        <li className="pb-3 mt-10 text-center cursor-pointer text-md sm:text-lg" onClick={() => navigate("/register")}>
                                            Register
                                        </li>
                                        <li className="pb-3 text-center cursor-pointer text-md sm:text-lg" onClick={() => navigate("/login")}>
                                            Sign In
                                        </li>
                                    </>
                                )
                            }
                            <li className="pb-3 text-center cursor-pointer text-md sm:text-lg" onClick={() => navigate("/")}> 
                                Home 
                            </li>
                            <li className="pb-3 text-center cursor-pointer text-md sm:text-lg" onClick={() => navigate("/products")}> 
                                Products 
                            </li>
                            <li className="flex items-center justify-center pb-3 text-center cursor-pointer text-md sm:text-lg" onClick={() => {
                                if (user) {
                                    navigate(`/cart/${user._id}`)
                                } else {
                                    navigate("/login")
                                }
                            }}> 
                                <div className="relative w-fit">
                                    <p> Cart </p>
                                    {cartQuantity > 0 && (
                                        <div className="absolute flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full -right-3 -top-1">
                                            <span className="text-xs font-semibold">
                                                {cartQuantity}
                                            </span>
                                        </div>
                                    )}
                                </div> 
                            </li>
                            <li className="flex items-center justify-center pb-3 text-center cursor-pointer text-md sm:text-lg" onClick={() => {
                                if (user) {
                                    navigate(`/wishlist/${user._id}`)
                                } else {
                                    navigate("/login")
                                }
                            }}> 
                                <div className="relative w-fit">
                                    <p> Wishlist </p>
                                    {wishlistQuantity > 0 && (
                                        <div className="absolute flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full -right-3 -top-1">
                                            <span className="text-xs font-semibold">
                                                {wishlistQuantity}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </li>
                            <li className="pb-3 text-center cursor-pointer text-md sm:text-lg"> Privacy Policy </li>
                            <li className="pb-3 mb-10 text-center cursor-pointer text-md sm:text-lg"> Terms of Conditions </li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default Navbar