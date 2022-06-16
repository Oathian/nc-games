import { getCommentsByReviewId, removeComment } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import PostComment from "./PostComment";
import "../styles/CommentList.css";

const CommentList = () => {
    const { review_id } = useParams();
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState(true);
    const { user } = useContext(UserContext);

    const deleteComment = (event) => {
        setUserComment(false);
        removeComment(event.target.id)
        .then(() => {
            setUserComment(true);
        })
    }

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
                        {user===comment.author?<button id={comment.comment_id} onClick={(event) => deleteComment(event)}>X</button>:<></>}
                    </section>
                )
            })}
            <PostComment setUserComment={setUserComment}/>
        </section>
    )
}

export default CommentList;