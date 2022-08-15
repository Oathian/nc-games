import { useEffect, useState, useContext } from "react";
import  { getReviews, removeReview }  from "../utils/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { formatText } from "../utils/formatText";
import { timestampConvert } from "../utils/timestampConvert";
import { UserContext } from "../contexts/User";
import Loading from "./Loading";
import Voting from "./Voting";
import SortMenu from "./SortMenu";
import AddReview from "./AddReview";
import ErrorComponent from "./ErrorComponent";


const GamesList = () => {
    const { category_name } = useParams();
    const { user } = useContext(UserContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(undefined);
    const [sortBy, setSortBy] = useState(undefined);
    const [error, setError] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [userInput, setUserInput] = useState(false);
    const navigate = useNavigate();

    const toggleCollapse = () => {
        user?isCollapsed?setIsCollapsed(false):setIsCollapsed(true):navigate("/sign-in");
    };

    const deleteReview = (event) => {
        setUserInput(true);
        removeReview(event.target.id)
        .then(() => {
            setUserInput(false);
        }).catch((err) => {
            console.log(err)
        });
    };

    useEffect(() => {
        setLoading(true);
        setError(null);
        getReviews(category_name, sortBy, order)
        .then((reviewsFromApi) => {
            setReviews(reviewsFromApi);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        })
    }, [category_name, order, sortBy, userInput])

    return (
        <section className="Main">
            <SortMenu setOrder={setOrder} setSortBy={setSortBy}/>
            {loading?<Loading />:
                error?<ErrorComponent error={error}/>:
                <section className="GamesList">
                    <button className="AddReview__button" onClick={toggleCollapse}>{isCollapsed?<h3>Add a review</h3>:<h3>Show less</h3>}</button>
                    {isCollapsed?<></>:<AddReview setUserInput={setUserInput}/>}
                    {category_name?<h2 className="GamesList__h2">{formatText(category_name)}</h2>:<></>}
                    {reviews.map((review) => {
                    return(
                        <section className="GamesList__GamesCard" key={review.review_id}>
                            <Link className="GamesCard__h3" key={review.review_id} to={`/reviews/${review.review_id}`}><h3>{review.title}</h3></Link>
                            <p className="GamesCard__date">{`${timestampConvert(review.created_at)}`}</p>
                            <img draggable="false" className="GamesCard__img" src={review.review_img_url} alt={review.title}></img>
                            <Voting review={review} />
                            <p className="GamesCard__commentCount">{review.comment_count==="1"?`${review.comment_count} Comment`:`${review.comment_count} Comments`}</p>
                            {user?user.username===review.owner?<button className="GamesCard__delete" id={review.review_id} onClick={(event) => deleteReview(event)}><img id={review.review_id} className="delete_img" src="/delete.svg" alt="delete comment button"/></button>:<></>:<></>}
                        </section>
                    )
                })}
                </section>
                }
        </section>
    )
}

export default GamesList;