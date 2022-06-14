import axios from "axios"

const gamesApi = axios.create({
    baseURL: "https://nc-games-aidan.herokuapp.com/api",
});

export const getAllReviews = () => {
    return gamesApi.get("/reviews")
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

export const getReviewsByCategory = (category) => {
    return gamesApi.get(`/reviews?category=${category}`)
    .then(({ data : { reviews }}) => {
        return reviews;
    })
}

export const getReviewById = (review_id) => {
    return gamesApi.get(`/reviews/${review_id}`)
    .then(({ data : { review }}) => {
        return review;
    })
}