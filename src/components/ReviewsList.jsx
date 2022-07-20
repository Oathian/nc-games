import { useEffect, useState } from "react";
import  { getReviews }  from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { formatText } from "../utils/formatText";
import { timestampConvert } from "../utils/timestampConvert";
import Loading from "./Loading";
import Voting from "./Voting";
import SortMenu from "./SortMenu";
import ReviewForm from "./ReviewForm";
import ErrorComponent from "./ErrorComponent";


const GamesList = () => {
    const { category_name } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(undefined);
    const [sortBy, setSortBy] = useState(undefined);
    const [error, setError] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [userInput, setUserInput] = useState(false);

    const toggleCollapse = () => {
        isCollapsed?setIsCollapsed(false):setIsCollapsed(true);
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
                    <button onClick={toggleCollapse}>{isCollapsed?<p>Add a review</p>:<p>Show less</p>}</button>
                    {isCollapsed?<></>:<ReviewForm setUserInput={setUserInput}/>}
                    {category_name?<h2 className="GamesList__h2">{formatText(category_name)}</h2>:<></>}
                    {reviews.map((review) => {
                    return(
                        <section className="GamesList__GamesCard" key={review.review_id}>
                            <Link className="GamesCard__h3" key={review.review_id} to={`/reviews/${review.review_id}`}><h3>{review.title}</h3></Link>
                            <p className="GamesCard__date">{`${timestampConvert(review.created_at)}`}</p>
                            <img className="GamesCard__img" src={review.review_img_url} alt={review.title}></img>
                            <Voting review={review} />
                            <p className="GamesCard__commentCount">{review.comment_count==="1"?`${review.comment_count} Comment`:`${review.comment_count} Comments`}</p>
                        </section>
                    )
                })}
                </section>
                }
        </section>
    )
}

export default GamesList;