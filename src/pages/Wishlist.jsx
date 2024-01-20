import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/cartRedux";
import { logout } from "../redux/userRedux";
import { emptyWishlist, setWishlist, removeFromWishList } from "../redux/wishlistRedux";
import { Announcement, Navbar, Footer } from "../components"
import axios from "axios";


const Wishlist = () => {
    const wishlist = useSelector((state) => state.wishlist)
    const user = useSelector((state) => state.user.currentUser)
    const cartQuantity = useSelector((state) => state.cart.quantity)
    const wishlistQuantity = useSelector((state) => state.wishlist.quantity)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /* UPDATE A USERS WISHLIST */  
    useEffect(() => {
        if (user && wishlist.id !== "") {
            const headers = {
                "token": `Bearer ${user.accessToken}`,
                "Content-Type": "application/json",
            };

            const updateWishlist = async () => {
                try {
                    await axios.put("https://lama-server-1826f3f97416.herokuapp.com/wishlist/" + user._id + "/" + wishlist.id, wishlist.products, { headers })
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
            
            updateWishlist()
        }
    }, [user, wishlist, dispatch, navigate])

    /* GET A USERS WISHLIST */
    useEffect(() => {
        const headers = {
            "token": `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
        };

        const getWishlist = async () => {
            try {
                const res = await axios.get("https://lama-server-1826f3f97416.herokuapp.com/wishlist/find/" + user._id, { headers })
                dispatch(setWishlist(res.data))
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
        
        getWishlist()
    }, [user._id, user.accessToken, dispatch, navigate])

    return (
        <div>
            <Announcement />
            <Navbar />
                <div className="p-5">
                    <h1 className='text-3xl text-center font-extralight'> 
                        YOUR WISHLIST 
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
                        <button className='px-3 py-2 font-semibold text-white bg-black border-2 border-black' onClick={() => navigate("/cart")}>
                            CHECKOUT NOW
                        </button>
                    </div>
                    {/* BOTTOM CONTAINER */}
                    <div className='flex flex-col justify-between lg:flex-row'>
                        <div className='mt-5 flex-[3]'>
                            {wishlist.products.length === 0 && (
                                <div className="flex items-center justify-center w-full h-[30vh]">
                                    <p> Your wishlist is empty </p>
                                </div>
                            )}
                            {wishlist.products.map((product) => (
                                <div key={product._id}>
                                    <div className='flex flex-col justify-between md:flex-row'>
                                        {/* PRODUCT DETAILS */}
                                        <div className='flex sm:flex-row flex-col justify-center items-center sm:justify-start sm:items-start flex-[2]'>
                                            <img src={product.img} alt="t-shirt" className='w-[200px]'/>
                                            <div className='flex flex-col justify-around gap-8 p-5'>
                                                <p> <b>Product</b>: {product.title} </p>
                                                <p> <b>ID</b>: {product._id} </p>
                                                <div style={{ width: '24px', height: '24px', backgroundColor: product.color, borderRadius: '50%' }} />
                                                <p> <b>Size</b>: {product.size.map((size) => size + " " )} </p>
                                            </div>
                                        </div>
                                        {/* PRODUCT OPTIONS */}
                                        <div className="flex flex-col items-center justify-center flex-1 gap-6">
                                            <Link to={"/product/" + product._id} className="flex items-center justify-center w-3/5 px-3 py-2 mt-6 font-semibold border border-black cursor-pointer md:my-0 text-md">
                                                <p> 
                                                    VIEW ITEM
                                                </p>
                                            </Link>
                                            <p className="flex items-center justify-center w-3/5 px-3 py-2 font-semibold text-red-400 border border-red-400 cursor-pointer text-md" onClick={() => {
                                                dispatch(removeFromWishList({product}))
                                            }}> 
                                                REMOVE ITEM
                                            </p>
                                        </div>
                                    </div>
                                    <hr className="my-5 h-[1px] border-none bg-[#eeeeee]"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default Wishlist