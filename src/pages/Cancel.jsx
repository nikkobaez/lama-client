import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { removeSessionId } from "../redux/cartRedux"
import { useDispatch } from "react-redux"

const Cancel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(removeSessionId())
    }, [dispatch])

    return (
        <div className='h-screen w-screen bg-[url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")] bg-cover bg-center bg-no-repeat'>
            <div className='flex items-center justify-center w-full h-full bg-white bg-opacity-30'>
                <div className='flex flex-col items-center justify-center w-4/5 p-5 bg-white sm:w-3/5 lg:w-2/5'>
                    <h1 className='mt-1 text-2xl font-light text-center'> 
                        YOUR ORDER HAS BEEN CANCELED!
                    </h1>
                    <p className='my-6 text-center text-md'> 
                        It looks like you've canceled your order. If you have any questions please feel free to contact our support team
                    </p>
                    <button className='w-2/5 px-5 py-2 text-white bg-teal-600' onClick={() => navigate("/")}>
                        HOME
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cancel