import { useEffect, useState } from "react"
import  { getAllReviews }  from "../utils/api"

const GamesList = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllReviews()
        .then((reviewsFromApi) => {
            setReviews(reviewsFromApi);
            setLoading(false);
        })
    }, [reviews])

    if(loading) return <p>loading...</p>
    return (
        <section className="GamesList">
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
    )
}

export default GamesList;