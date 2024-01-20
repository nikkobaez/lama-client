import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/cartRedux";
import { logout } from "../redux/userRedux";
import { emptyWishlist, addToWishlist, removeFromWishList } from "../redux/wishlistRedux";
import { FaSearch, FaRegHeart, FaHeart } from "../assets";
import axios from "axios";

const Product = ({item}) => {
    const [favorite, setFavorite] = useState(false)
    const user = useSelector((state) => state.user.currentUser)
    const wishlist = useSelector((state) => state.wishlist)
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
    }, [user, wishlist, navigate, dispatch])

    /* UPDATE FAVORITED ICONS */
    useEffect(() => {
        if (wishlist.products.some((wishlistItem) => wishlistItem._id === item._id)) {
            setFavorite(true);
        }
    }, [item, wishlist.products])

    return (
        <div className="relative m-1 flex h-80 min-w-[250px] flex-1 items-center justify-center bg-[#e0f0f9]">
            {/* BACKGROUND CIRCLE */}
            <div className="absolute bg-white rounded-full h-52 w-52" />
            {/* PRODUCT IMAGE */}
            <img src={item.img} alt="popular products" className="z-10 h-3/4"/>
            {/* OVERLAY AND ICONS */}
            <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full gap-4 transition-all duration-500 bg-black opacity-0 cursor-pointer ease bg-opacity-20 hover:opacity-100">
                <div className="ease flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white transition-all duration-500 hover:scale-110 hover:bg-[#e9f5f5]" onClick={() => {
                    navigate(`/product/${item._id}`)
                }}>
                    <FaSearch size={18} />
                </div>

                {favorite === false && (
                    <div className="ease flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white transition-all duration-500 hover:scale-110 hover:bg-[#e9f5f5]" onClick={() => {
                        if (user) {
                            dispatch(addToWishlist(item))
                        } else {
                            navigate("/login")
                        }
                    }}>
                        <FaRegHeart size={20} color="black"/>
                    </div>
                )}
                
                {favorite === true && (
                    <div className="ease flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white transition-all duration-500 hover:scale-110 hover:bg-[#e9f5f5]" onClick={() => {
                        if (user) {
                            dispatch(removeFromWishList({product: item}))
                            setFavorite(false)
                        } else {
                            navigate("/login")
                        }
                    }}>
                        <FaHeart size={22} color="red"/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Product