import { getCommentsByReviewId, removeComment } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import PostComment from "./PostComment";
import CommentVoting from "./CommentVoting";
import "../styles/CommentList.css";

const CommentList = () => {
    const { review_id } = useParams();
    const [comments, setComments] = useState([]);
    const [userInput, setUserInput] = useState(false);
    const { user } = useContext(UserContext);

    const deleteComment = (event) => {
        setUserInput(true);
        removeComment(event.target.id)
        .then(() => {
            setUserInput(false);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getCommentsByReviewId(review_id)
        .then((comments) => {
            setComments(comments);
        })
    }, [userInput, review_id])

    return(
        <section className="Review__CommentList">
            <h3 className="Review__CommentTitle">{comments.length > 0 ? "Comments:":"Be the first to post something!"}</h3>
            {comments.map((comment) => {
                return(
                    <section key={comment.comment_id} className="CommentList__CommentCard">
                        <p className="CommentCard__author">User: {comment.author}</p>
                        <p className="CommentCard__body">{comment.body}</p>
                        <div className="CommentCard__bottom">
                            <CommentVoting comment={comment}/>
                            {user===comment.author?<button id={comment.comment_id} onClick={(event) => deleteComment(event)}><img id={comment.comment_id} className="comment__img" src="/delete.svg" alt="delete comment button"/></button>:<></>}
                        </div>
                    </section>
                )
            })}
            <PostComment setUserInput={setUserInput}/>
        </section>
    )
}

export default CommentList;