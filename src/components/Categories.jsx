import { Category } from "../components"
import { categories } from "../constants"

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