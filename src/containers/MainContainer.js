import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import HomePageComponent from "../components/HomePage/HomePageComponent";
import Login from "../components/Login/Login";
import Signup from "../components/signup/Signup";
import SearchContainer from "./SearchContainer";
import LoggedInUserProfile from "../components/Profile/LoggedInUserProfile";
import OtherUserProfile from "../components/Profile/OtherUserProfile";
import RestaurantComponent from "../components/Restaurants/restaurantComponent";
import Foot from "../components/Foot/Foot";

class MainContainer extends Component {

    render() {
        return (
            <BrowserRouter>
                <Navbar/>
                <Route path={["/", "/home"]} exact component={HomePageComponent}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Signup}/>
                <Route path="/search" exact component={SearchContainer}/>
                <Route path="/search/zipcode/:zipcodeId" exact component={SearchContainer}/>
                <Route path="/search/zipcode/:zipcodeId/restaurant/:restaurantId" exact component={RestaurantComponent}/>
                <Route path="/search/zipcode/:zipcodeId/category/:categoryId" exact component={SearchContainer}/>
                <Route path="/search/zipcode/:zipcodeId/sort/:sortId" exact component={SearchContainer}/>
                <Route path="/search/zipcode/:zipcodeId/category/:categoryId/sort/:sortId" exact component={SearchContainer}/>
                <Route path="/profile/users/:username" exact component={OtherUserProfile}/>
                <Route path="/profile" exact component={LoggedInUserProfile}/>
                <Foot/>

            </BrowserRouter>
        );
    }
}





export default MainContainer;
