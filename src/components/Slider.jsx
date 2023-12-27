import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { sliderItems } from '../data'

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const navigate = useNavigate();

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0)
        }
    }

    return (
        <div className='relative flex w-full h-screen overflow-hidden'>
            {/* LEFT ARROW */}
            <div className="absolute bottom-0 left-3 top-0 z-10 m-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#fff7f7] opacity-50" onClick={() => handleClick("left")}>
                <FaChevronLeft />
            </div>
            {/* SLIDES CONTAINER */}
            <div style={{ display: "flex", height: "100%", transition: "all 1500ms ease", transform: `translateX(-${slideIndex * 100}vw)` }}>
            {sliderItems.map((item) => (
                <div style={{ display: "flex", height: "100vh", width: "100vw", alignItems: "center", background: item.bg }} key={item.id}>
                    {/* IMAGE CONTAINER */}
                    <div className="items-end justify-center flex-1 hidden h-full lg:flex">
                        <img src={item.img} alt="woman in dress" className="h-5/6"/>
                    </div>
                    {/* INFORMATION CONTAINER */}
                    <div className="flex flex-col items-center justify-center flex-1 p-12 lg:items-start lg:justify-start">
                        <h1 className="w-3/4 max-w-lg text-4xl lg:w-full lg:text-6xl">
                            {item.title}
                        </h1>
                        <p className="w-3/4 max-w-lg my-10 text-lg tracking-wider lg:w-full">
                            {item.desc}
                        </p>
                        <button className="w-3/4 max-w-lg p-2 text-lg bg-transparent border-2 border-black lg:w-full" onClick={() => navigate("/products")}>
                            SHOP NOW
                        </button>
                    </div>
                </div>
            ))}
            </div>
            {/* RIGHT ARROW */}
            <div className="absolute bottom-0 right-3 top-0 z-10 m-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#fff7f7] opacity-50" onClick={() => handleClick("right")}>
                <FaChevronRight />
            </div>
        </div>
    )
}

export default Slider