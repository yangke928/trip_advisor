import React from 'react';
import userService from "../../services/userService";

class OtherUserProfile extends React.Component {

    state = {
        username: "",
        type: "",
        email:"",
    }

    componentDidMount() {
        const username = this.props.match.params.username
        if (username) {
            userService.findUserByUsername(username).then(user =>
                this.setState({
                username: user.username,
                type: user.type,
                email: user.email
            })
            )
        }
    }

    render() {
        return<div>
        <div className="container">
            <h1>Profile</h1>
            <div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label ">Username</label>
                    <div className="col-sm-10">
                        <input id="usernameFld" value={this.state.username || ""} type="text"
                           className="form-control" readOnly/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input id="emailFld" value={this.state.email || ""} type="Email"
                               className="form-control" readOnly/>
                    </div>
                </div >


                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                        Role
                    </label>
                    <div className="col-sm-10" id="roleFld">
                        <input value={this.state.type || ""} className="form-control" readOnly/>
                    </div>
                </div>
            </div>
        </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    }
}


export default OtherUserProfile;
