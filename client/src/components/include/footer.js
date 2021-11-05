import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer(){
    return(
        <section className="section footer text-light">
            <div className="container">
                <div className="row align-items-center">
                    <div className="quick-links text-center">
                        <ul className="links">
                            <li className="link-item">
                                <Link to="/home">Home</Link>
                           </li>
                            <li className="link-item">
                                <span>&#183;</span>
                            </li>
                            <li className="link-item">
                                <Link to="/about">About Us</Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="follow-icons text-center">                          
                        <h4>Follow Us</h4>
                        <ul className="icons">
                            <li className="icon-item">
                                <span><FaFacebook size="30px"/></span>
                            </li>
                            <li className="icon-item">
                                <span><FaInstagram size="30px"/></span>
                            </li>
                            <li className="icon-item">
                                <FaTwitter size="30px"/>
                            </li>
                        </ul>
                        <h5>&copy; Copyright Book Nook </h5>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Footer;