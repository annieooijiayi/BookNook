import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Axios from 'axios';

function SignUp(){
    let history = useHistory();

    const [userNameReg, setUserNameReg] = useState('');
    const [userEmailReg, setUserEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [errorAlert, setErrorAlert] = useState('');

    Axios.defaults.withCredentials = true;

    const signup =() => {
        Axios.post('http://localhost:3001/signup', {
            user_name: userNameReg,
            user_email: userEmailReg,
            user_password: passwordReg
        }).then((response) => {
            console.log(response);
            
            if (response.data.message === 'Registered successfully!'){
                //setErrorAlert(response.data.message);
                alert('Registered successfully!');
                history.push('/');
            }else{
                setErrorAlert(response.data.message);
            }
        });
        
    };

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
            <div className="signup-container">
                <div className="signup">
                    <div className="col-md-12">
                        <h5 className="main-heading">Sign Up</h5>
                        <div className="underline"></div>
                        <hr />
                        <div className="form-group">
                            <label className="mb-1">Full Name</label>
                            <input type="text" className="form-control" placeholder="Enter Full Name"  onChange ={(e) => {setUserNameReg(e.target.value);}} ></input>
                        </div>
                        <div className="form-group">
                            <label className="mb-1">Email</label>
                            <input type="text" className="form-control" placeholder="Enter Email"  onChange ={(e) => {setUserEmailReg(e.target.value);}} ></input>
                        </div>
                        <div className="form-group">
                            <label className="mb-1">Password</label>
                            <input type="password" className="form-control" placeholder="Enter Password"  onChange ={(e) => {setPasswordReg(e.target.value);}} ></input>
                        </div>
                        <div className="form-group py-3">
                            <button type="button" className="btn btn-primary shadow w-100" onClick={signup}>Sign Up</button> 
                        </div>
                        <div className="alert" role="alert" style={{color:"red"}}>
                            {errorAlert}
                        </div>  
                        <div className="quick-link text-center">
                            <Link to="/">Already Have An Account? Login</Link>
                        </div>
                    </div>
                </div>
            </div>
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
export default SignUp;