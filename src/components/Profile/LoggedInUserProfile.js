import React from 'react';
import {Link} from "react-router-dom";
import userService from "../../services/userService";
import {connect} from "react-redux";


class LoggedInUserProfile extends React.Component {

    state = {
        user: {}
    }


    alertMsg = (e) => {
        alert("Your file is being updated!")
    }

    render() {
        return<div>
            <div className="container">
                <h1>Profile</h1>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label ">Username</label>
                    <div className="col-sm-10">
                        <input id="usernameFld" value={this.props.user.username || ""} type="text"
                               className="form-control" readOnly/>
                    </div>
                    <label className="col-sm-2 col-form-label">
                        Phone
                    </label>
                    <div className="col-sm-10">
                        <input id="phoneFld" value={this.props.user.phone || ""} type="tel"
                               className="form-control" onChange={e => this.props.updateUser({
                            ...this.props.user,
                            phone: e.target.value
                        })}/>
                    </div>
                    <label className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input id="emailFld" value={this.props.user.email || ""} type="Email"
                               className="form-control" readOnly/>
                    </div>
                    <label className="col-sm-2 col-form-label">
                        Address
                    </label>
                    <div className="col-sm-10">
                        <input id="addressFld" value={this.props.user.address || ""} type="text"
                               className="form-control" onChange={e => this.props.updateUser({
                            ...this.props.user,
                            address: e.target.value
                        })}/>
                    </div>

                    <label className="col-sm-2 col-form-label">
                        Role
                    </label>
                    <div className="col-sm-10" id="roleFld">
                        <input value={this.props.user.type || ""} className="form-control" readOnly/>
                    </div>
                    <label className="col-sm-2 col-form-label">
                        Date of Birth
                    </label>
                    <div className="col-sm-10">
                        <input id="dobFld" type="date" className="form-control" value={this.props.user.dateofbirth || ""}
                               onChange={e => this.props.updateUser({
                                   ...this.props.user,
                                   dateofbirth: e.target.value
                               })}/>
                    </div>
                    <label className="col-sm-2 col-form-label"/>
                    <div className="col-sm-10">
                        <button className="btn btn-success btn-block"
                                onClick={e => {this.props.saveProfile(this.props.user.id, this.props.user);this.alertMsg(e)}}>
                            Update
                        </button>
                    </div>
                    <label className="col-sm-2 col-form-label"/>
                    <div className="col-sm-10">
                        <Link to={`/`}>
                            <button onClick={e => this.props.updateLogOutStatus("")}
                                    id="logoutBtn" className="btn btn-danger btn-block">
                                Logout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    }
}

const stateToProperty = (state) => ({
    user: state.userReducer.user,
    isSignIn: state.userReducer.isSignIn
})


const propertyToDispatchMapper = (dispatch) => ({

    saveProfile: (userId, newUser) => userService.updateUser(userId, newUser),
    updateUser: (user) => dispatch({
        type: "UPDATE_USER", user
    }),
    updateLogInStatus: (user) => dispatch({
        type: "UPDATE_USER_PROFILE", user
    }),
    updateLogOutStatus: (isSignIn) => dispatch({
        type: "UPDATE_USER_LogOut", isSignIn
    })

})

export default connect(stateToProperty, propertyToDispatchMapper)(LoggedInUserProfile);
