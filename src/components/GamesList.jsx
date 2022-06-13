import { useEffect, useState } from "react"
import  { getAllReviews }  from "../apiRequests/api"

const GamesList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getAllReviews()
        .then((reviewsFromApi) => {
            setReviews(reviewsFromApi);
        })
    })

    return (
        <section className="GamesList">
            {reviews.map((review) => {
                return(
                    <section className="GamesList__GamesCard" key={review.review_id}>
                        <h3 className="GamesCard__h3">{review.title}</h3>
                        <p className="GamesCard__category">{review.category}</p>
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