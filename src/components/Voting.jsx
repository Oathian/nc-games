import { patchVotes } from "../utils/api";
import '../styles/Voting.css';

const Voting = ({ review }) => {
    
    const handleUpvote = () => {
        patchVotes(review.review_id, 1)
        .then((data) => {
        })
    }

    const handleDownvote = () => {
        patchVotes(review.review_id, -1)
        .then((data) => {
            
        })
    }
    
    return(
    <div className="InteractionBar__Voting">
        <button onClick={handleUpvote} className="Voting__upvote">Up</button>
        <p className="Voting__votes">{review.votes}</p>
        <button onClick={handleDownvote}  className="Voting__downvote">Down</button>
    </div>
    )
}

export default Voting;