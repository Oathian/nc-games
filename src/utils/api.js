import axios from "axios"

const gamesApi = axios.create({
    baseURL: "https://nc-games-aidan.herokuapp.com/api",
});

export const getReviews = (category, sort_by, order) => {
    return gamesApi.get("/reviews", { params: { category: category, sort_by: sort_by, order: order }})
    .then(({ data : { reviews }}) => {
        return reviews;
    });
};

export const getAllCategories = () => {
    return gamesApi.get("/categories")
    .then(({ data : { categories }}) => {
        return categories;
    });
};

export const getReviewById = (review_id) => {
    return gamesApi.get(`/reviews/${review_id}`)
    .then(({ data : { review }}) => {
        return review;
    });
};

export const getCommentsByReviewId = (review_id) => {
    return gamesApi.get(`/reviews/${review_id}/comments`, { params: { review_id: review_id }})
    .then(({ data : { comments }}) => {
        return comments;
    });
};

export const patchVotes = (review_id, vote) => {
    return gamesApi.patch(`/reviews/${review_id}`, {inc_votes : vote})
    .then(({ data : { review }}) => {
      return review;
    });
};

export const postComment = (username, body, review_id) => {
    return gamesApi.post(`/reviews/${review_id}/comments`, {username : username, body : body})
    .then(({ data : { review }}) => {
      return review;
    });
};

export const removeComment = (comment_id) => {
    return gamesApi.delete(`/comments/${comment_id}`)
    .then(() => {
        return;
    });
};

export const patchCommentVote = (comment_id, vote) => {
    return gamesApi.patch(`/comments/${comment_id}`, {inc_votes : vote})
    .then(({ data : { newComment }}) => {
      return newComment;
    });
};

export const postReview = (title, username, category, designer, body) => {
    return gamesApi.post(`/reviews`, {owner : username, review_body : body, designer: designer, category: category, title: title})
    .then(({ data : { review }}) => {
      return review;
    });
};

export const removeReview = (review_id) => {
    return gamesApi.delete(`/reviews/${review_id}`)
    .then(() => {
        return;
    });
};

export const getUserByUsername= (username) => {
    return gamesApi.get(`/users/${username}`, { params: { username: username }})
    .then(({ data : { user }}) => {
        return user;
    });
};