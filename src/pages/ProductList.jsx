import { useState } from "react"
import { useLocation } from "react-router"
import Annoucement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const ProductsList = () => {
    // GET CATEGORY FROM URL
    const location = useLocation()
    const category = location.pathname.split("/")[2];

    // FILTER AND SORT
    const [filter, setFilter ] = useState({});
    const [sort, setSort] = useState("Newest");

    const handleFilters = (event) => {
        const value = event.target.value;
        setFilter( {
            ...filter,
            [event.target.name]: value,
        })
    }

    const handleSort = (event) => {
        setSort(event.target.value)
    }

    return (
        <div>
            <Annoucement />
            <Navbar />
            <h1 className='m-5 text-3xl font-bold'>
                {category ? "All " + category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
            </h1>
            <div className='flex flex-col justify-between mr-5 md:flex-row'>
                {/* FILTER PRODUCTS */}
                <div className='m-5'>
                    <span className='text-xl'>
                        Filter Products:
                    </span>
                    <select className='p-1 mx-5 border' name="color" onChange={handleFilters}>
                        <option> Color </option>
                        <option> White </option>
                        <option> Black </option>
                        <option> Red </option>
                        <option> Blue </option>
                        <option> Tan </option>
                        <option> Green </option>
                    </select>
                    <select className='p-1 border' name="size" onChange={handleFilters}>
                        <option> Size </option>
                        <option> XS </option>
                        <option> S </option>
                        <option> M </option>
                        <option> LG </option>
                        <option> XL </option>
                    </select>
                </div>
                {/* SORT PRODUCTS */}
                <div className='m-5'>
                    <span className='text-xl'>
                        Sort Products:
                    </span>
                    <select className='p-1 ml-5 border' onChange={handleSort}>
                        <option value="Newest"> Select Sorting </option>
                        <option value="Price (Low To High)"> Price (Low To High) </option>
                        <option value="Price (High to Low)"> Price (High to Low) </option>
                    </select>
                </div>
            </div>
            {/* PASS IN CATEGORY, FILTER, AND SORT */}
            <Products category={category} filter={filter} sort={sort}/>
            <Newsletter />
            <Footer />
        </div>
    )
}

export default ProductsList