import React from "react";
import {MDBContainer, MDBFooter } from "mdbreact";
import "./foot.style.client.css"

const Foot = () => {
    return (
        <MDBFooter className="font-small pt-2 mt-2 bg-dark">
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid >
                    <span className="coloradj">
                        &copy; {new Date().getFullYear()} Copyright: Xue, Ke, Yiqian
                        <br/>
                        Contact info: xue.wu.sherry@gmail.com
                    </span>

                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default Foot;
