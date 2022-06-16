import { getCommentsByReviewId } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostComment from "./PostComment";
import "../styles/CommentList.css";

const CommentList = () => {
    const { review_id } = useParams();
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState(true)

    useEffect(() => {
        getCommentsByReviewId(review_id)
        .then((comments) => {
            setComments(comments);
        })
    }, [userComment, review_id])

    return(
        <section className="Review__CommentList">
            <h3 className="Review__CommentTitle">{comments.length > 0 ? "Comments:":"Be the first to post something!"}</h3>
            {comments.map((comment) => {
                return(
                    <section key={comment.comment_id} className="CommentList__CommentCard">
                        <p className="CommentCard__author">User: {comment.author}</p>
                        <p className="CommentCard__body">{comment.body}</p>
                        <p className="CommentCard__votes">Votes: {comment.votes}</p>
                    </section>
                )
            })}
            <PostComment setUserComment={setUserComment}/>
        </section>
    )
}

export default CommentList;