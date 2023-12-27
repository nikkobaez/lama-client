import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setCart } from "../redux/cartRedux";
import { setWishlist } from "../redux/wishlistRedux";
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess } from '../redux/userRedux'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()

        dispatch(loginStart())

        try {
            const userRes = await axios.post("https://lama-server-1826f3f97416.herokuapp.com/auth/login", {
                email: email,
                password: password
            });
            dispatch(loginSuccess(userRes.data))

            const headers = {
                "token": `Bearer ${userRes.data.accessToken}`,
                "Content-Type": "application/json",
            };

            const cartRes = await axios.get("https://lama-server-1826f3f97416.herokuapp.com/cart/find/" + userRes.data._id, { headers })
            dispatch(setCart(cartRes.data))

            const wishlistRes = await axios.get("https://lama-server-1826f3f97416.herokuapp.com/wishlist/find/" + userRes.data._id, { headers })
            dispatch(setWishlist(wishlistRes.data))

            navigate("/")
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    return (
        <div className='h-screen w-screen bg-[url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")] bg-cover bg-center bg-no-repeat'>
            <div className='flex items-center justify-center w-full h-full bg-white bg-opacity-30'>
                <div className='w-4/5 p-5 bg-white sm:w-3/5 lg:w-2/5'>
                    <h1 className='mt-1 text-2xl font-light'> 
                        LOGIN TO YOUR ACCOUNT
                    </h1>
                    <form className='flex flex-col'>
                        <input type="text" placeholder="Email" className='mr-3 mt-5 min-w-[40%] flex-1 border p-2 outline-none' onChange={(event) => setEmail(event.target.value)}/>
                        <input type="password" placeholder="Password" className='my-5 mr-3 min-w-[40%] flex-1 border p-2 outline-none' onChange={(event) => setPassword(event.target.value)}/>
                        <button className='w-2/5 px-5 py-2 text-white bg-teal-600' onClick={handleLogin}>
                            LOGIN
                        </button>
                        <div className='flex flex-col gap-1 mt-5'>
                            <p className='text-base'> Don't have an account? <span className='text-teal-600 cursor-pointer' onClick={() => navigate("/register")}> Register </span> </p>
                            <p className='text-base'> {error && error.response.data}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login