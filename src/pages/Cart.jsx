import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSessionId, emptyCart, setCart, addProduct, removeProduct } from "../redux/cartRedux";
import { logout } from "../redux/userRedux";
import { emptyWishlist } from "../redux/wishlistRedux";
import { FaPlus, FaMinus } from "../assets";
import { Announcement, Navbar, Footer } from "../components"
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import uuid from "react-uuid"

const Cart = () => {
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.user.currentUser)
    const cartQuantity = useSelector((state) => state.cart.quantity)
    const wishlistQuantity = useSelector((state) => state.wishlist.quantity)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /* UPDATE A USERS CART */  
    useEffect(() => {
        const headers = {
            "token": `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
        };

        const updateCart = async () => {
            try {
                await axios.put("https://lama-server-1826f3f97416.herokuapp.com/cart/" + user._id + "/" + cart.id, cart.products, { headers })
            } catch (error) { 
                if (error.response.status === 401) {
                    dispatch(logout())
                    dispatch(emptyCart())
                    dispatch(emptyWishlist())
                    navigate("/login")
                }
                console.log(error.message)
            }
        }
        
        updateCart()
    }, [user._id, user.accessToken, cart, dispatch, navigate])

    /* GET A USERS CART */
    useEffect(() => {
        const headers = {
            "token": `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
        };

        const getCart = async () => {
            try {
                const res = await axios.get("https://lama-server-1826f3f97416.herokuapp.com/cart/find/" + user._id, { headers })
                dispatch(setCart(res.data))
            } catch (error) {
                if (error.response.status === 401) {
                    dispatch(logout())
                    dispatch(emptyCart())
                    dispatch(emptyWishlist())
                    navigate("/login")
                }
                console.log(error.message)
            }
        }
        
        getCart()
    }, [user._id, user.accessToken, dispatch, navigate])


    const selectProductIdandQuantity = (product) => {
        const { productid, quantity } = product
        return { price: productid[0], quantity }
    }

    /* CHECKOUT WITH STRIPE */
    const handleCheckOut = async () => {
        try {
            const res = await axios.post("https://lama-server-1826f3f97416.herokuapp.com/stripe/create-checkout-session", {
                customerEmail: user.email,
                lineItems: cart.products.map(selectProductIdandQuantity),
                mode: "payment",
                successUrl: `${window.location.origin}/success`, 
                cancelUrl: `${window.location.origin}/cancel`,
            });

            dispatch(addSessionId(res.data.sessionId))

            let stripePromise;

            const getStripe = () => {
                if (!stripePromise) {
                    stripePromise = loadStripe("pk_test_51OQDqQCg8KZTt8QFYJdTAwMbHfyiS4PduRHExAwIzCCQuwGWiLlioAcC3ICVHjiEzI6aarKGSA2J137tfovesdix00uhqwkQWV")
                }
                return stripePromise;
            }

            const stripe = await getStripe()
            const { error } = await stripe.redirectToCheckout({
                sessionId: res.data.sessionId
            })
            console.log(error)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <Announcement />
            <Navbar />
            <div className='p-5'>
                <h1 className='text-3xl text-center font-extralight'> 
                    YOUR CART 
                </h1>
                {/* TOP CONTAINER */}
                <div className='flex items-center justify-between my-10 sm:my-5'>
                    <button className='px-3 py-2 font-semibold border-2 border-black' onClick={() => navigate("/products")}>
                        CONTINUE SHOPPING
                    </button>
                    <div className='flex'>
                        <Link to={"/cart/" + user._id}>
                            <p className='flex mx-3 underline cursor-pointer'>
                                Cart ({cartQuantity})
                            </p>
                        </Link>
                        <Link to={"/wishlist/" + user._id}>
                            <p className='flex mx-3 underline cursor-pointer'>
                                Wishlist ({wishlistQuantity})
                            </p>
                        </Link>
                    </div>
                    <button className='px-3 py-2 font-semibold text-white bg-black border-2 border-black' onClick={() => {
                        handleCheckOut()
                    }}>
                        CHECKOUT NOW
                    </button>
                </div>
                {/* BOTTOM CONTAINER */}
                <div className='flex flex-col justify-between lg:flex-row'>
                    <div className='mt-5 flex-[3]'>
                        {cart.products.length === 0 && (
                            <div className="flex items-center justify-center w-full h-[30vh] lg:h-full mb-5 lg:mb-0">
                                <p> Your cart is empty </p>
                            </div>
                        )}

                        {cart.products.map((product) => (
                            <div key={uuid()}>
                                <div className='flex flex-col justify-between md:flex-row'>
                                    {/* PRODUCT DETAILS */}
                                    <div className='flex sm:flex-row flex-col justify-center items-center sm:justify-start sm:items-start flex-[2]'>
                                        <img src={product.img} alt="t-shirt" className='w-[200px]'/>
                                        <div className='flex flex-col justify-around gap-8 p-5'>
                                            <p> <b>Product</b>: {product.title} </p>
                                            <p> <b>ID</b>: {product._id} </p>
                                            <div style={{ width: '24px', height: '24px', backgroundColor: product.color, borderRadius: '50%', cursor: 'pointer' }} />
                                            <p> <b>Size</b>: {product.size} </p>
                                        </div>
                                    </div>
                                    {/* PRODUCT PRICE */}
                                    <div className='flex flex-col items-center justify-center flex-1'>
                                        <div className='flex items-center gap-3 my-5 font-semibold'>
                                            <div className="cursor-pointer" onClick={async () => {
                                                dispatch (removeProduct({product, quantity: 1 }))
                                            }}>
                                                <FaMinus size={20}/>
                                            </div>
                                            <p className='flex items-center justify-center w-8 h-8 text-lg font-light'>
                                                {product.quantity}
                                            </p>
                                            <div className="cursor-pointer" onClick={async () => {
                                                dispatch (addProduct({product, quantity: 1 }))
                                            }}>
                                                <FaPlus size={18} />
                                            </div>
                                        </div>
                                        <p className="text-xl font-extralight">
                                            ${product.price * product.quantity}.00
                                        </p>
                                    </div>
                                </div>
                                <hr className="my-5 h-[1px] border-none bg-[#eeeeee]"/>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col flex-1 gap-8 p-5 mt-5 border rounded-lg h-1/2'>
                        <h1 className="text-xl font-extralight"> 
                            ORDER SUMMARY 
                        </h1>
                        <div className="flex justify-between">
                            <p> Subtotal </p>
                            <p> ${cart.total}.00 </p>
                        </div>
                        <div className="flex justify-between">
                            <p> Estimated Shipping </p>
                            <p> {cart.products.length !== 0 ? "$9.99" : "$0.00"} </p>
                        </div>
                        <div className="flex justify-between">
                            <p> Discount </p>
                            <p> {cart.products.length !== 0 ? "-$9.99" : "$0.00"} </p>
                        </div>
                        {/* <div className="flex justify-between">
                            <p> Taxes </p>
                            <p> ${(cart.total * 0.0825).toFixed(2)} </p>
                        </div> */}
                        <div className="flex justify-between">
                            <p className="text-xl font-semibold"> Total </p>
                            <p className="text-xl font-semibold"> ${(cart.total).toFixed(2)} </p>
                        </div>
                        <button className="w-full px-3 py-2 text-white bg-black border-2 border-black" onClick={() => {
                            handleCheckOut()
                        }}>
                            CHECKOUT NOW
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart