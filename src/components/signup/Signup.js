import React from "react"
import {Link} from "react-router-dom";
import userService from "../../services/userService";
import {connect} from "react-redux";


class Signup extends React.Component {

    state = {
        username: "",
        password: "",
        verifyPassword: "",
        email: "",
    }

    alertMsg = () =>
        alert("Your input password/email format is inconsistent")

    findUserFromDB = (e) => {
        this.props.findOneUser(this.state.username)
            .then(result => console.log(result)
                // result.length === 0 ?
                //     userService.createUser(this.state.username, this.state.password, this.state.email)
                //         .then(user =>
                //             this.props.updateLogInStatus(user)
                //         ) : alert("This username/email has been taken!")
            )
    }

    emailValid = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.email);
    }

    render() {
        return <div>
        <div className="container">
                <h1>Sign Up</h1>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input onChange={e => this.setState({
                            username: e.target.value
                        })}
                            className="form-control" type="text" id="usernameFld" placeholder="Alice"/>
                        </div>
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input onChange={e => this.setState({
                                email: e.target.value
                            })} className="form-control" type="text" id="emailFld" placeholder="Alice@gmail.com"/>
                        </div>
                        <label className="col-sm-2">Password </label>
                        <div className="col-sm-10">
                            <input onChange={e => this.setState({
                            password: e.target.value})}
                            type="password" className="form-control" id="passwordFld" placeholder="123qwe#$%"/>
                        </div>
                        <label className="col-sm-2">Verify Password </label>
                        <div className="col-sm-10">
                            <input onChange={e => this.setState({
                            verifyPassword: e.target.value})} type="password" className="form-control"
                               id="verifyPasswordFld" placeholder="123qwe#$%"/>
                        </div>
                    <label className="col-sm-2 col-form-label"/>
                    <div className="col-sm-10">
                        {
                            this.state.password === this.state.verifyPassword && this.emailValid &&<div>
                                <button onClick={ e => this.findUserFromDB(e)} className="btn btn-primary btn-block">
                                    Sign up
                                </button>
                            </div>
                        }
                        {
                            (this.state.password !== this.state.verifyPassword || !this.emailValid) &&
                            <button onClick={e => this.alertMsg()}
                                    className="btn btn-primary btn-block">Sign up</button>
                        }
                        {
                            this.props.isSignIn !== "" &&
                            <Link to={`/profile`}>
                                <button className="btn btn-secondary btn-block">go to profile</button>
                            </Link>
                        }
                        <div className="row">
                            <div className="col-6">
                                <div>
                                    <Link to={`/login`}>
                                        <span className="float-left">Login</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-6">
                                <Link to={`/`}>
                                    <span className="float-right">Cancel</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    </div>
                </form>
        </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

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



export default connect(stateToProperty, propertyToDispatchMapper)(Signup)

