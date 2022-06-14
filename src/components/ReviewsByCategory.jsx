import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewsByCategory } from "../utils/api"
import { formatText } from "../utils/formatText";

const ReviewsByCategory = () => {
    const { category_name } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getReviewsByCategory(category_name)
        .then((reviewsFromApi) => {
            setReviews(reviewsFromApi);
            setLoading(false);
        })
    }, [category_name])

    if(loading) return <p>loading...</p>
    return(<>
        <section className="GamesList">
            <h2 className="GamesList__h2">{formatText(category_name)}</h2>
            {reviews.map((review) => {
                return(
                    <section className="GamesList__GamesCard" key={review.review_id}>
                        <h3 className="GamesCard__h3">{review.title}</h3>
                        <img className="GamesCard__img" src={review.review_img_url} alt={review.title}></img>
                        <p className="GamesCard__votes">{review.votes}</p>
                        <p className="GamesCard__commentCount">{review.comment_count}</p>
                    </section>
                )
            })}
        </section>
        </>
    )
}

export default ReviewsByCategory;