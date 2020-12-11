const initialState = {
    restaurants: [],
    restaurant: {},
    reviews:[],
    display_address: [],
    loadingRestaurant:true,
    loadingReviews:true

}

const restaurantReducer = (state=initialState, action) => {
    switch (action.type) {
        case "CLEAN_RESTAURANT":
            return {
                ...state,
                restaurants: ""
            }
        case "FIND_RESTAURANT":
            return {
                ...state,
                restaurants: action.results.businesses,
                loadingRestaurant:false
            }


        case "FIND_RESTAURANT_BY_ID":
            return {
                ...state,
                restaurant: action.restaurant,
                display_address: action.restaurant.location.display_address,
                loadingRestaurant:false

            }

        case "FIND_REVIEWS_BY_ID":
            return {
                ...state,
                reviews:action.result.reviews,
                loadingReviews:false
            }

        case "REQUEST_RESTAURANT":
            return{
                ...state,
                loadingRestaurant:true
            }

        case "REQUEST_REVIEWS":
            return {
                ...state,
                loadingRestaurant: true

            }

        default:
            return state



    }
}

export default restaurantReducer
