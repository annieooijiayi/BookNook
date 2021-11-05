import React,{ useEffect, useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Video from '../videos/video1.mp4';
import Axios from 'axios';

function Login(){
    let history = useHistory();

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;

    const login =() => {
        Axios.post('http://localhost:3001/login', {
            user_email: userEmail,
            user_password: userPassword,
        }).then((response) => {
            console.log(response);
            if (!response.data.auth){
                setLoginStatus(response.data.message);
                history.push('/');
            }else if (response.data.auth === true && response.data.role === 'admin'){
                alert('Welcome to the Dashboard!');
                history.push('/admin');
            }else{
                //setLoginStatus('');
                sessionStorage.setItem("token", response.data.token);
                alert('Welcome!');
                history.push('/home');
            }
        });
    };
    
    useEffect(() => {
        Axios.get('http://localhost:3001/login').then((response) => {
            
            console.log(response); 
        });
    }, []);


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
            <section className="login-container">
                <video className="bg-video" autoPlay muted loop preload="auto">
                    <source src={Video} type="video/mp4" />
                </video>      
                <div className="login">
                    <div className="col-md-12">
                        <h5 className="main-heading">Login</h5>
                        <div className="underline"></div>
                        <hr />
                        <div className="form-group">
                            <label className="mb-1">Email</label>
                            <input type="text" className="form-control" placeholder="Enter Email"  onChange ={(e) => {setUserEmail(e.target.value);}} ></input>
                        </div>
                        <div className="form-group">
                            <label className="mb-1">Password</label>
                            <input type="password" className="form-control" placeholder="Enter Password"  onChange ={(e) => {setUserPassword(e.target.value);}} ></input>
                        </div>
                        {/*<div className="forgot-link">
                            <Link to="/forgotpassword">Forgot Password?</Link>
                        </div>*/}
                        <div className="form-group py-3">
                            <button type="button" className="btn btn-primary shadow w-100" onClick={login}>Login</button> 
                        </div>
                        
                        <div className="alert" role="alert" style={{color:"red"}}>
                            {loginStatus}
                        </div>   
                        <div className="quick-link text-center">
                            <Link to="/signup">Doesn't Have An Account? Sign Up</Link>
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
export default Login;