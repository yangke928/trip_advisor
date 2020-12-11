import React from 'react';
import {Link} from "react-router-dom";
import userService from "../../services/userService";
import {connect} from "react-redux";


class Login extends React.Component {

    state = {
        username: "",
        password: "",
        confirm: "",
        user: []
    }


    findUserFromDB = () => {
        userService.findOneUser(this.state.username)
            .then(result => result.length !== 0 &&
            result[0].password === this.state.password ? this.setState({
                user: result[0],
                confirm: "yes"
            }) : this.setState({
                confirm: "no"
            })).then(this.verify)
    }

    verify = () => {
        if (this.state.confirm === "yes") {
            //login successful
            alert("Welcome back!")
            this.props.updateLogInStatus(this.state.user)
        }
        else if (this.state.confirm === "no") {
            alert("Cannot verify your information, please try again")
        }
    }


    logOut = () => {
        this.props.updateLogInStatus("");
        this.setState({
            username: "",
            password: "",
            confirm: ""
        })
    }



    render() {
        return <div>
        <div className="container">
            <h1>Sign In</h1>
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input onChange={e => this.setState({
                            username: e.target.value
                        })} className="form-control" placeholder="Alice"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input onChange={e => this.setState({
                            password: e.target.value
                        })} type="password" className="form-control" placeholder="123qwe#$%"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"/>
                    <div className="col-sm-10">
                        {
                            this.props.isSignIn === "" &&
                            <label onClick={ e => this.findUserFromDB()}
                                   className="btn btn-primary btn-block">Sign in</label>
                        }
                        {
                            this.props.isSignIn !== "" &&
                            <label onClick={ e => alert("You already sign in!")}
                                   className="btn btn-primary btn-block">Sign in</label>
                        }

                        {
                            this.state.confirm === "yes" &&
                                <div>
                                    <Link to={`/profile`}>
                                        <label className="btn btn-success btn-block">Go to Profile</label>
                                    </Link>
                                </div>
                        }
                        <div className="row">
                            <div className="col-4">
                                <div>
                                    <Link to={`/register`}>Sign up</Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <Link to={`/`}>
                                    <span className="float-right">Cancel</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    }
}

const stateToProperty = (state) => ({
    isSignIn: state.userReducer.isSignIn,
    user: state.userReducer.user
})

const propertyToDispatchMapper = (dispatch) => ({
    updateLogInStatus: (user) => dispatch({
        type: "UPDATE_USER_PROFILE", user
    }),
    findOneUser: (username) => userService.findOneUser(username)
})

export default connect(stateToProperty, propertyToDispatchMapper)(Login)
