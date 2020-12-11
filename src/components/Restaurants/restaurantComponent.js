import React from "react"
import restaurantService from "../../services/restaurantService";
import {connect} from "react-redux";
import "./restaurant.style.client.css"
import reviewService from "../../services/reviewService";
import {Link} from "react-router-dom";

class RestaurantComponent extends React.Component {

    componentDidMount() {
        {console.log(this.props.user)}
        const restaurantId = this.props.match.params.restaurantId
        if (restaurantId) {
            this.props.findRestaurantById(restaurantId)
        }
        if (restaurantId) {
            this.props.findReviewsById(restaurantId)
        }

        if (restaurantId && this.props.isSignIn) {
            this.props.findReviewsByRestaurantAndUser(this.props.isSignIn,restaurantId)
        }

        if (restaurantId ) {
            this.props.findReviewsByRestaurant(restaurantId)
        }
    }


    render() {
        return (
            (this.props.loadingRestaurant || this.props.loadingReviews) ?
                <div>
                    <h1> Your Restaurant is on the way... </h1>
                </div>
                :
                <div className="container">
                    <h1>{this.props.restaurant.name}</h1>
                    <div className="row">
                        < img className="col-4 image-preview-widget image-adj" src={this.props.restaurant.image_url} alt="test"/>
                        <div className="col-8">
                        <ul >
                            <li><h2>Basic Information</h2></li>
                            <ul>
                                { (this.props.restaurant.rating) ?
                                    <li>
                                        Rating: {this.props.restaurant.rating}  out of 5
                                    </li>
                                    :
                                    <li> Rating not available</li>
                                }

                                {
                                    (this.props.restaurant.price) ?
                                        <li>
                                            Price: {this.props.restaurant.price}
                                        </li>
                                        :
                                        <li>
                                            Price not available
                                        </li>
                                }
                            </ul>
                            <li><h2>Location</h2></li>
                            <div>
                                {this.props.display_address.map( (address, index) =>
                                    <p key={index}>{address}</p>)}
                            </div>

                            <li><h2>Reviews</h2></li>
                            <ul className="list-group">
                                {
                                    this.props.reviews.map((review, index) =>
                                        <li className="list-group-item"  key = {index}>
                                            <p>{review.text}</p>
                                            <p> From {review.user.name} in {review.time_created}</p>
                                        </li>
                                    )
                                }
                            </ul>


                            <li> <h2>Recent Reviews</h2> </li>
                            <ul className="list-group">
                                {
                                    this.props.reviewsByRestaurant.map((review,index) =>
                                        <li className="list-group-item" key={index}>
                                            {
                                                this.props.isSignIn && this.props.user.type === "ADMIN" &&
                                                    <div className="container">
                                                        <div className="row">{review.text}</div>
                                                        <div className="row">
                                                            <div className="col-9 ">
                                                                From {"\n"}
                                                                <Link to={`/profile/users/${review.userName}`}>
                                                                     {review.userName}
                                                                </Link>
                                                            </div>
                                                            <div className="col-3">
                                                                <button className="fa fa-trash-o alert-primary float-right"
                                                                        onClick={() => this.props.deleteReview(review.id)}>
                                                                    By Admin
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                            }

                                            {
                                                this.props.isSignIn && this.props.user.type === "USER"
                                                && this.props.isSignIn === review.userName && review.editing &&
                                                <span>
                                                    <textarea className="form-control"
                                                              onChange={(event) => this.props.updateReview({
                                                                       ...review,
                                                                       text: event.target.value
                                                                   })} value={review.text}
                                                    />
                                                    <button className="fa fa-check alert-primary float-right"
                                                                 onClick={() => this.props.okReview(review)}>
                                                    </button>
                                                     </span>
                                            }
                                            {
                                                this.props.isSignIn && this.props.user.type === "USER"
                                                && this.props.isSignIn === review.userName && !review.editing &&
                                                <div className="row">
                                                    <div className="col-8">
                                                        {review.text}
                                                    </div>
                                                    <div className= "col-4">
                                                        <button className="fa fa-pencil alert-primary  float-right "
                                                                onClick={() => this.props.editReview(review)}>
                                                        </button>
                                                        <button className="fa fa-trash-o alert-primary float-right "
                                                                onClick={() => this.props.deleteReview(review.id)}>
                                                        </button>
                                                    </div>
                                                </div>

                                            }
                                            {
                                                this.props.isSignIn && this.props.user.type === "USER" && this.props.isSignIn !== review.userName &&
                                                <div className="row">
                                                    <div className="col-8">
                                                        {review.text}
                                                    </div>
                                                    <div className="col-4">
                                                        <div className= "pull-right">
                                                            From <Link to={`/profile/users/${review.userName}`}>
                                                            {review.userName}
                                                        </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                !this.props.isSignIn &&
                                                    <div className= "row">
                                                        <div className="col-8">
                                                            {review.text}
                                                        </div>
                                                        <div className="col-4">
                                                            <div className= "pull-right">
                                                                From <Link to={`/profile/users/${review.userName}`}>
                                                                {review.userName}
                                                            </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </li>)
                                }
                            </ul>
                                {
                                    this.props.isSignIn
                                    && (this.props.user.type === "USER")
                                    &&
                                    <button  className="btn btn-secondary btn-pos-adj"
                                             onClick={() => this.props.createReview(this.props.isSignIn, this.props.match.params.restaurantId)}>
                                        ◎ Write a Review
                                    </button>
                                }

                                {
                                    !this.props.isSignIn &&
                                        <p className="login-msg-adj"> Want to add reviews? Click here to {"\n"}
                                            <Link to={`/login`}>
                                            Login
                                            </Link>
                                            {"\n"}or{"\n"}
                                            <Link to={`/register`}>
                                                Sign up
                                            </Link>
                                            {"\n"} first! </p>
                                }
                            </ul>

                        </div>
                    </div>
                </div>

        )
    }

}

const stateToProperty = (state) => ({
    restaurant: state.restaurantReducer.restaurant,
    reviews: state.restaurantReducer.reviews,
    display_address: state.restaurantReducer.display_address,
    loadingRestaurant: state.restaurantReducer.loadingRestaurant,
    loadingReviews:state.restaurantReducer.loadingReviews,
    user: state.userReducer.user,
    isSignIn: state.userReducer.isSignIn,
    reviewsByUser: state.reviewReducer.reviewsByUser,
    reviewsByRestaurant: state.reviewReducer.reviewsByRestaurant

})


const propertyToDispatchMapper = (dispatch) => ({


    findRestaurantById: (resId) => {
        dispatch(() => {
            return {type: "REQUEST_RESTAURANT"}
        })
        restaurantService.findRestaurantById(resId)
            .then(restaurant => dispatch({
                type: "FIND_RESTAURANT_BY_ID", restaurant
            }))},


    findReviewsById: (resId) => {
        dispatch(() => {
            return {type: "REQUEST_REVIEWS"}
        })
        restaurantService.findReviewsById(resId)
            .then(result => dispatch({
                type: "FIND_REVIEWS_BY_ID", result
            }))},


    findReviewsByRestaurantAndUser: (userName, resId) =>
        reviewService.findReviewsByRestaurantAndUser(userName, resId)
            .then(reviews => dispatch ({
                type: "FIND_REVIEWS_BY_USER_AND_RESTAURANT",
                reviewsByUser:reviews
            })),


    findReviewsByRestaurant: (resId) =>
        reviewService.findReviewsByRestaurant (resId)
            .then(reviews => dispatch ({
                type: "FIND_REVIEWS_BY_RESTAURANT",
                reviewsByRestaurant:reviews
            })),

    createReview: (userName, resId) =>
        reviewService.createReview( userName,resId, {
            id:0,
            restaurantId:resId,
            userName:userName,
            text:"This spot is serving meal kits, as well as offering delivery during COVID.",
        })
            .then(review => dispatch({
                type:"CREATE_REVIEW",
                reviewByUser: {...review, editing:true}
            })),

    okReview: (review) =>
        reviewService.updateReview( {
            ...review,editing: false
        }).then(status => dispatch({
            type: "UPDATE_REVIEW",
            reviewByUser: {...review, editing: false}
        })),

    editReview: (review) =>
        reviewService.updateReview({
            ...review,editing:true
        }).then(status => dispatch({
            type: "UPDATE_REVIEW",
            reviewByUser: {...review, editing: true}
        })),


    updateReview: (newReview) =>
        dispatch({
            type: "UPDATE_REVIEW",
            reviewByUser: newReview
        }),

    deleteReview: (reviewId) =>
        reviewService.deleteReview(reviewId)
            .then(status => dispatch({
                type: "DELETE_REVIEW",
                reviewId: reviewId
            })),

})



export default connect (stateToProperty, propertyToDispatchMapper)(RestaurantComponent)
