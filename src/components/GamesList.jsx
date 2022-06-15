import { useEffect, useState } from "react";
import  { getReviews }  from "../utils/api";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import Voting from "./Voting";

const GamesList = () => {
    const { category_name } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getReviews(category_name)
        .then((reviewsFromApi) => {
            setReviews(reviewsFromApi);
            setLoading(false);
        })
    }, [category_name, reviews])

    if(loading) return <Loading />
    return (
        <section className="GamesList">
            {reviews.map((review) => {
                return(
                    <section className="GamesList__GamesCard" key={review.review_id}>
                        <Link className="GamesCard__h3" key={review.review_id} to={`/reviews/${review.review_id}`}><h3>{review.title}</h3></Link>
                        <img className="GamesCard__img" src={review.review_img_url} alt={review.title}></img>
                        <Voting review={review} />
                        <p className="GamesCard__commentCount">{review.comment_count}</p>
                    </section>
                )
            })}
        </section>
    )
}

export default GamesList;