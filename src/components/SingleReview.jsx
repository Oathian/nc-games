import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewById } from "../utils/api";
import { formatText } from "../utils/formatText";
import Loading from "./Loading";
import CommentList from "./CommentList";
import Voting from "./Voting";
import ErrorComponent from "./ErrorComponent";
import '../styles/SingleReview.css';

const SingleReview = () => {
    const { review_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getReviewById(review_id)
        .then((reviewFromApi) => {
            setReview(reviewFromApi);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            setError(error);
        })
    }, [review_id])

    return(
        loading?<Loading />:
            error?<ErrorComponent error={error}/>:
        <section className="Review">
            <h2 className="Review__h2">{review.title}</h2>
            <div className="Review__InfoBar">
                <p className="Review__category">Category: {formatText(review.category)}</p>
                <p className="Review__username">User: {review.owner}</p>
            </div>
            <img draggable="false" className="Review__img" src={review.review_img_url} alt={review.title}/>
            <div className="Review__InteractionBar">
                <Voting review={review} />
                <p className="InteractionBar__commentCount">{review.comment_count==="1"?`${review.comment_count} Comment`:`${review.comment_count} Comments`}</p>
            </div>
            <p className="Review__body">{review.review_body}</p>
            <CommentList />
        </section>
    )
}

export default SingleReview;