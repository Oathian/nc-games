import { patchVotes } from "../utils/api";
import { useState } from "react"
import '../styles/Voting.css';

const Voting = ({ review }) => {
    const [votes, setVotes] = useState(review.votes);
    
    const handleUpvote = () => {
        patchVotes(review.review_id, 1)
        .then((data) => {
            setVotes(data.votes);
        })
    }

    const handleDownvote = () => {
        patchVotes(review.review_id, -1)
        .then((data) => {
            setVotes(data.votes);
        })
    }
    
    return(
    <div className="InteractionBar__Voting">
        <button onClick={handleUpvote} className="Voting__upvote">Up</button>
        <p className="Voting__votes">{votes}</p>
        <button onClick={handleDownvote}  className="Voting__downvote">Down</button>
    </div>
    )
}

export default Voting;