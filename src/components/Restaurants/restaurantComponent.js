import React from "react"
import restaurantService from "../../services/restaurantService";
import {connect} from "react-redux";
import "./restaurant.style.client.css"
import reviewService from "../../services/reviewService";
import {Link} from "react-router-dom";

class RestaurantComponent extends React.Component {

    componentDidMount() {
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
                    <h3> Your Restaurant is on the way... </h3>
                </div>
                :
                <div className="container">
                    <h3>{this.props.restaurant.name}</h3>
                    <div className="row">
                        <img className="col-4 image-preview-widget image-adj" src={this.props.restaurant.image_url} alt="test"/>
                        <div className="col-8">
                            <ul>
                                <h4>Basic Information</h4>
                                <h4>
                                    {this.props.restaurant.rating ?
                                        <label className="badge rounded-pill bg-warning text-dark">
                                            {this.props.restaurant.rating}  out of 5
                                        </label>
                                        :
                                        <label className="badge rounded-pill bg-warning text-dark"> Rating not available</label>
                                    }
                                    {
                                        (this.props.restaurant.price) ?
                                            <span className="badge rounded-pill bg-info text-dark">
                                            {this.props.restaurant.price}
                                        </span>
                                            :
                                            <li className="badge rounded-pill bg-info text-dark">
                                                Price not available
                                            </li>
                                    }
                                    {
                                        this.props.restaurant.is_closed ?
                                            <span className="badge rounded-pill bg-danger">Closed</span> :
                                            <span className="badge rounded-pill bg-danger">Open</span>
                                    }
                                    {
                                        this.props.restaurant.display_phone ?
                                            <span className="badge rounded-pill bg-primary">{this.props.restaurant.display_phone}</span> :
                                            <span className="badge rounded-pill bg-primary">No contact info</span>
                                    }
                                </h4>
                                <h4>Location</h4>
                                <div>
                                    {this.props.display_address.map( (address, index) =>
                                        <span key={index}>{address + " "}</span>)}
                                </div>
                                <br/>
                                <h4>Reviews</h4>
                                    <ul>
                                        {this.props.reviews.map((review, index) =>
                                                <div key={index} className="row">
                                                    <span className="col-3">
                                                        {
                                                            review.user.image_url !== null &&
                                                            <img className="photo-adj" src={review.user.image_url} alt="userimg"/>
                                                        }
                                                        {
                                                            review.user.image_url === null &&
                                                            <img className="photo-adj" src="https://icon-library.com/images/user-icon-jpg/user-icon-jpg-12.jpg" alt="user"/>
                                                        }
                                                        <br/>
                                                        {review.user.name}
                                                        <br/>
                                                        Rating: {review.rating}
                                                    </span>
                                                    <span className="col-9">
                                                        <p>{review.text}</p>
                                                        <p> {review.time_created}</p>
                                                    </span>
                                                </div>

                                            )
                                        }
                                    </ul>
                                <br/>
                                <h4>Recent Reviews</h4>
                                    <ul>
                                    {this.props.reviewsByRestaurant.map((review,index) =>
                                            <div key={index}>
                                                {//polished
                                                    this.props.isSignIn && this.props.user.type === "ADMIN" &&
                                                        <div className="row" >
                                                            <div className="col-3">
                                                                <Link to={`/profile/users/${review.userName}`}>
                                                                    {review.userName}
                                                                </Link>
                                                            </div>
                                                            <div className="col-9">
                                                                {review.text}
                                                                <div>
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
                                                {//polished
                                                    this.props.isSignIn && this.props.user.type === "USER"
                                                    && this.props.isSignIn === review.userName && !review.editing &&
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <img className="photo-adj" src="https://icon-library.com/images/user-icon-jpg/user-icon-jpg-12.jpg" alt="user"/>
                                                            <br/>
                                                            {this.props.user.username}
                                                        </div>
                                                        <div className= "col-9">
                                                            {review.text}
                                                            <button className="fa fa-pencil alert-primary  float-right "
                                                                    onClick={() => this.props.editReview(review)}>
                                                            </button>
                                                            <button className="fa fa-trash-o alert-primary float-right "
                                                                    onClick={() => this.props.deleteReview(review.id)}>
                                                            </button>
                                                        </div>
                                                    </div>

                                                }
                                                {//polished
                                                    this.props.isSignIn && this.props.user.type === "USER"
                                                    && this.props.isSignIn !== review.userName &&
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <img className="photo-adj" src="https://icon-library.com/images/user-icon-jpg/user-icon-jpg-12.jpg" alt="user"/>
                                                            <br/>
                                                            <Link to={`/profile/users/${review.userName}`}>
                                                                {review.userName}
                                                            </Link>
                                                        </div>
                                                        <div className="col-9">
                                                            {review.text}
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    !this.props.isSignIn &&
                                                        <div className= "row">
                                                            <div className="col-3">
                                                                <img className="photo-adj" src="https://icon-library.com/images/user-icon-jpg/user-icon-jpg-12.jpg" alt="user"/>
                                                                <br/>
                                                                <Link to={`/profile/users/${review.userName}`}>
                                                                    {review.userName}
                                                                </Link>
                                                            </div>
                                                            <div className="col-9">
                                                                {review.text}
                                                            </div>
                                                        </div>
                                                }
                                            </div>)
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
                                    <h4><span className="badge bg-light login-msg-adj">Want to add reviews? Click here to {"\n"}
                                        <Link to={`/login`}>Log in</Link>{"\n"}or{"\n"}
                                        <Link to={`/register`}>Sign up</Link>{"\n"} first!</span></h4>
                                }
                            </ul>

                        </div>
                    </div>
                    <br/><br/><br/><br/>
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
