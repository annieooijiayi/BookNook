import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Axios from 'axios';

function Navbar(){

    let history = useHistory();

    const logout =() => {
        Axios.get('http://localhost:3001/logout');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        history.push('/');
    }

    return(
        <div className="navbar-light ">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <Link to="/home" className="navbar-brand text-light">Book Nook</Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link to="/home" className="nav-link active text-light">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/library" className="nav-link active text-light">Library</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/profile" className="nav-link active text-light">Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button onClick={logout} className="btn btn-link nav-link active text-light">Log Out</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default Navbar;