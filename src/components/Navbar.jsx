import  { getAllCategories }  from "../utils/api"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { formatText } from "../utils/formatText";

const Navbar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then((categoriesFromApi) => {
            const allCategories = categoriesFromApi.map((category) => {
                return category.slug;
            })
            setCategories(allCategories);
        })
    }, [])

    return (
        <nav className="Navbar">
            <Link className="Navbar__Category" to="/">Home</Link>
            {categories.map((category) => {
                return <Link className="Navbar__Category" key={category} to={`/category/${category}`}>{formatText(category)}</Link>
            })}
        </nav>
    );
}

export default Navbar;