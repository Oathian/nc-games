import { getCommentsByReviewId } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/CommentList.css"

const CommentList = () => {
    const { review_id } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getCommentsByReviewId(review_id)
        .then((comments) => {
            setComments(comments);
        })
    })

    return(
        <section className="Review__CommentList">
            {comments.length > 0 ? <h3 className="Review__CommentTitle">Comments:</h3>:<></>}
            {comments.map((comment) => {
                return(
                    <section key={comment.comment_id} className="CommentList__CommentCard">
                        <p className="CommentCard__author">User: {comment.author}</p>
                        <p className="CommentCard__body">{comment.body}</p>
                        <p className="CommentCard__votes">Votes: {comment.votes}</p>
                    </section>
                )
            })}
        </section>
    )
}

export default CommentList;