import React from "react"
import SearchPageHeader from "./SearchPageHeader";
import "./search-component.style.client.css"
import restaurantService from "../../services/restaurantService"
import {convertPosition} from "../../services/mapService";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Map from "../Map/Map";
class SearchComponent extends React.Component {

    componentDidMount() {
        //from url
        const zipcode = this.props.match.params.zipcodeId
        const category = this.props.match.params.categoryId
        const sort = this.props.match.params.sortId

        if (!zipcode) {
            this.props.cleanCode("")
        }

        if (zipcode && category && sort) {
            this.props.findRestaurantByCategoryAndSort(zipcode, category, sort)
            this.setState({
                zipcode: zipcode,
                category: category,
                sort: sort
            })
        }
        if (zipcode && category && !sort) {
            this.props.findRestaurantByCategory(zipcode, category)
            //if can find zipcode from url, set local zipcode to be the same
            this.setState({
                zipcode: zipcode,
                category: category
            })
        }
        if (zipcode && !category && sort) {
            this.props.findRestaurantBySort(zipcode, sort)
            //if can find zipcode from url, set local zipcode to be the same
            this.setState({
                zipcode: zipcode,
                sort: sort
            })
        }
        if (zipcode && !category && !sort) {
            this.props.findRestaurantByZipcode(zipcode)
            this.setState({
                zipcode: zipcode,
            })
        }
    }


    state = {
        zipcode: "02155",
        lat: "",
        lng: "",
        category: "",
    }

    zipcodeChange = async function(event) {
        await this.setState({zipcode: event.target.value});
    }

    changeCategory = (e) => {
        this.props.history.push(`/search/zipcode/${this.state.zipcode}/category/${e.target.value}`)
    }

    changeSort = (e) => {
        if (this.state.category) {
            this.props.history.push(`/search/zipcode/${this.state.zipcode}/category/${this.state.category}/sort/${e.target.value}`)
        }
        else {
            this.props.history.push(`/search/zipcode/${this.state.zipcode}/sort/${e.target.value}`)
        }

    }

    render() {
        return <div>
            <SearchPageHeader/>
            <div className="row">
                <div className="col-3">
                    <input className="form-control input-field input-adj" type="text" placeholder="Zipcode"
                           value={this.state.zipcode} onChange={e => this.zipcodeChange(e)}>
                    </input>
                    <Link to={`/search/zipcode/${this.state.zipcode}`} className="link">
                        <button className="col-3 float-right search-bttn btn-block btn-group"
                            onClick={() => {this.props.findRestaurantByZipcode(this.state.zipcode)}}>
                            Search
                        </button>
                    </Link>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <h6>Top Categories</h6>
                        <select className="custom-select" value={this.state.category}
                                onChange={this.changeCategory}>
                            <option disabled={true} value="">Categories</option>
                            <option value="chinese">Chinese</option>
                            <option value="vietnamese">Vietnamese</option>
                            <option value="mediterranean">Mediterranean</option>
                            <option value="mexican">Mexican</option>
                            <option value="indian">Indian</option>
                            <option value="korean">Korean</option>
                            <option value="thai">Thai</option>
                            <option value="japanese">Japanese</option>
                            <option value="italian">Italian</option>
                            <option value="vegan">Vegan</option>
                        </select>
                        <h6>Sort</h6>
                        <select className="custom-select" value={this.state.sort}
                                onChange={this.changeSort}>
                            <option value="default">Default</option>
                            <option value="best_match">Best Match</option>
                            <option value="review_count">Reviews</option>
                            <option value="distance">Distance</option>
                        </select>
                    </div>
                </div>
                <div className="col-5">
                    {
                        this.props.restaurants === "" &&
                        <div className="container center-pill msg-adj">
                            <h4>
                                <a className="badge badge-info">
                                    Yelp’s COVID-19 Response and Support for Local Businesses
                                </a></h4>
                            <div className="form-group">
                                <h5>Relief for Affected Businesses</h5>
                                <h5>Helping Local Communities Stay Connected</h5>
                                <h5>Ensuring Trusted Content for Business Owners and Consumers</h5>
                                <h5>Focusing on Our Yelp Employees Around the World</h5>
                            </div>
                        </div>
                    }
                    {
                        this.props.restaurants !== "" &&
                        <h3>Best Restaurant Around {this.state.zipcode}</h3>
                    }
                    <ul className="list-group">
                        {
                            this.props.restaurants !== "" &&
                            this.props.restaurants.map((res,index) => (
                                <li className="list-group-item list-adj" key={index}>
                                    <Link to={`/search/zipcode/${this.state.zipcode}/restaurant/${res.id}`}>
                                        <span className="float-left">{res.name}</span>
                                    </Link>
                                        {
                                            res.location.address1 === "" &&
                                            <span className="fa fa-map-marker float-right">Location: Unavailable</span>
                                        }
                                        {
                                            res.location.address1 !== "" &&
                                            <span className="fa fa-map-marker float-right">Location: {res.location.address1}</span>
                                        }
                                </li>)
                            )
                        }
                    </ul>
                </div>
                <div className="col-4">
                    {
                        this.props.restaurants !== "" && this.state.zipcode.length === 5 &&
                        <Map zipcode={this.state.zipcode}/>
                    }

                </div>

            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    }
}

const stateToProperty = (state) => ({
    restaurants: state.restaurantReducer.restaurants,
    isSignIn: state.userReducer.isSignIn,
    user: state.userReducer.user
})


const propertyToDispatchMapper = (dispatch) => ({
    cleanCode: (res) => dispatch({
        type: "CLEAN_RESTAURANT", res
    }),
    findRestaurantByZipcode: (zipcode) => convertPosition(zipcode)
        .then(response => restaurantService.findAllRestaurant(response.places[0].latitude, response.places[0].longitude))
        .then(results => dispatch({
            type: "FIND_RESTAURANT", results
        })),
    findRestaurantByCategory: (zipcodeId, categoryId) => convertPosition(zipcodeId)
        .then(response => restaurantService.findRestaurantsByFilter(response.places[0].latitude, response.places[0].longitude, categoryId))
        .then(results => dispatch({
            type: "FIND_RESTAURANT", results
        })),
    findRestaurantByCategoryAndSort: (zipcode, category, sort) => convertPosition(zipcode)
        .then(response => restaurantService.findRestaurantBySortAndFilter(response.places[0].latitude, response.places[0].longitude, sort, category))
        .then(results => dispatch({
            type: "FIND_RESTAURANT", results
        })),
    findRestaurantBySort: (zipcode, sort) => convertPosition(zipcode)
        .then(response => restaurantService.findRestaurantsBySort(response.places[0].latitude, response.places[0].longitude, sort))
        .then(results => dispatch({
            type: "FIND_RESTAURANT", results
        })),

})


export default connect (stateToProperty, propertyToDispatchMapper)(SearchComponent)
