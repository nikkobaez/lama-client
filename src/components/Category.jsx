import { Link } from "react-router-dom"

const Category = ({item}) => {
    return (
        <div className='relative m-1 h-[70vh] flex-1'>
            <Link to={`/products/${item.category}`}>
                {/* BACKGROUND IMAGE */}
                <img src={item.img} alt="women in outfits" className='object-cover w-full h-full'/>
                {/* INFORMATION CONTAINER */}
                <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full'>
                    <h1 className='mb-5 text-xl font-bold text-white lg:text-2xl'>
                        {item.title}
                    </h1>
                    <button className='p-2 font-medium text-gray-400 bg-white cursor-pointer'> 
                        SHOP NOW 
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default Category