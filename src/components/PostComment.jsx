import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../utils/api";
import { UserContext } from "../contexts/User";
import "../styles/PostComment.css"

const PostComment = ({ setUserInput }) => {
    const { review_id } = useParams();
    const { user } = useContext(UserContext);
    const [commentBody, setCommentBody] = useState("")
    
    const handleSubmit = (event) => {
        setUserInput(true);
        event.preventDefault();
        postComment(user, commentBody, review_id)
        .then(() => {
            setCommentBody("");
            setUserInput(false);
        })
    };

    return (
        <form className="Review__PostComment" onSubmit={handleSubmit}>
            <label className="PostComment__Label" htmlFor="comment_body">What do you think?</label>
            <textarea rows="4" className="PostComment__Input" value={commentBody} onChange={(event) => setCommentBody(event.target.value)} id="comment_body"></textarea>
        <button className="PostComment__Button" type="submit">Post</button>
      </form>
    )
}

export default PostComment;