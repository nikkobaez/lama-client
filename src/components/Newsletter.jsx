import { IoSend } from "../assets";

const Newsletter = () => {
    return (
        <div className='flex h-[60vh] flex-col items-center justify-center bg-[#f8e1d8]'>
            <h1 className='mb-5 text-4xl md:text-5xl'>
                Newsletter
            </h1>
            <p className='mb-5 text-center text-md md:text-2xl font-extralight'>
                Get timely updates from your favorite products
            </p>
            <div className="flex justify-between w-1/2 h-10 max-w-md bg-white border border-gray-300">
                <input type="text" placeholder='Your email' className="flex-[8] pl-3 outline-none"/>
                <button className="flex flex-[1] items-center justify-center p-2 bg-teal-600"> <IoSend color="white" /> </button>
            </div>
        </div>
    )
}

export default Newsletter