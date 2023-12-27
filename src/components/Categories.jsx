import { categories } from "../data"
import Category from "./Category"

const Categories = () => {
    return (
        <div className="flex flex-col justify-between p-5 sm:flex-row">
            {categories.map((item) => (
                <Category item={item} key={item.id}/>
            ))}
        </div>
    );
}

export default Categories