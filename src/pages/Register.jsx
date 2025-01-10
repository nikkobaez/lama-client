import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [inputReq, setInputReq] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (event) => {
        event.preventDefault()

        console.log(username.length)

        if (username.length < 7) {
            setError(null)
            setInputReq("Your username must be longer than 7 characters")
            return
        } else if (!email.includes("@") || !email.includes(".com")) {
            setError(null)
            setInputReq("You must enter a valid email")
            return
        } else if (password.length < 7) {
            setError(null)
            setInputReq("Your password must be longer than 7 characters")
            return
        }

        setInputReq("")

        try {
            /* REGISTER A NEW USER */
            const res = await axios.post("https://lama-server-4377078eb805.herokuapp.com/auth/register", {
                username: username,
                email: email,
                password: password
            })

            /* CREATE A CART */
            await axios.post("https://lama-server-4377078eb805.herokuapp.com/cart", {
                userid: res.data._id,
                products: [],
            })

            /* CREATE A WISHLIST */
            await axios.post("https://lama-server-4377078eb805.herokuapp.com/wishlist", {
                userid: res.data._id,
                products: [],
            })

            navigate("/login")
        } catch (error) {
            setError(error) 
            console.log(error)
        }
    }

    return (
        <div className='h-screen w-screen bg-[url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")] bg-cover bg-center bg-no-repeat'>
            <div className='flex items-center justify-center w-full h-full bg-white bg-opacity-30'>
                <div className='w-4/5 p-5 bg-white sm:w-3/5 lg:w-2/5'>
                    <h1 className='text-2xl font-light'> 
                        REGISTER FOR AN ACCOUNT 
                    </h1>
                    <form className='flex flex-col'>
                        <input type="text" placeholder="Username" className='mr-3 mt-5 min-w-[40%] flex-1 border p-2 outline-none' onChange={(event) => setUsername(event.target.value)}/>
                        <input type="text" placeholder="Email" className='mr-3 mt-5 min-w-[40%] flex-1 border p-2 outline-none' onChange={(event) => setEmail(event.target.value)}/>
                        <input type="password" placeholder="Password" className='mr-3 mt-5 min-w-[40%] flex-1 border p-2 outline-none' onChange={(event) => setPassword(event.target.value)}/>
                        <button className='w-2/5 px-5 py-2 mt-5 text-white bg-teal-600' onClick={handleRegister}>
                            REGISTER
                        </button>
                        <p className='mt-5 text-base'> 
                            Already have an account? <span className='text-teal-600 cursor-pointer' onClick={() => navigate("/login")}> Login </span>
                        </p>
                        <p className='text-base'> {inputReq} </p>
                        <p className='text-base'> {error && error.response.data}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register