import axios from "axios"

const gamesApi = axios.create({
    baseURL: "https://nc-games-aidan.herokuapp.com/api",
});

export const getReviews = (category) => {
    return gamesApi.get("/reviews", { params: { category: category }})
    .then(({ data : { reviews }}) => {
        return reviews;
    })
}

export const getAllCategories = () => {
    return gamesApi.get("/categories")
    .then(({ data : { categories }}) => {
        return categories;
    })
}

export const getReviewById = (review_id) => {
    return gamesApi.get(`/reviews/${review_id}`)
    .then(({ data : { review }}) => {
        return review;
    })
}

export const getCommentsByReviewId = (review_id) => {
    return gamesApi.get(`/reviews/${review_id}/comments`, { params: { review_id: review_id }})
    .then(({ data : { comments }}) => {
        return comments;
    })
}