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