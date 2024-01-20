import { useState, useEffect } from "react"
import { Product } from "../components"
import axios from "axios";

const Products = ({category, filter, sort}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // IF THERE IS A CATEGORY GET PRODUCTS FROM A SPECIFIC CATEGORY OR IF THERE IS NOT A CATEGORY GET ALL PRODUCTS
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(category ? `https://lama-server-1826f3f97416.herokuapp.com/products?category=${category}` : "https://lama-server-1826f3f97416.herokuapp.com/products");
                setProducts(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getProducts();
    }, [category])

    // IF THERE IS A FILTER THEN FILTER OUT THE PRODUCTS THAT DO NOT MATCH THE SPECIFIED FILTERS
    useEffect(() => {
        filter && setFilteredProducts (
            products.filter((item) => Object.entries(filter).every(([key, value]) =>
                item[key].includes(value)
            ))
        )
    }, [products, category, filter])

    // IF THERE IS A SORT THEN SORT THE PRODUCTS AS SPECIFIED
    useEffect(() => {
        if (sort === "Newest") {
            setFilteredProducts(prev => [...prev].sort((a,b) => a.createdAt - b.createdAt))
        } else if (sort === "Price (Low To High)") {
            setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
        } else {
            setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
        }
    }, [sort])

    return (
        <>
            <div className="grid grid-cols-1 gap-1 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                { 
                    category || filter ? 
                        (
                            filteredProducts.map((item) => (
                                <Product item={item} key={item._id}/>
                            )) 
                        )
                    :
                        (
                            products.slice(0, 8).map((item) => (
                                <Product item={item} key={item._id}/>  
                            )) 
                        )
                }
            </div>
            {(category || filter) && filteredProducts.length === 0 && (
                <div className="flex items-center justify-center h-[30vh]">
                    <p className="mb-16"> No products match your current filters </p>
                </div>
            )}
        </>
    )
}

export default Products