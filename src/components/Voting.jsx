import { patchVotes } from "../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import '../styles/Voting.css';

const Voting = ({ review }) => {
    const [votes, setVotes] = useState(review.votes);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleUpvote = () => {
        if(!user) {
            navigate("/sign-in");
        }else{
            patchVotes(review.review_id, 1)
            .then((data) => {
                setVotes(data.votes);
            });
        };
    };

    const handleDownvote = () => {
        if(!user) {
            navigate("/sign-in");
        }else{
            patchVotes(review.review_id, -1)
            .then((data) => {
                setVotes(data.votes);
            });
        };
    };
    
    return(
    <div className="InteractionBar__Voting">
        <button onClick={handleUpvote} className="Voting__upvote"><img draggable="false" className="vote__img" src="/upvote.svg" alt="upvote button"/></button>
        <p className="Voting__votes">{votes}</p>
        <button onClick={handleDownvote}  className="Voting__downvote"><img draggable="false" className="vote__img" src="/downvote.svg" alt="downvote button"/></button>
    </div>
    )
}

export default Voting;