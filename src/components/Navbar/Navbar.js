import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import './navbar.css';
class Navbar extends Component {


    state = {
        user: {}
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark justify-content-between">
                <span className="navbar-brand color-adj">YelpReview</span>
                <span className="form-inline">
                    <Link className="navbar-brand" to="/">Home</Link>
                    {this.props.isSignIn === "" &&
                    <Link className="navbar-brand" to="/login">SignIn</Link>
                    }
                    <br/>
                    {this.props.isSignIn === "" &&
                    <Link className="navbar-brand" to="/register">SignUp</Link>
                    }
                    {
                        this.props.isSignIn !== "" &&
                        <label><Link className="navbar-brand" to={`/profile`}> {this.props.isSignIn}</Link></label>
                    }
                    {
                        this.props.isSignIn !== "" &&
                        <label><Link className="navbar-brand" to={`/`} onClick={e => this.props.updateLogOutStatus("")}>Log Out</Link></label>
                    }
                </span>



            </nav>
        );
    }
}




const stateToProperty = (state) => ({
    isSignIn: state.userReducer.isSignIn,
    user: state.userReducer.user

})

const propertyToDispatchMapper = (dispatch) => ({

    updateLogOutStatus: (isSignIn) => dispatch({
        type: "UPDATE_USER_LogOut", isSignIn
    })

})

export default connect(stateToProperty, propertyToDispatchMapper)(Navbar)

