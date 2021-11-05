import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link,useHistory } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Axios from 'axios';

function Contact(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    Axios.defaults.withCredentials = true;

    const contact =() => {
        Axios.post('http://localhost:3001/contact',{
            name: name,
            email: email,
            message: message
        }).then((response)=>{
            console.log(response);
            if (response.data.error){
                setError(response.data.error);
            }else{
                alert(response.data.message);
                window.location.reload();
            }
            
        })
    }

    return(
        <div>
            <div className="navbar-light ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="navbar navbar-expand-lg">
                                <div className="container-fluid">
                                    <Link to="/" className="navbar-brand text-light">Book Nook</Link>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <Link to="/contact" className="nav-link active text-light">Contact Us</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section">
                <div className="contact-container">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="main-heading">Contact Form</h5>
                                    <div className="underline"></div>
                                    <hr />
                                    <form>
                                    <div className="form-group">
                                        <label className="mb-1">Full Name</label>
                                        <input type="text" className="form-control" placeholder="Enter Full Name" onChange ={(e) => {setName(e.target.value);}} ></input>
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-1">Email Address</label>
                                        <input type="text" className="form-control" placeholder="Enter Email Address" onChange ={(e) => {setEmail(e.target.value);}} ></input>
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-1">Message</label>
                                        <textarea rows="3" className="form-control" placeholder="Type Your Message..." onChange ={(e) => {setMessage(e.target.value);}} ></textarea>
                                    </div>
                                    <div className="form-group py-3">
                                        <button type="button" className="btn btn-primary shadow w-100" onClick={contact}>Send Message</button> 
                                    </div>
                                    <div className="alert" role="alert" style={{color:"red"}}>
                                        {error}
                                    </div>   
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section footer text-light">
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
        </div>
        
    );
}
export default withRouter(Contact);