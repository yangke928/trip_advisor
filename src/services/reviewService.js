import {REVIEW_URL} from './config'


const findReviewsByRestaurantAndUser = (userName, resId) =>
    fetch(`${REVIEW_URL}/${resId}/${userName}`).then(response => response.json())


const findReviewsByRestaurant = (resId) =>
    fetch(`${REVIEW_URL}/restaurants/${resId}`).then(response => response.json())

const createReview = (userName, resId, review ) =>
    fetch (`${REVIEW_URL}/${resId}/${userName}`, {
        method:"POST",
        body: JSON.stringify(review),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json())


const updateReview = (review) =>
    fetch(`${REVIEW_URL}/${review.id}`,{
        method:"PUT",
        body: JSON.stringify(review),
        headers:{
            "content-type": "application/json"
        }
    }).then(response => response.json())


const updateReviews = (resId, userName, reviews) =>
    fetch(`${REVIEW_URL}/${resId}/${userName}`,{
        method: "PUT",
        body: JSON.stringify(reviews),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())

const deleteReview = (reviewId) =>
    fetch(`${REVIEW_URL}/${parseInt(reviewId)}`, {
        method: "DELETE"
    }).then(resp => resp.text())

export default {
    findReviewsByRestaurantAndUser, createReview, updateReview, updateReviews, deleteReview,findReviewsByRestaurant
};
