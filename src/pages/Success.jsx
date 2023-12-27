import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { removeCart, removeSessionId } from "../redux/cartRedux"
import axios from "axios"

const Success = () => {
    const [stripeResponse, setStripeResponse] = useState(null)
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const selectProductDetails = (product) => {
        const { productid, title, color, size, quantity } = product
        return { productid: productid[0], title, color: color[0], size: size[0], quantity }
    }

    /* CREATE AN ORDER AND UPDATE CART */
    useEffect(() => {
        if (stripeResponse) {
            const createOrder = async () => {
                try {
                    console.log("creating order")
                    await axios.post("https://lama-server-1826f3f97416.herokuapp.com/order", {
                        email: stripeResponse.data.customer_details.email,
                        products: cart.products.map(selectProductDetails),
                        amount: stripeResponse.data.amount_total,
                        address: stripeResponse.data.customer_details.address
                    })

                    const headers = {
                        "token": `Bearer ${user.accessToken}`,
                        "Content-Type": "application/json",
                    };
                    console.log("updating cart")
                    await axios.put("https://lama-server-1826f3f97416.herokuapp.com/cart/" + user._id + "/" + cart.id, [], { headers })
                } catch(error) {
                    console.log(error.message)
                }
        }
        createOrder()
        }
    }, [cart.products, stripeResponse])

    /* GET STRIPE ORDER ID */
    useEffect(() => {
        const getSession = async () => {
            try {
                const res = await axios.post("https://lama-server-1826f3f97416.herokuapp.com/stripe/retrieve-checkout-session", {
                    sessionId: cart.sessionId
                })
                setStripeResponse(res)
            } catch (error) {
                console.log(error.message)
            }
        }
        getSession()
    }, [cart.sessionId])

    return (
        <div className='h-screen w-screen bg-[url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")] bg-cover bg-center bg-no-repeat'>
            <div className='flex items-center justify-center w-full h-full bg-white bg-opacity-30'>
                <div className='flex flex-col items-center justify-center w-4/5 p-5 bg-white sm:w-3/5 lg:w-2/5'>
                    <h1 className='mt-1 text-2xl font-light text-center'> 
                        YOUR ORDER HAS BEEN PLACED!
                    </h1>
                    <p className='my-6 text-center text-md'> 
                        Your order should arrive in about 3-5 business days. If you have any questions please feel free to contact our support team
                    </p>
                    <button className='w-2/5 px-5 py-2 text-white bg-teal-600' onClick={() => {
                        dispatch(removeCart())
                        dispatch(removeSessionId())
                        navigate("/")
                    }}>
                        HOME
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Success