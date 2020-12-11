import React, {Component} from "react"
import "./homepage.style.client.css"
import {Link} from "react-router-dom";
import image from "./pexels-photo-5591663.jpeg";

class HomePageComponent  extends Component {

    render() {
        return <div>
            <div>
                <div className="row search-bg">
                    <div className="col-6">
                        <h3 className="font-adj">The Best Restaurants Near You</h3>
                        <Link to={`/search`}>
                            <button className="search-adj float-right">Search</button>
                        </Link>
                    </div>
                    <div className="col-6">
                        <img src={image} className="adj-img" alt={""}/>
                    </div>

                </div>
            </div>
        </div>

    }
}




export default HomePageComponent
