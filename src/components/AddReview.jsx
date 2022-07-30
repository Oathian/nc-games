import  { getAllCategories }  from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useParams } from "react-router-dom";
import  { postReview }  from "../utils/api";
import { formatText } from "../utils/formatText";
import ErrorComponent from "./ErrorComponent";
import "../styles/AddReview.css"

const AddReview = ({ setUserInput }) => {
    const [categories, setCategories] = useState([]);
    const [addedReviewBody, setAddedReviewBody] = useState("");
    const [addedTitle, setAddedTitle] = useState("");
    const [addedDesigner, setAddedDesigner] = useState("");
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const { category_name } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserInput(true);
        postReview(event.target[0].value, user.username, event.target[1].value, event.target[2].value, event.target[3].value)
        .then(() => {
            setUserInput(false);
            setAddedTitle("");
            setAddedReviewBody("");
            setAddedDesigner("");
        }).catch((error) => {
            setError(error);
        });
    }

    useEffect(() => {
        getAllCategories().then((categoriesFromApi) => {
            const allCategories = categoriesFromApi.map((category) => {
                return category.slug;
            })
            setCategories(allCategories);
        })
    }, [])

    return(<div>
        {error?<ErrorComponent error={error}/>:<></>}
        <form className="AddReview__form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input className="AddReview__title" value={addedTitle} onChange={(event) => setAddedTitle(event.target.value)} id="title"></input>
            <label htmlFor="category">Category:</label>
            <select className="AddReview__category" id="category">
                {category_name?<option value={category_name}>{formatText(category_name)}</option>:<option value="">Choose an option</option>}
            {categories.map((category) => {
                return category_name === category?"s":<option value={category} key={category}>{formatText(category)}</option>
            })}
            </select>
            <label htmlFor="designer">Game Designer:</label>
            <input className="AddReview__designer" value={addedDesigner} onChange={(event) => setAddedDesigner(event.target.value)} id="designer"></input>
            <label htmlFor="body">Review:</label>
            <textarea className="AddReview__body" value={addedReviewBody} onChange={(event) => setAddedReviewBody(event.target.value)} id="body"></textarea>
            <button className="AddReview__submit" type="sumbit">Submit</button>
        </form>
        </div>);
};

export default AddReview;