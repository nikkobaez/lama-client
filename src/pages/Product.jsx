import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, addToCart } from "../redux/cartRedux";
import { logout } from "../redux/userRedux";
import { emptyWishlist } from "../redux/wishlistRedux";
import { FaPlus, FaMinus } from "../assets"
import { Navbar, Announcement, Newsletter, Footer } from "../components"
import axios from "axios"

const Product = () => {
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.user.currentUser)
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [productid, setProductid] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleQuantity = (type) => {
        if (type === "decrease" && quantity !== 1) {
            setQuantity(quantity - 1)
        } 
        
        if (type === "increase") {
            setQuantity(quantity + 1)
        }
    }

    const handleSize = (event) => {
        const productIndex = product.size.indexOf(event.target.value)
        setSize(event.target.value)
        setProductid(product.productid[productIndex])
    }

    /* UPDATE A USERS CART */  
    useEffect(() => {
        if (user) {
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
        }
    }, [user, cart, dispatch, navigate])

    /* GET A PRODUCT */
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get("https://lama-server-1826f3f97416.herokuapp.com/products/find/" + id)
                setProduct(res.data)
                setColor(res.data.color[0])
                setSize(res.data.size[0])
                setProductid(res.data.productid[0])
            } catch (error) {
                console.log(error.message)
            }
        }
        getProduct()
    }, [id])

    return (
        <div>
            <Announcement />
            <Navbar />
            <div className='flex flex-col p-12 md:flex-row'>
                {/* IMAGE CONTAINER */}
                <div className='flex-1'>
                    <img src={product.img} alt="t-shirt" className='h-[90vh] w-full object-contain'/>
                </div>
                {/* INFORMATION CONTAINER */}
                <div className='flex-1 p-12'>
                    <h1 className='text-3xl font-light'>
                        {product.title}
                    </h1>
                    <p className='my-5'> 
                        {product.desc}
                    </p>
                    <p className='text-2xl font-extralight'>
                        ${product.price}.00
                    </p>
                    {/* FILTERS */}
                    <div className='flex flex-col justify-between w-1/2 my-10 lg:flex-row'>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-xl'> 
                                Color 
                            </h1>
                            {product.color?.map((color) => (
                                <div style={{ width: '24px', height: '24px', backgroundColor: color, borderRadius: '50%', cursor: 'pointer' }} key={color} onClick={() => setColor(color)}/>
                            ))}
                        </div>
                        <div className='flex items-center mt-6 lg:my-0'>
                            <h1 className='text-xl'> 
                                Size 
                            </h1>
                            <select className='p-1 ml-3 border' onChange={handleSize}>
                                {product.size?.map((size) => (
                                    <option value={size} key={size}> {size} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* ADD PRODUCTS */}
                    <div className="flex flex-col items-center justify-between xl:w-1/2 xl:flex-row">
                        <div className='flex items-center gap-3 font-semibold'>
                            <div className="cursor-pointer" onClick={() => handleQuantity("decrease")}>
                                <FaMinus size={20}/>
                            </div>
                            <p className='flex items-center justify-center w-8 h-8 font-light border border-gray-600 rounded-md'>
                                {quantity}
                            </p>
                            <div className="cursor-pointer" onClick={() => handleQuantity("increase")}>
                                <FaPlus size={18} />
                            </div>
                        </div>
                        <button className="p-3 my-6 bg-white border-2 border-gray-600 xl:my-0" onClick={() => {
                            if (user) {
                                dispatch (addToCart({ ...product, quantity, color, size, productid }))
                            } else {
                                navigate("/login")
                            }
                        }}> 
                            ADD TO CART 
                        </button>
                    </div>
                </div>
            </div>
            <div>

            </div>
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Product