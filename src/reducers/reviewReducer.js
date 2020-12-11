const initialState = {
    reviewsByUser:[],
    reviewByUser: {},
    reviewsByRestaurant:[],
}

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FIND_REVIEWS_BY_USER_AND_RESTAURANT":
            return{
                ...state,
                reviewsByUser:action.reviewsByUser,
    }
        case "FIND_REVIEWS_BY_RESTAURANT":
            return{
                ...state,
                reviewsByRestaurant:action.reviewsByRestaurant,
            }
        case "CREATE_REVIEW":
            return{
                ...state,
                reviewsByRestaurant: [
                    ...state.reviewsByRestaurant,
                    action.reviewByUser
                ]
            }

        case "UPDATE_REVIEW":
            return {
                ...state,
                reviewsByRestaurant: state.reviewsByRestaurant.map(review => review.id === action.reviewByUser.id? action.reviewByUser:review)
            }

        case"DELETE_REVIEW":
            return {
                ...state,
                reviewsByRestaurant: state.reviewsByRestaurant.filter(reviewByUser => reviewByUser.id !== action.reviewId)
            }

        default:
            return state
    }


}
