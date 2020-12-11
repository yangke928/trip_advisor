import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
class Navbar extends Component {

    state = {
        user: {}
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-2">
                <div className="container">
                    <Link className="navbar-brand float-left" to="/">
                        YelpReview
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            {
                                this.props.isSignIn === "" &&
                                <span>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">
                                                SignIn
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">SignUp</Link>
                                        </li>
                                    </span>
                            }
                            {
                                this.props.isSignIn !== "" &&
                                <div>
                                    <li className="nav-item">
                                        <Link className="nav-link"
                                              to={`/profile`}>
                                            {this.props.isSignIn}</Link>
                                    </li>
                                    <Link to={`/`}>
                                        <li onClick={e => this.props.updateLogOutStatus("")}>
                                            Log Out
                                        </li>
                                    </Link>
                                </div>
                            }
                        </ul>
                    </div>
                </div>
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

